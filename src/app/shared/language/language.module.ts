import {NgModule} from "@angular/core";
import {LanguageComponent} from "./language.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";


@NgModule({
  declarations: [LanguageComponent],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule
  ],
  exports: [LanguageComponent]

})
export class LanguageModule { }
