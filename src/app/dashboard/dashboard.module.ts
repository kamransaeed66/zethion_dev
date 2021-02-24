import { LanguageModule } from './../shared/language/language.module';
import { NewsSectionComponent } from './news-section/news-section.component';
import { NgModule, Injectable } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxLoadingModule } from 'ngx-loading';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { SharedModule } from './../shared.module';
import { TableResultsModule } from '../table-result/table-results.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutes } from './dashboard.routing';
import { SidebarModule } from '../sidebar/sidebar.module';
import { ResultsModule } from '../results/results.module';
import { ProfileComponent } from './profile/profile.component';
import { CustomizeComponent } from './customize/customize.component';
import { SportModule } from '../shared/sport/sport.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { NewsModule } from '../news/news.module';
import { NewsContentComponent } from './news-content/news-content.component';
import { DashboardResultModule } from '../dashboard-result/dashboard-result.module';
import { RightbarComponent } from '../rightbar/rightbar.component';
import { SearchComponent } from './search/search.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { InfoDialogComponent } from '../shared/dialogs/info-dialog/info-dialog.component';
import { ThumbDialogComponent } from '../shared/dialogs/thumb-dialog/thumb-dialog.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MenuComponent } from './menu/menu.component';
import { ShortcutImagesComponent } from './menu/shortcut-images/shortcut-images.component';
import { LikeComponent } from './menu/like/like.component';
import { MenuSearchComponent } from './menu/menu-search/menu-search.component';
import { FooterToggleComponent } from './menu/footer-toggle/footer-toggle.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(DashboardRoutes),
        FormsModule,
        ReactiveFormsModule,
        TableResultsModule,
        NewsModule,
        SharedModule,
        TranslateModule,
        ResultsModule,
        SidebarModule,
        LanguageModule,
        SportModule,
        DragDropModule,
        InfiniteScrollModule,
        NgxLoadingModule,
        DashboardResultModule,
        CarouselModule,
        NgbPaginationModule,
        NgbAlertModule,
        NgbModule,
        MatProgressSpinnerModule,
    ],
    declarations: [
        DashboardComponent,
        ProfileComponent,
        CustomizeComponent,
        ResetPasswordComponent,
        NewsContentComponent,
        NewsSectionComponent,
        SearchComponent,
        InfoDialogComponent,
        ThumbDialogComponent,
        MenuComponent,
        ShortcutImagesComponent,
        LikeComponent,
        MenuSearchComponent,
        FooterToggleComponent,
    ],
    entryComponents: [
        InfoDialogComponent,
        ThumbDialogComponent
    ],
})
export class DashboardModule { }
