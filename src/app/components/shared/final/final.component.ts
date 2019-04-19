import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { BaseComponent } from 'src/app/components/base.component';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  public externalLink: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.route.queryParams.subscribe(params => {
      this.externalLink = params.url;
    });

    this.subscriptions.push(this.subscription$);
  }

  createAnother() {
    this.router.navigate(['action']);
  }
}
