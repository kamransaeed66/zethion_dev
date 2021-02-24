import { NgModule, Injectable } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { BrowserModule } from '@angular/platform-browser';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { FlexLayoutModule } from '@angular/flex-layout';


import { NgxLoadingModule } from 'ngx-loading';

import { AppComponent } from './app.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { DefaultFooterModule } from './shared/footer/default-footer/default-footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { TranslationLoader } from './shared/_service/translate/translationsloader';
import { MenubarComponent } from './menubar/menubar.component';
import { LanguageModule } from './shared/language/language.module';
import { SigninModule } from './shared/signin/signin.module';
import { SharedModule } from './shared.module';
import { AppRoutes } from './app.routing';
import { OnfieldTestComponent } from './result-details/details-football/onfield-test/onfield-test.component';
import { CoreFooterComponent } from './shared/footer/core-footer/core-footer.component';
import {
  NgcCookieConsentConfig,
  NgcCookieConsentModule,
  NgcCookieConsentService,
  WindowService
} from "ngx-cookieconsent";
import {CookieService} from "ngx-cookie-service";
import {FacebookModule} from "ngx-facebook";
import {NgxTweetModule} from "ngx-tweet";



import { HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG} from '@angular/platform-browser';
// custom configuration Hammerjs
@Injectable()
export class HammerConfig extends HammerGestureConfig {
  overrides = <any> {
      // I will only use the swap gesture so
      // I will deactivate the others to avoid overlaps
      'pinch': { enable: false },
      'rotate': { enable: false }
  }
}


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslationLoader(http);
}

const cookieConfig:NgcCookieConsentConfig = {
  cookie: {
    domain: 'localhost' // or 'your.domain.com' // it is mandatory to set a domain, for cookies to work properly (see https://goo.gl/S2Hy2A)
  },
  palette: {
    popup: {
      background: '#000'
    },
    button: {
      background: '#f1d600'
    }
  },
  theme: 'edgeless',
  type: 'opt-out'
};

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(AppRoutes, { scrollPositionRestoration: 'disabled' }),
    NgxLoadingModule.forRoot({}),
    SharedModule,
    SidebarModule,
    NavbarModule,
    DefaultFooterModule,
    BrowserModule,
    LanguageModule,
    SigninModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    PortalModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (HttpLoaderFactory),
        deps: [HttpClient]
      }
    }),
    DragDropModule,
    FlexLayoutModule,
    NgcCookieConsentModule.forRoot(cookieConfig),
    FacebookModule.forRoot(),
    NgxTweetModule,
    HammerModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    MenubarComponent,
    OnfieldTestComponent,
    CoreFooterComponent
  ],
  exports: [],
  // entryComponents: [OnfieldTestComponent],
  bootstrap: [AppComponent],
  providers: [NgcCookieConsentService, WindowService, NgcCookieConsentConfig, CookieService,
    {provide: HAMMER_GESTURE_CONFIG,
    useClass: HammerConfig}]
})
export class AppModule { }
