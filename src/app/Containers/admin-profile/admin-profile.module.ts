import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';
import {AdminProfileComponent} from './admin-profile.component';
import {NgJhipsterModule} from 'ng-jhipster';
import { AlertSuccessComponent } from './alert-success/alert-success.component';

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      NgJhipsterModule
  ],
  declarations: [
      AdminProfileComponent,
      AlertSuccessComponent
  ],
    entryComponents: [
        AlertSuccessComponent
    ]
})
export class AdminProfileModule { }
