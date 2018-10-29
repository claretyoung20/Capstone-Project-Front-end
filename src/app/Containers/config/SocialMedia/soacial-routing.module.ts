import { EditSocialComponent } from './edit-social/edit-social.component';
import { SocialMediaComponent } from './social-media.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateSocialComponent } from './create-social/create-social.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
       path: '',
       component: SocialMediaComponent
      },
      {
        path: 'create',
        component: CreateSocialComponent
      },
      {
        path: 'edit/:id',
        component: EditSocialComponent
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoacialRoutingModule { }
