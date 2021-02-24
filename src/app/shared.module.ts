import { PortalModule } from '@angular/cdk/portal';
import { MaterialModule } from './material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RightbarComponent } from './rightbar/rightbar.component';
import { NotFoundComponent } from './error/notfound/notfound.component';
import { WaitingconfirmComponent } from './layouts/waitingconfirm/waitingconfirm.component';
import { AbstractWaitingComponent } from './layouts/waiting/waiting.component';
import { WaitingchangepasswordComponent } from './layouts/waitingchangepassword/waitingchangepassword.component';
import { ConfirmComponent } from './shared/confirm/confirm.component';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    PortalModule
  ],
  exports: [
    MaterialModule,
    RightbarComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    NotFoundComponent,
    RightbarComponent,
    WaitingconfirmComponent,
    AbstractWaitingComponent,
    WaitingchangepasswordComponent,
    ConfirmComponent
  ]
})
export class SharedModule { }
