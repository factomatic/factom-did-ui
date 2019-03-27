import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '../../base.component';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  public externalLink: string;

  constructor(private route: ActivatedRoute) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.route.queryParams.subscribe(params => {
      this.externalLink = params.url;
    });

    this.subscriptions.push(this.subscription$);
  }
}
