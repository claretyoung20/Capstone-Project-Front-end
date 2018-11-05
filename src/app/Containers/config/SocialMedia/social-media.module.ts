import { MaterialModule } from './../../../material/material.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoacialRoutingModule } from './soacial-routing.module';
import { SocialMediaComponent } from './social-media.component';

@NgModule({
  imports: [
    CommonModule,
    SoacialRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    SocialMediaComponent
  ]
})
export class SocialMediaModule { }
