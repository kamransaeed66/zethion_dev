import {Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewInit, OnDestroy} from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

import { BreakpointObserverService, Breakpoint } from './shared/_service/breakpoint-observer/breakpoint-observer.service';
import { SigninService } from './shared/_service/signin/signin.service';
import { ImagesService } from './shared/_service/images/images.service';
import {
  NgcCookieConsentService,
  NgcInitializeEvent,
  NgcNoCookieLawEvent,
  NgcStatusChangeEvent
} from "ngx-cookieconsent";
import {CookieService} from "ngx-cookie-service";
import {LocationService} from "./shared/_service/location/location.service";
import {PlaceService} from "./shared/_service/place/place.service";
import {CountryService} from "./shared/_service/country/country.service";


@Component({
  selector: 'app-my-app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  private _router: Subscription;
  private lang: string;
  public loading = true;
  @ViewChild('bpDetector') private bpDetector: ElementRef;
  private currentBreakpoint: Breakpoint = 'none';
  private isConsented: boolean = false;
  public ipAddress:any;
  private clientSecret: string;

  //keep refs to subscriptions to be able to unsubscribe later
  private popupOpenSubscription: Subscription;
  private popupCloseSubscription: Subscription;
  private initializeSubscription: Subscription;
  private statusChangeSubscription: Subscription;
  private revokeChoiceSubscription: Subscription;
  private noCookieLawSubscription: Subscription;

  constructor(
    private router: Router,
    private translate: TranslateService,
    private signinService: SigninService,
    private imagesService: ImagesService,
    private bpObserverService: BreakpointObserverService,
    private ccService: NgcCookieConsentService,
    private cookieService: CookieService,
    private locationService: LocationService,
    private placeService: PlaceService,
    private countryService: CountryService
  ) {
    // local
    // sessionStorage.setItem("env", "LOCAL");
    sessionStorage.setItem('env', 'DEVELOPMENT');
  }

  ngOnInit() {
    let obj = {
      currentUser: {
        username: "testUN",
        authdata: "dsfsdf",
        test: "test"
      }
    };

    this.__checkClient();
    this.cookieService.set("test", JSON.stringify(obj));

    sessionStorage.setItem("language","it");

    this.loading = true;
    this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
      const body = document.getElementsByTagName('body')[0];
      const modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
      if (body.classList.contains('modal-open')) {
        body.classList.remove('modal-open');
        modalBackdrop.remove();
      }
      this.signinService.updateLoggedUser();
      this.loading = false;
    });

    this.retrieveClientPosition();

    this.locationService.getIP().subscribe(
      (data) => {
        console.log('ip', data);
        this.ipAddress = data
      },
      err => console.error(err)
    );

    this.imagesService.preload(
      [
        //menu icons
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/ANIMATED_MENU_ICONS/FOOTBALL.gif',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/ANIMATED_MENU_ICONS/BASKETBALL.gif',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/ANIMATED_MENU_ICONS/TENNIS.gif',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/ANIMATED_MENU_ICONS/FORMULA1.gif',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/MENU_ICONS/FOOTBALL.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/MENU_ICONS/BASKETBALL.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/MENU_ICONS/TENNIS.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/MENU_ICONS/FORMULA1.png',

        //football event details
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/ENTERED_PLAYER.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/GOAL.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/OWN_GOAL.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/RED_CARD.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/SECOND_YELLOW_CARD.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/YELLOW_CARD.png',
        'https://storage.cloud.google.com/spring-bucket-sb-gcs-admin/img/sport/FOOTBALL/ICONS/MISSED_PENALTY.png',
      ]
    );

    // subscribe to cookieconsent observables to react to main events
    this.popupOpenSubscription = this.ccService.popupOpen$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.popupCloseSubscription = this.ccService.popupClose$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.initializeSubscription = this.ccService.initialize$.subscribe(
      (event: NgcInitializeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.statusChangeSubscription = this.ccService.statusChange$.subscribe(
      (event: NgcStatusChangeEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.revokeChoiceSubscription = this.ccService.revokeChoice$.subscribe(
      () => {
        // you can use this.ccService.getConfig() to do stuff...
      });

    this.noCookieLawSubscription = this.ccService.noCookieLaw$.subscribe(
      (event: NgcNoCookieLawEvent) => {
        // you can use this.ccService.getConfig() to do stuff...
      });

  }

  __checkClient() {
    if (!this.cookieService.check('clientId')) {
      let clientSecret = this.__getSecret();
      this.signinService.signupVisitor(clientSecret).subscribe(res => {
        console.log(res['clientId']);
        this.cookieService.set('clientId', res['clientId']);
        this.clientSecret = clientSecret;
        console.log(this.cookieService.check('clientId'));
      }, error => {
        this.cookieService.set('clientId', "");
        this.clientSecret = "";
      })
    }
  }

  __getSecret() {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789~`!@#$%^&*()-_=+[{]}\\\\|;:\\\'\\",<.>/?';
    let charactersLength = characters.length;
    let result;
    for ( var i = 0; i < 9; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  __setLanguage(country: string) {
    this.countryService.getCountriesLanguages().subscribe((res=> {
      this.lang = res[country];
      console.log(res[country]);
      console.log("uuu");
      if (sessionStorage.getItem('language')) {
        this.lang = sessionStorage.getItem('language');
      }
      this.translate.setDefaultLang(this.lang);
      this.translate.currentLang = this.lang;
      sessionStorage.setItem('language', this.lang);
      this.cookieService.set('language', this.lang);
    }))
  }

  retrieveClientPosition() {
    this.locationService.getPosition().then(pos=>
    {
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.retrieveCountry(pos.lat, pos.lng);
    }, error => {
      this.retrieveCountry("51.5", "-0.12");
      }
    );
  }

  retrieveCountry(lat: string, lng: string) {
    this.placeService.getPlaceByCoordinates(lat, lng).subscribe(res=> {
      console.log(res);
      let countries = [];
      if (res["country"] !== undefined) {
        console.log(res["country"]);
        countries.push(res["country"]);
        this.cookieService.set("countries", countries.toString());
        sessionStorage.setItem('countries', countries.toString());
      }
      this.__setLanguage(res["country"]);
    })
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks
    this.popupOpenSubscription.unsubscribe();
    this.popupCloseSubscription.unsubscribe();
    this.initializeSubscription.unsubscribe();
    this.statusChangeSubscription.unsubscribe();
    this.revokeChoiceSubscription.unsubscribe();
    this.noCookieLawSubscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.detectScreenSize();
  }

  @HostListener('window:resize', [])
  private onResize() {
    this.detectScreenSize();
  }

  private detectScreenSize() {
    if (!this.bpDetector || !this.bpDetector.nativeElement) {
      return;
    }

    const screenSize = this.bpDetector.nativeElement.className as Breakpoint;
    if (screenSize && this.currentBreakpoint !== screenSize) {
      this.currentBreakpoint = screenSize;
      this.bpObserverService.emitBreakpoint(screenSize);
      console.log(`Screen size change to ${screenSize} detected`);
    }
  }
}
