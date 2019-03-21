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
  protected externalLink: string;
  protected successMessage = `You're done! Your DID is in ` +
  `the process of being recorded on the Factom blockchain and it shoud be included in the next block. You can track ` +
  `the progress in the blockchain explorer.`;

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
