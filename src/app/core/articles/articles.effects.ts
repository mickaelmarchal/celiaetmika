import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import { ArticlesActions } from './articles.actions';
import { ArticlesRequestService } from './articles.service';
import { Article } from './articles.model';
import { EntityCollection, Entity } from '../entity';


@Injectable()
export class ArticlesEffects {

  constructor(
    private actions$: Actions,
    private articlesRequestService: ArticlesRequestService,
    private articlesActions: ArticlesActions
  ) { }


  @Effect() public getArticles$ = this.actions$

    .ofType(ArticlesActions.GET_ARTICLES)

    // Map the payload into JSON to use as the request body
    .map((action) => action.payload)
    .switchMap((payload) => this.articlesRequestService.getArticles()

      .map((res) => { console.log(res, 'effect rest'); return res; })

      // If successful, dispatch success action with result
      .mergeMap((res: EntityCollection<Article>) => Observable.of(
        this.articlesActions.getArticlesSuccess(res)
        )
      )

      // If request fails, dispatch failed action
      .catch((err: EntityCollection<Article>) => Observable.of(
        this.articlesActions.getArticlesFail(err)
      ))
    );

  @Effect() public getArticle$ = this.actions$

    .ofType(ArticlesActions.GET_ARTICLE)

    // Map the payload into JSON to use as the request body
    .map((action) => action.payload)
    .switchMap((payload) => this.articlesRequestService.getArticle(payload)

      // If successful, dispatch success action with result
      .mergeMap((res: Entity<Article>) => Observable.of(
        this.articlesActions.getArticleSuccess(res)
        )
      )

      // If request fails, dispatch failed action
      .catch((err: Entity<null>) => Observable.of(
        this.articlesActions.getArticleFail(err)
      ))
    );
}
