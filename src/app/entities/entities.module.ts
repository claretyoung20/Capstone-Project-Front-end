import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginServiceService } from 'app/Containers/login/service/LoginServiceService';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    LoginServiceService,
  ]
})
export class EntitiesModule { }
