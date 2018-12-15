import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MaterialModule} from '../../material/material.module';
import {FormsModule} from '@angular/forms';
import {AdminProfileComponent} from './admin-profile.component';
import {NgJhipsterModule} from 'ng-jhipster';

@NgModule({
  imports: [
      CommonModule,
      MaterialModule,
      FormsModule,
      NgJhipsterModule
  ],
  declarations: [
      AdminProfileComponent
  ]
})
export class AdminProfileModule { }
