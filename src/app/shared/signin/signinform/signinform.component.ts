import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { TestService } from '../../_service/test/test.service';
import { SigninService } from '../../_service/signin/signin.service';
import { SignindialogComponent } from '../signindialog/signindialog.component';
import { SignupformComponent } from '../signupform/signupform.component';
import { ForgotpasswordComponent } from '../forgotpassword/forgotpassword.component';

@Component({
    selector: 'app-signinform',
    styleUrls: ['./signinform.component.css'],
    templateUrl: './signinform.component.html',
})
export class SigninformComponent implements OnInit {

    //   sports: Array<any>;
    credentials = { username: '', password: '' };
    public loading = false;
    failed_login: string;
    @Output('loginState') loginState = new EventEmitter<string>();
    error = '';

    visView = '';

    signForm: FormGroup;

    constructor(
        private testService: TestService,
        private signinService: SigninService,
        private signinDialog: SignindialogComponent,
        private formBuilder: FormBuilder,
        private dialog: MatDialog,
        private overlay: Overlay
    ) {
        this.signForm = this.formBuilder.group({
            Username: ['', Validators.required],
            Password: ['', Validators.required]
        });
    }

    ngOnInit() {
        sessionStorage.setItem('token', '');
    }

    login(): any {
        if (this.signForm.valid) {
            this.loading = true;
            this.credentials.username = this.signForm.get('Username').value;
            this.credentials.password = this.signForm.get('Password').value;
            this.signinService.login(this.credentials).subscribe(response => {
                sessionStorage.setItem(
                    'token',
                    btoa(this.credentials.username + ':' + this.credentials.password)
                );
                this.signinService.updateLoggedUser();
                this.signinDialog.onNoClick();
            }, error => {
                this.failed_login = 'isfailed';
                this.loginState.emit(this.failed_login);
                this.loading = false;
            });
        }
    }

    goToSingUp() {
        this.dialog.closeAll();
        localStorage.setItem('forgorPass', '');
        const dialogRef = this.dialog.open(SignindialogComponent, {
            panelClass: 'custom-dialog-container',
            width: '500px',
            height: '680px',
            scrollStrategy: this.overlay.scrollStrategies.noop(),
            data: { component: SignupformComponent }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (localStorage.getItem('forgorPass') !== 'closed') {
                this.dialog.open(SignindialogComponent, {
                    panelClass: 'custom-dialog-container-no-scroll',
                    width: '380px',
                    height: '530px',
                    data: { component: SigninformComponent }
                });
            }
        });
    }

    gotoForgot() {
        this.dialog.closeAll();
        localStorage.setItem('forgorPass', '');
        const dialogRef = this.dialog.open(SignindialogComponent, {
            panelClass: 'custom-dialog-container-no-scroll',
            width: '380px',
            height: '420px',
            data: { component: ForgotpasswordComponent }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (localStorage.getItem('forgorPass') !== 'closed') {
                this.dialog.open(SignindialogComponent, {
                    panelClass: 'custom-dialog-container-no-scroll',
                    width: '380px',
                    height: '530px',
                    data: { component: SigninformComponent }
                });
            }
        });
    }


}
