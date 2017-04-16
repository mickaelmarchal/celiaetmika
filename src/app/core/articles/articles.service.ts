import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { API_BASE_URL } from '../../constants';
import { Entity, EntityCollection, ServerRequesterBaseService } from '../entity';

import { Article } from './articles.model';
import { ArticlesActions } from './articles.actions';
import { AppState } from '../reducers';



/**
 * Internal-use auth service, must not be used outside of auth / core module
 */
@Injectable()
export class ArticlesRequestService extends ServerRequesterBaseService {

  constructor(
    public http: Http
  ) {
    super();
  }

  /**
   * Get all articles
   * @returns {Observable<EntityCollection<Article>>}
   */
  public getArticles(): Observable<EntityCollection<Article>> {
    return this.http.get(`${API_BASE_URL}/v2/posts`)
      .map(this.extractEntityCollection())
      .catch(this.handleEntityCollectionError);
  }

  /**
   * Get one article by id
   * @returns {Observable<ServerResponse<Article>>}
   * @param articleId
   */
  public getArticle(articleId: number): Observable<Entity<Article>> {
    return this.http.get(`${API_BASE_URL}/v2/posts/${articleId}`)
      .map(this.extractEntity())
      .catch(this.handleEntityError);
  }

}


/**
 * Public ArticlesService
 */
@Injectable()
export class ArticlesService {

  constructor(
    private store: Store<AppState>,
    private articlesActions: ArticlesActions
  ) { }


  /**
   * Observes articles changed event
   * @returns {Observable<EntityCollection<Article>>}
   */
  public onArticlesChange(): Observable<EntityCollection<Article>> {
    return this.store.select((state) => { return state.articles; });
  }

  /**
   * Observes article changed event
   *
   * @param article article to observe
   * @returns {Observable<Entity<Article>>} event when observed article is changed
   */
  public onArticleChange(articleId: number): Observable<Entity<Article>> {
    return this.store
      // select all entities of collection "articles"
      .select((state) => { return state.articles.collection.get(articleId) || { data: null, loadState: null }; });
  }


  /**
   * Get articles
   */
  public getArticles(): void {
    this.store.dispatch(this.articlesActions.getArticles());
  }

  /**
   * Get one article
   * @param articleId
   */
  public getArticle(articleId: number): void {
    this.store.dispatch(this.articlesActions.getArticle(articleId));
  }

}
