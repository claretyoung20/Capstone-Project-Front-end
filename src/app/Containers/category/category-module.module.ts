import { CategoryEditComponent } from './category-edit/category-edit.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { CategoryComponent } from './category.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  declarations: [
    CategoryComponent,
    CategoryEditComponent
  ]
})
export class CategoryModuleModule { }
