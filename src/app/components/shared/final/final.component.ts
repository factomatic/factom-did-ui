import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from 'src/app/components/base.component';
import { ClearForm } from 'src/app/core/store/action/action.actions';

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
    private router: Router,
    private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.route.queryParams.subscribe(params => {
      this.externalLink = params.url;
    });

    this.subscriptions.push(this.subscription$);
  }

  createAnother() {
    this.store.dispatch(new ClearForm());
    this.router.navigate(['action']);
  }
}
