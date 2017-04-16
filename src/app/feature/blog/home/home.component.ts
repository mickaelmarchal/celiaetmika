import {Component, OnDestroy, OnInit} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';

import { ArticlesService } from '../../../core/articles/articles.service';
import { Article } from '../../../core/articles/articles.model';
import { EntityCollection } from '../../../core/entity';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public articles: EntityCollection<Article>;
  private subscription: any;

  constructor(
    // public  router: Router,
    public  title: Title,
    public  route: ActivatedRoute,
    public  articlesService: ArticlesService,
  ) {
  }


  public ngOnInit(): void {
    this.title.setTitle('Le blog de Célia et Mika');

    // the forEach allows listening to all changes in the params (which is an observable)
    this.route.params.forEach((params: Params) => {

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.articlesService.onArticlesChange().subscribe(
        (articles: EntityCollection<Article>) => {
          this.articles = articles;

          // article loaded
          if (! this.articles.loadState) {
            if (null === this.articles.loadState) {
              this.articlesService.getArticles();
            }
          }
        }
      );
    });
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
