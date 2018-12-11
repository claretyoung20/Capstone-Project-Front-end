import { DATE_TIME_FORMAT } from './../../../static/constants/site.constants';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './../../../entities/services/category/category.service';
import { Category } from 'app/entities/interfaces/category';
import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.css']
})
export class CategoryEditComponent implements OnInit {
  id: any;
  private _category: Category;
  isSaving: boolean;

  dateCreated: string;
  dateUpdated: string;

  constructor(
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ category }) => {
      this.category = category;
    });

    this.category = {};

    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.id = params.get('id');
        this.getCategoryId(this.id);
      } else {
        // error handling
      }
    });
  }

  previousState() {
    window.history.back();
  }

  getCategoryId(id) {
    this.categoryService.find(id).subscribe(res => {
      this.category = res;
    });
  }

  save() {
    this.isSaving = true;
    this.category.restaurantId = 1;
    if (this.category.id !== undefined) {
      this.categoryService
        .update(this.category)
        .subscribe(
          res => this.onSaveSuccess(),
          (res: HttpErrorResponse) => this.onSaveError()
        );
    } else {
      this.categoryService.create(this.category)
      .subscribe(
        res => this.onSaveSuccess(),
        (res: HttpErrorResponse) => this.onSaveError()
      );
    }
  }


  private onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  private onSaveError() {
    this.isSaving = false;
  }

  get category() {
    return this._category;
  }

  set category(category: Category) {
    this._category = category;
  }
}
