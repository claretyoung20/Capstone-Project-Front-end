import { MenuComponent } from './menu.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    MenuComponent,
    MenuEditComponent
  ]
})
export class MenuModule { }
