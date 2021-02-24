import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DefaultFooterComponent } from './default-footer.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ DefaultFooterComponent ],
    exports: [ DefaultFooterComponent ]
})

export class DefaultFooterModule {}
