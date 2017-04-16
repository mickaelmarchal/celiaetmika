import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';

import { BlogRoutingModule } from './blog-routing.module';

import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,

    BlogRoutingModule
  ],
  declarations: [HomeComponent, ArticleComponent]
})
export class BlogModule { }
