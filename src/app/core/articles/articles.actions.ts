import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

import { Article } from './articles.model';
import { EntityCollection, Entity } from '../entity';

@Injectable()

export class ArticlesActions {

  /* get users */
  public static GET_ARTICLES = '[Articles] Get articles';
  public getArticles(): Action {
    return {
      type: ArticlesActions.GET_ARTICLES,
    };
  }

  public static GET_ARTICLES_SUCCESS = '[Articles] Get articles Success';
  public getArticlesSuccess(articles: EntityCollection<Article>): Action {
    return {
      type: ArticlesActions.GET_ARTICLES_SUCCESS,
      payload: articles
    };
  }

  public static GET_ARTICLES_FAIL = '[Articles] Get articles Fail';
  public getArticlesFail(err: EntityCollection<Article>): Action {
    return {
      type: ArticlesActions.GET_ARTICLES_FAIL,
      payload: err
    };
  }

  /* get user */
  public static GET_ARTICLE = '[Articles] Get article';
  public getArticle(articleId: number): Action {
    return {
      type: ArticlesActions.GET_ARTICLE,
      payload: articleId
    };
  }

  public static GET_ARTICLE_SUCCESS = '[Articles] Get article Success';
  public getArticleSuccess(article: Entity<Article>): Action {
    return {
      type: ArticlesActions.GET_ARTICLE_SUCCESS,
      payload: article
    };
  }

  public static GET_ARTICLE_FAIL = '[Articles] Get article Fail';
  public getArticleFail(err: Entity<Article>): Action {
    return {
      type: ArticlesActions.GET_ARTICLE_FAIL,
      payload: err
    };
  }

}
