import { Router } from '@angular/router';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, PopStateEvent } from '@angular/common';
import {TranslateService} from "@ngx-translate/core";
import {DataService} from "../_service/data/data.service";
import {CookieService} from "ngx-cookie-service";

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  language: string;
  @Output() languageSelected = new EventEmitter();

  constructor(
    public translate: TranslateService,
    private data: DataService,
    private cookieService: CookieService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.data.getCurrentLanguage().subscribe(language => this.language = language);
  }

  useLanguage(language: string) {
    this.languageSelected.emit(language);
    // document.querySelector("dropdown-menu").classList.remove('showing');
    console.log("8888");
    this.data.changeCountries("");
    this.translate.use(language);
    sessionStorage.setItem("language",language);
    this.data.changeLanguage(language);
  }

  getLanguageFlag(): string {
    return this.translate.currentLang;
  }

  public isNews() {
    if (this.location.prepareExternalUrl(this.location.path()) === '/news') {
      return true;
    } else {
      return false;
    }
  }

}
