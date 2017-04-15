import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LayoutComponent } from './general/layout/layout.component';
import { Page404Component } from './general/page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    Page404Component
  ],
  imports: [
    CoreModule.forRoot(),

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
