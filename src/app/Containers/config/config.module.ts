import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TimeManagerComponent } from './time-manager/time-manager.component';
// import { SocialMediaComponent } from './SocialMedia/social-media.component';
import { SocialMediaModule } from './SocialMedia/social-media.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    SocialMediaModule
  ],
  declarations: [
    // TimeManagerComponent
  ]
})
export class ConfigModule { }
