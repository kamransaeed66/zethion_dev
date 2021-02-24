import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SportSelectComponent} from './sport-select/sport-select.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TournamentSelectComponent } from './tournament-select/tournament-select.component';
import {TranslateModule} from '@ngx-translate/core';
import {CompetitionSelectComponent} from './competition-select/competition-select.component';
import { CountryAutocompleteComponent } from './country-autocomplete/country-autocomplete.component';
import {PlaceAutocompleteComponent} from "./city-autocomplete/place-autocomplete.component";
import {MatOptionModule} from "@angular/material/core";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatInputModule} from "@angular/material/input";
import {QueryAutocompleteComponent} from "./query-autocomplete/query-autocomplete.component";

@NgModule({
  declarations: [
    SportSelectComponent,
    TournamentSelectComponent,
    CompetitionSelectComponent,
    CountryAutocompleteComponent,
    PlaceAutocompleteComponent,
    QueryAutocompleteComponent
  ],
  imports: [
    CommonModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    TranslateModule
  ],
  exports: [
    SportSelectComponent,
    TournamentSelectComponent,
    CompetitionSelectComponent,
    CountryAutocompleteComponent,
    PlaceAutocompleteComponent,
    QueryAutocompleteComponent
  ]
})
export class SportModule { }
