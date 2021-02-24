import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/app/shared/_service/news/news.service';
import { NewsdialogComponent } from "../../news/newsdialog/newsdialog.component";
import {DataService} from "../../shared/_service/data/data.service";
import {CookieService} from "ngx-cookie-service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-news-content',
  templateUrl: './news-content.component.html',
  styleUrls: ['./news-content.component.css']
})
export class NewsContentComponent implements OnInit {

  language: string;

  news = [];
  newsdata: object;
  firstNews: object;
  private page: number = 0;
  private size: number = 9;
  private loading: boolean = false;


  constructor(
    protected newsService: NewsService,
    protected cookieService: CookieService,
    protected dialog: MatDialog,
    protected data: DataService
  ) { }

  ngOnInit() {
    this.data.getCurrentLanguage().subscribe(language => {
      this.language = language;
      this.refreshNews();
      this.getNewsContent("0", "9");
    });
  }

  openNews(result: string) {
    this.newsdata = this.news[result];
    this.dialog.open(NewsdialogComponent, {
      panelClass: 'custom-dialog-container',
      data: this.newsdata,
    });
  }

  getNewsContent(page: any, size: any) {
    this.loading = true;
    this.newsService.getNews([this.language].toString(), this.cookieService.get('countries'), [].toString(), null, page, size).subscribe((response: any) => {
      let content = response[this.language].content;
      this.loading = false;
      content.forEach(element => {
        this.news.push(element);
      });
      this.firstNews = this.news[0];
    },
      error => {

      });
  }

  onScroll() {
    this.page += 1;
    this.getNewsContent(this.page, this.size);
  }

  refreshNews() {
    this.news = [];
    this.firstNews= null;
    this.loading = false;
    this.page = 0;
    this.size = 9;
  }

}
