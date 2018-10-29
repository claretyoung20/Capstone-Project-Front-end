import { MaterialModule } from './../../../material/material.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSocialComponent } from './create-social/create-social.component';
import { SoacialRoutingModule } from './soacial-routing.module';
import { EditSocialComponent } from './edit-social/edit-social.component';
import { FormSocialComponent } from './form-social/form-social.component';
import { SocialMediaComponent } from './social-media.component';

@NgModule({
  imports: [
    CommonModule,
    SoacialRoutingModule,
    MaterialModule,
    SharedModule
  ],
  declarations: [
    SocialMediaComponent,
    CreateSocialComponent,
    EditSocialComponent,
    FormSocialComponent
  ]
})
export class SocialMediaModule { }
