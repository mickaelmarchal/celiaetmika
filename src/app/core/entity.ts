import { Injectable } from '@angular/core';
import { Response, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


/***************************
 * TODO
 *
 * 1. trouver pourquoi quand on charge la liste des users les console.log on l'air de dire que c'est bon mais le plugin redux non.
 * => NORMALEMENT C'EST OK CA
 *
 * apres, revoir l'affichage du tableau pour qu'il fonctionne avec les maps, et faire marcher la visualisation de user.
 *
 * et apres repasser sur add, edit et sur delete
 *
 */


/**
 * Pagination interface - holds pagination data for a EntityCollection
 */
export interface Pagination {
  limit: number;
  page: number;
  pages: number;
  total: number;
  links: any;
}


/**
 * EntityError interface
 * Holds information about an error
 */
export interface EntityError {
  readonly code: number;
  readonly message: string;
  readonly exception?: any;
}


/**
 * Entity interface - holds data and metadata about a data entity
 */
export interface Entity<T> {
  data: T|null;
  loadState: boolean;
  error?: EntityError;
  exp?: number;
}


/**
 * EntityCollection interface - holds a collection of entities and associated metadata
 */
export interface EntityCollection<T> {
  collection: Map<number, Entity<T>>;
  pagination?: Pagination;
  loadState: boolean;
  error?: EntityError;
  exp?: number;
}


/**
 * Base class for backend-requesting services
 *
 * Provides error handling and other helpers that are used by all Requester services
 */
@Injectable()
export class ServerRequesterBaseService {

  /**
   * Extracts and build an Entity from server response
   *
   * If the response includes information about pagination, handle it as well
   *
   * @param map mapping function, to extract just a part of the response as payload
   */
  protected extractEntity(map = null) {

    return (res: Response) => {
      let body = res.json() || {};

      if (!map) {
        map = (value) => {
          return value;
        };
      }

      return {
        data: map(body),
        loadState: true
      };
    };

  }


  /**
   * Extracts and build an EntityCollection from server response
   *
   * @param map mapping function, to extract just a part of the response as payload (useful when there is pagination)
   */
  protected extractEntityCollection(map = null) {

    return (res: Response) => {

      let body = res.json() || {};

      if (!map) {
        map = (value) => {
          return value;
        };
      }

      // Extract pagination data if available
      let pagination = null;
      if (body.limit) {
        pagination = {
          limit: body.limit,
          page: body.page,
          pages: body.pages,
          total: body.total,
          links: body._links
        };
      }

      console.log(body, 'body');

      // Convert all items of collection in Entities
      let rawCollection = map(body) || [];

      console.log(rawCollection, 'rawCollection');

      let collection = new Map();

      for (let item of rawCollection) {

        console.log(item, 'item');

        collection.set(item.id, {
          data: item,
          loadState: true,
        });
      }

      console.log(collection, 'collection');

      // Build the collection object
      return {
        collection,
        pagination,
        loadState: true
      };
    };
  }


  /**
   * Handle errors for single Entities (non 2xx HTTP responses)
   * Extracts all available information from response and create a Entity object with error
   *
   * @param response
   * @returns Observable<ServerResponse<null>>
   */
  protected handleEntityError (response: Response | any): Observable<Entity<null>> {

    // Default error: use generic message
    let error = {
      code: 0,
      message: 'An error occurred.'
    };

    if (response instanceof Response) {
      let body = response.json() || {};
      if (typeof body.error !== 'undefined') {
        // Standard error response from server: use the information returned
        error = {
          code: body.error.code,
          message: body.error.message
        };
      } else {
        // Undefined / non-standard response from server: use HTTP status and text
        error = {
          code: response.status,
          message: response.statusText
        };
      }
    }

    return Observable.throw({
      loadState: null,
      error
    });
  }

  /**
   * Handle errors for EntityCollections (non 2xx HTTP responses)
   * Extracts all available information from response and create a EntityCollection object with error
   *
   * @param response
   * @returns Observable<ServerResponse<null>>
   */
  protected handleEntityCollectionError (response: Response | any): Observable<EntityCollection<null>> {

    // Default error: use generic message
    let error = {
      code: 0,
      message: 'An error occurred.'
    };

    if (response instanceof Response) {
      let body = response.json() || {};
      if (typeof body.error !== 'undefined') {
        // Standard error response from server: use the information returned
        error = {
          code: body.error.code,
          message: body.error.message
        };
      } else {
        // Undefined / non-standard response from server: use HTTP status and text
        error = {
          code: response.status,
          message: response.statusText
        };
      }
    }

    return Observable.throw({
      collection: new Map(),
      loadState: null,
      error
    });
  }
}
