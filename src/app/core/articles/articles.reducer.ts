import { Action } from '@ngrx/store';

import { ArticlesActions } from './articles.actions';
import { Article } from './articles.model';
import { EntityCollection } from '../entity';

/**
 * Initial state for store
 */
const initialState: EntityCollection<Article> = {
  collection: new Map(),
  loadState: null
};


export function articlesReducer(state = initialState, action: Action): EntityCollection<Article> {

  switch (action.type) {

    /********** GET ARTICLES **********/
    // get articles has started
    case ArticlesActions.GET_ARTICLES: {
      return Object.assign({}, state, {
        loadState: false,
        error: null
      });
    }

    // get articles have failed
    case ArticlesActions.GET_ARTICLES_FAIL: {
      return Object.assign({}, state, action.payload);
    }

    // get articles success
    case ArticlesActions.GET_ARTICLES_SUCCESS: {
      return Object.assign({}, state, action.payload);
    }

    /********** GET ARTICLE **********/
    // get article has started
    case ArticlesActions.GET_ARTICLE: {

      // set the retrieved article in the collection
      let newState = Object.assign({}, state);
      newState.collection.set(action.payload, {
        data: null,
        loadState: false,
        error: null
      });

      return newState;
    }

    // get article failed
    case ArticlesActions.GET_ARTICLE_FAIL: {

      // set the retrieved article (in error) in the collection
      let newState = Object.assign({}, state);

      // TODO ici data.id c'est null. Il faudrait récupérer l'id demandé par le composant,
      // donc passer ler articleId dans la payload depuis GET_ARTICLE
      newState.collection.set(action.payload.data.id, action.payload);

      return newState;
    }

    // get article success
    case ArticlesActions.GET_ARTICLE_SUCCESS: {

      // set the retrieved article in the collection
      let newState = Object.assign({}, state);
      newState.collection.set(action.payload.data.id, action.payload);

      return newState;
    }

    default: {
      return state;
    }
  }
}

