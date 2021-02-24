import { count } from 'rxjs/operators';
import { countryCode } from './../../shared/const/const';
import { IpService } from './../../shared/_service/ip/ip.service';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/shared/_service/news/news.service';
import { NewsdialogComponent } from "../../news/newsdialog/newsdialog.component";
import { TranslateService } from "@ngx-translate/core";
import { DataService } from "../../shared/_service/data/data.service";
import { SlidesOutputData } from 'ngx-owl-carousel-o';
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";
import { NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { NetworkAwarePreloadStrategy } from 'src/app/NetworkAwarePreloadStrategy';
declare var $: any;

@Component({
  selector: 'app-news-section',
  templateUrl: './news-section.component.html',
  styleUrls: ['./news-section.component.css']
})

export class NewsSectionComponent implements OnInit {


  public newsBoxes = [];
  public horizontalValue: boolean;


  language: string;
  countries: string;
  query: string = "";
  langChange: boolean = false;
  vidComp: boolean;
  video_thumb: boolean = true;
  news: object[] = [];
  allLangNews: object[] = [];
  preimgs = [];
  @ViewChild('slideNewsElem', {static : false}) slideNewsElem: NgbCarousel;
  slideNews: object[] = [];
  shortcutImages: object[] = [];
  newsdata: object;
  private code: string;
  private imgLoading: boolean[] = [];
  private errorNews: boolean[] = [];
  private slideLoading: boolean[] = [];
  private page: number = 0;
  private tags: any;
  private size: number = 9;
  private loading: boolean = false;
  public countryCode: string[] = countryCode;
  activeSlides: SlidesOutputData;
  selectedIndex: number = 0;
  currShortcuts: object[] = [];
  constructor(
    protected newsService: NewsService,
    protected dialog: MatDialog,
    protected data: DataService,
    private translate: TranslateService,
    private ipService: IpService,
    protected cookieService: CookieService,
    private comp: NetworkAwarePreloadStrategy) { }

  getData(data: SlidesOutputData) { this.activeSlides = data; }

  ngOnInit() {

    setTimeout(() => {
      // get 20 news of all languages
      console.log("time delay");
      this.newsService.getNews([].toString(), '', [].toString(), this.query,'0', '20').subscribe((response: any) => {
        this.allLangNews = response;
        // get allLangNews images to preload if good network connection
        if(this.comp.hasGoodConnection() === true){
          // sorting according to site
          let sorted =  {'en':{},'it':{},'es':{},'fr':{},'de':{},'us':{},'zh':{},'ar':{},'pt':{},'in':{},'ru':{},'ja':{}};
          Object.keys(this.allLangNews).map((key) => {
            sorted[key] = this.allLangNews[key];
          });
          const mapped = Object.entries(sorted).map(([type, value]) => ({type, value}));
          mapped.forEach((element, index) => {
            setTimeout(() => {
              element.value['content'].forEach(element => {
                this.preimgs.push(element);
              });
            }, 2000*(index+1));
          });
        }
      });
    }, 5000);

    document.body.classList.add('custom-body');

    if (matchMedia) {
      const mql = window.matchMedia("(orientation: landscape)");
      mql.addListener(this.orientationChange);
      this.orientationChange(mql);
    }

    // setInterval(()=> this.scrollToNextItem(), 6000);

    this.ipService.getIPAddress().subscribe((res: any) => {
      this.ipService.getCountry(res.ip).subscribe((res: any) => {
        this.code = res.countryCode.toLowerCase();
        if (this.countryCode.indexOf(this.code) > -1) {
          this.translate.use(this.code);
          sessionStorage.setItem('language', this.code);
          this.data.changeLanguage(this.code);
        }
        else {
          this.translate.use(this.countryCode[0]);
          sessionStorage.setItem('language', this.countryCode[0]);
          this.data.changeLanguage(this.countryCode[0]);
        }

        this.data.getCurrentLanguage().subscribe(language => {
          this.loading = true;
          this.language = language;
          this.newsService.getShortcutImgs(this.language).subscribe((response: any) => {
            this.currShortcuts = response;
            console.log('currShortcuts', this.currShortcuts);
          });
          this.data.langChanged(true);
          this.langChange = false;
          this.refreshNews();
          // this.renderNews();
          setTimeout(() => {
            // render news articles
            this.renderNews();
          },1);
          this.data.getchangeVidcomp().subscribe(vidEnd => {
            this.vidComp = vidEnd
            if(vidEnd){
              if (matchMedia) {
                const mql = window.matchMedia("(orientation: landscape)");
                mql.addListener(this.orientationChange);
                this.orientationChange(mql);
              }
            }
          });
        });
      });
    });
  }

  renderNews(){
    // render preloaded lanuage articles
    if(this.allLangNews[this.language] !== undefined)
    {
      let Temp1 = [];
      let count = 0;
      this.allLangNews[this.language].content.forEach((element, e_index) => {
        if(element.title === undefined || element.title === "" || element.description === undefined || element.description === "" || element.urlToMedia === undefined || element.urlToMedia === "" || this.errorNews.includes(element.id))
        {
          this.allLangNews[this.language].content.splice(this.allLangNews[this.language].content.indexOf(element), 1);
        }
        else{
          element.publishedAt = new Date(element.publishedAt).toDateString();
          this.news.push(element);
          // big three news
          if(count <=2 && element.mediaType !== 'VIDEO' && this.page == 0){
            this.slideNews.push(element);
            this.slideLoading.push(false);
            count += 1;
          }
          // do not push first three images to the right side newsBoxes as it dublicate the left side big slider.
          if( !this.slideNews.includes(element) || element.mediaType === 'VIDEO'){
            Temp1.push(element);
            if(Temp1.length >= 2 ){
              this.newsBoxes.push( Temp1 );
              Temp1 = [];
            }
          }
        }
      });
      // if first page then fetch news for main slider.
      if (this.page == 0) {
        for (let i = 0; i < this.news.length; i++) {
          if(this.news[i]['mediaType'] === 'IMAGE')
            this.shortcutImages.push(this.news[i]);
        }
      }
    }
    // get articles on first page load
    else{
      this.getNewsContent(0, 20, this.tags);
    }
  }
  // function to keep list of images that are loaded. to hide the loades and show image.
  imgLoaded(n_id) { this.imgLoading.push(n_id); }

  // preload missing image news
  removeNews(n_el) {
    console.log('error image', n_el);
    if(n_el.mediaType === 'IMAGE')
      this.errorNews.push(n_el.id);
  }
  // show news infor in popup modal.
  openNews(news: any) {
    this.newsdata = news;
    this.dialog.open(NewsdialogComponent, {
      panelClass: 'custom-dialog-container',
      data: this.newsdata,
    });
  }

  getNewsContent(page: any, size: any, tags:any) {
    this.news = [];
    this.newsService.getNews([this.language].toString(), this.cookieService.get('countries'), [tags].toString(), this.query, page, size).subscribe((response: any) => {
      let Temp1 = [];
      let count = 0;
      response[this.language].content.forEach((element, e_index) => {
        if(element.title === undefined || element.title === "" || element.description === undefined || element.description === "" || element.urlToMedia === undefined || element.urlToMedia === ""){
          response[this.language].content.splice(response[this.language].content.indexOf(element), 1);
        }
        else{
          this.preimgs.push(element);
          element.publishedAt = new Date(element.publishedAt).toDateString();
          this.news.push(element);
          // big three news
          if(count <=2 && element.mediaType !== 'VIDEO' && this.page == 0){
            this.slideNews.push(element);
            this.slideLoading.push(false);
            count += 1 ;
          }
          // do not push first three images to the right side newsBoxes as it dublicate the left side big slider.
          if( !this.slideNews.includes(element) || element.mediaType === 'VIDEO'){
            Temp1.push(element);
            if(Temp1.length >= 2 ){
              this.newsBoxes.push( Temp1 );
              Temp1 = [];
            }
          }
        }
      });

      // if first page then fetch news for main slider.
      if (page == 0) {
        for (let i = 0; i < this.news.length; i++) {
          if(this.news[i]['mediaType'] === 'IMAGE')
            this.shortcutImages.push(this.news[i]);
        }
      }

    },
    error => { console.log(' Error getNewsContent', page, size); });
  }

  getfilterNews(page: any, size: any, tags:any, query:any) {
    this.tags = tags;
    this.query = query;
    this.newsService.getNews([this.language].toString(), this.cookieService.get('countries'), this.tags.toString(), this.query, page, size).subscribe((response: any) => {
      let Temp1 = [];
      let count = 0;
      this.loading = true;
      this.refreshNews();
      this.data.changeLoader(false);
      this.data.changeQueryLoader(false);
      this.news = [];
      response[this.language].content.forEach((element, e_index) => {
        if(element.title === undefined || element.title === "" || element.description === undefined || element.description === "" || element.urlToMedia === undefined || element.urlToMedia === ""){
          response[this.language].content.splice(response[this.language].content.indexOf(element), 1);
        }
        else{
          this.preimgs.push(element);
          element.publishedAt = new Date(element.publishedAt).toDateString();
          this.news.push(element);
          // big three news
          if(count <=2 && element.mediaType !== 'VIDEO' && this.page == 0){
            this.slideNews.push(element);
            this.slideLoading.push(false);
            count += 1 ;
          }
          // do not push first three images to the right side newsBoxes as it dublicate the left side big slider.
          if( !this.slideNews.includes(element) || element.mediaType === 'VIDEO'){
            Temp1.push(element);
            if(Temp1.length >= 2 ){
              this.newsBoxes.push( Temp1 );
              Temp1 = [];
            }
          }
        }
      });

      // if first page then fetch news for main slider.
      if (page == 0) {
        for (let i = 0; i < this.news.length; i++) {
          if(this.news[i]['mediaType'] === 'IMAGE')
            this.shortcutImages.push(this.news[i]);
        }
      }

    },
    error => { console.log(' Error getNewsContent', page, size); });
  }

  // reset all news data and counters.
  refreshNews() {
    this.news = [];
    this.slideNews = [];
    this.newsBoxes = [];
    this.loading = false;
    this.page = 0;
    this.size = 9;
    this.shortcutImages = [];
  }

  // function triggered by infinite scroller to load more news.
  public onScroll() {
    this.page += 1;
    this.getNewsContent( this.page , 20, this.tags);
  }

  scrollToNextItem() {
    const testimonials = document.querySelector('#slideNewsIndicators');
    const scroller = testimonials.querySelector('.im-carousel');
    const itemWidth = testimonials.querySelector('.im-carousel__item').clientWidth;
    if((scroller.scrollLeft+5) < (scroller.scrollWidth - itemWidth)){
      scroller.scrollBy({left: itemWidth, top: 0, behavior: 'smooth'});
    }

  }
  scrollToPrevItem() {
    const testimonials = document.querySelector('#slideNewsIndicators');
    const scroller = testimonials.querySelector('.im-carousel');
    const itemWidth = testimonials.querySelector('.im-carousel__item').clientWidth;


    if(scroller.scrollLeft != 0)
      scroller.scrollBy({left: -itemWidth, top: 0, behavior:'smooth'});

  }


  // if layout orientation change then adjust the scroller.
  private orientationChange(m) {
    let that = this;
    if (m.matches) {
      // if landscape
      this.horizontalValue = true;
      // add mouse wheen trigger event on right side news boxes.
      $(".tiles-container").mousewheel(function(event, delta) {
        event.preventDefault();
        // Check navigator value, 'MAC' may involve other browsers
        const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
        if (isMac) {
          this.scrollLeft -= (delta * .9);
        } else {
          this.scrollLeft -= (delta * 100);
        }
      });
    } else {
      // if portrait
      this.horizontalValue = false;
      $(".tiles-container").unbind();
    }

    // add mouse wheen trigger event for left side big news boxes.
     $("#slideNewsIndicators").mousewheel(this.debounced(150,function(event, delta) {
      event.preventDefault();
      if (delta < 0 ){
        that.scrollToNextItem(); // slide right
      }else if (delta > 0 ){
        that.scrollToPrevItem();  // slide left
      }
    }));

  }

  debounced(delay, fn) {
    let timerId;
    return function (...args) {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        fn(...args);
        timerId = null;
      }, delay);
    }
  }

  videoThumb(){
    console.log('video_thumb');
    this.video_thumb = false;
  }

  // slideLoad(index) {
  //   this.slideLoading[index] = true;
  //   if (this.slideLoading.indexOf(true) > -1) {
  //     // this.panelLoading = false;
  //     this.loading = false;
  //   } else {
  //     // this.panelLoading = true;
  //     this.loading = true;
  //   }
  // }

  ngOnDestroy() {
    document.body.classList.remove('custom-body');
  }

  querySelected(selected) {
    console.log("query selec into news component", selected);
    this.data.changeQueryLoader(true);
    this.getfilterNews(0, 20, [], selected);
  }

}
