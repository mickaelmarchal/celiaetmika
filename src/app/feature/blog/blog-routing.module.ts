import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ArticleComponent } from './article/article.component';


@NgModule({
  imports: [RouterModule.forChild([
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'articles/:article',
      component: ArticleComponent,
    }
  ])],
  exports: [RouterModule]
})
export class BlogRoutingModule {}
