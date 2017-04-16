import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ArticlesService } from '../../../core/articles/articles.service';
import { Entity } from '../../../core/entity';
import { Article } from '../../../core/articles/articles.model';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit, OnDestroy {

  public articleId: number;
  public article: Entity<Article>;

  private subscription: any;

  constructor(
    private route: ActivatedRoute,
    public  title: Title,
    public  articlesService: ArticlesService
  ) {
  }

  public ngOnInit(): void {

    // the forEach allows listening to all changes in the params (which is an observable)
    this.route.params.forEach((params: Params) => {
      this.articleId = parseInt(params.articleId, 10);

      if (this.subscription) {
        this.subscription.unsubscribe();
      }

      this.subscription = this.articlesService.onArticleChange(this.articleId).subscribe(
        (article: Entity<Article>) => {
          this.article = article;

          // article loaded
          if (this.article.loadState) {
            this.title.setTitle(this.article.data.title.rendered);
          } else {
            this.title.setTitle('Le blog de Célia et Mika');

            // article not loaded: load it
            if (null === this.article.loadState) {
              this.articlesService.getArticle(this.articleId);
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
