import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public article: any;

  constructor(
    private route: ActivatedRoute
  ) {
  }

  public ngOnInit(): void {

    this.article = {
      name: 'none'
    };

    // the forEach allows listening to all changes in the params (which is an observable)
    this.route.params.forEach((params: Params) => {
      this.article.name = params.article;
    });

  }
}
