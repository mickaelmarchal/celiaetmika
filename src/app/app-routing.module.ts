import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { LayoutComponent } from './general/layout/layout.component';
import { Page404Component } from './general/page404/page404.component';


@NgModule({
  imports: [RouterModule.forRoot([

    // all modules below are using the standard layout, and user must be logged-in
    {
      path: '',
      component: LayoutComponent,
      children: [
        // lazy-loaded feature modules
        {
          path: '',
          loadChildren: './feature/blog/blog.module#BlogModule',
        }
      ]
    },

    // page 404
    {
      path: '**',
      component: Page404Component,
    }
  ], { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
