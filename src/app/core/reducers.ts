import { combineReducers } from '@ngrx/store';
import { routerReducer, RouterState } from '@ngrx/router-store';

// import { User } from './users/users.model';
// import { usersReducer } from './users/users.reducer';

import { Article } from './articles/articles.model';
import { articlesReducer } from './articles/articles.reducer';

import { EntityCollection } from './entity';

export interface AppState {
  router: RouterState;
  // users: EntityCollection<User>;
  articles: EntityCollection<Article>;
}

export const reducers = {
  router: routerReducer,
  // users: usersReducer,
  articles: articlesReducer
};


const productionReducer = combineReducers(reducers);

export function rootReducer(state: any, action: any) {
  return productionReducer(state, action);
}
