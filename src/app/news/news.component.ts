import { Component } from '@angular/core';
import { NewsService } from '../shared/_service/news/news.service';
import { MatDialog } from '@angular/material/dialog';
import { NewsdialogComponent } from './newsdialog/newsdialog.component';
import {DataService} from "../shared/_service/data/data.service";
import {NewsContentComponent} from "../dashboard/news-content/news-content.component";
import {CookieService} from "ngx-cookie-service";

declare var $: any;

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})

export class NewsComponent extends NewsContentComponent {

  language: string;

  news: any[] = [];
  firstTitle: string;
  newsdata: object;
  marquee: boolean;
  availMaquee = false;

  constructor(
    newsService: NewsService,
    cookieService: CookieService,
    dialog: MatDialog,
    data: DataService
  ) {
    super(newsService, cookieService, dialog, data);
  }

  ngOnInit() {
    this.marquee = true;
    this.availMaquee = false;
    this.data.getCurrentLanguage().subscribe(language => {
      this.language = language;
      this.refreshNews();
      this.newsService.getNews(
        [this.language].toString(), this.cookieService.get('countries'), [].toString(), null, "0", "6").subscribe((response: any) => {
        this.news = response.content[this.language];
        this.firstTitle = response.content[0].title;
        if (this.news.length > 0) {
          this.availMaquee = true;
        }
      })
    });
  }

  openNews_caro(result: string) {
    this.newsdata = this.news[result];
    this.dialog.open(NewsdialogComponent, {
      panelClass: 'custom-dialog-container',
      width: '65vw',
      data: this.newsdata,
    });
  }

  refreshNews() {
    this.news = [];
  }

}
