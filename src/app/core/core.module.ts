import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { rootReducer } from './reducers';

import './rxjs.imports';

// import { UsersActions } from './users/users.actions';
// import { UsersEffects } from './users/users.effects';
// import { UsersService, UsersRequestService } from './users/users.service';

import { ArticlesActions } from './articles/articles.actions';
import { ArticlesEffects } from './articles/articles.effects';
import { ArticlesService, ArticlesRequestService } from './articles/articles.service';


// import StoreDevTools (Redux dev tools) if dev mode
/*const STORE_DEV_TOOLS_IMPORTS = [];
if (environment.production) {
  STORE_DEV_TOOLS_IMPORTS.push(...[
    StoreDevtoolsModule.instrumentOnlyWithExtension()
  ]);
}*/


@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,

    NgbModule,

    // EffectsModule.run(UsersEffects),
    EffectsModule.run(ArticlesEffects),

    RouterStoreModule.connectRouter(),
    StoreModule.provideStore(rootReducer),

    // STORE_DEV_TOOLS_IMPORTS
  ],
  declarations: [],
  providers: [

/*    UsersActions,
    UsersService,
    UsersRequestService, */

    ArticlesActions,
    ArticlesService,
    ArticlesRequestService
  ],
  exports: []
})
export class CoreModule {

  // convention to say that it can only be imported by root module
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [ ]
    };
  }

  // prevents re-import if already imported
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }

}
