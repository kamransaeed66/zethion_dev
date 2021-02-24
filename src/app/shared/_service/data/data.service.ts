import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private languageSource = new BehaviorSubject(sessionStorage.getItem('language'));
  private countrySource = new BehaviorSubject(sessionStorage.getItem('countries'));

  vidEnd = new BehaviorSubject(false);
  Loader = new BehaviorSubject(false);
  queryLoader = new BehaviorSubject(false);
  LangChange = new BehaviorSubject(false);

  currentLanguage = this.languageSource.asObservable();
  currentCountries = this.countrySource.asObservable();
  vidComp = this.vidEnd.asObservable();
  loader = this.Loader.asObservable();
  queryloader = this.queryLoader.asObservable();
  langChange = this.LangChange.asObservable();

  constructor() {}

  changeLanguage(language: string) {
    this.languageSource.next(language);
  }

  changeCountries(countries: string) {
    this.countrySource.next(countries);
  }

  changeVidcomp(vidEnd: boolean) {
    this.vidEnd.next(vidEnd);
    console.log('this.vidEnd service', vidEnd);
  }

  langChanged(LangChange: boolean) {
    this.LangChange.next(LangChange);
  }

  changeQueryLoader(queryLoader: boolean) {
    this.queryLoader.next(queryLoader);
  }

  changeLoader(Loader: boolean) {
    this.Loader.next(Loader);
  }

  public getCurrentLanguage(): Observable<string> {
    console.log("getCurrentLanguage");
    return this.currentLanguage;
  }

  public getCurrentCountries(): Observable<string> {
    console.log("getCurrentCountries");
    return this.currentCountries;
  }

  public getchangeVidcomp(): Observable<boolean> {
    return this.vidComp;
  }

  public getLoader(): Observable<boolean> {
    return this.loader;
  }

  public getQueryLoader(): Observable<boolean> {
    return this.queryloader;
  }
  public isLangChange(): Observable<boolean> {
    return this.langChange;
  }




}
