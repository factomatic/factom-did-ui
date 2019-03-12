import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from '../../base.component';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-finalize',
  templateUrl: './finalize.component.html',
  styleUrls: ['./finalize.component.scss']
})
export class FinalizeComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  protected didDocument: Object;
  protected didDocumentPretified: string;

  constructor(
    private router: Router,
    private store: Store<AppState>) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
     .pipe(select(state => state.form))
     .subscribe(form => {
        const publicKeys = form.publicKeys.map(k => ({
          id: `did:example:123456789abcdefghi#${k.alias}`,
          type: k.type,
          controller: k.controller,
          publicKeyBase58: k.publicKey
        }));

        const embeddedAuthenticationKeys = [];
        const fullAuthenticationKeys = [];
        form.authenticationKeys.forEach(k => {
          if (form.publicKeys.includes(k)) {
            embeddedAuthenticationKeys.push(`did:example:123456789abcdefghi#${k.alias}`);
          } else {
            fullAuthenticationKeys.push({
              id: `did:example:123456789abcdefghi#${k.alias}`,
              type: k.type,
              controller: k.controller,
              publicKeyBase58: k.publicKey
             });
          }
        });

        const authenticationKeys = embeddedAuthenticationKeys.concat(fullAuthenticationKeys);
        const services = form.services.map(s => ({
          id: `did:example:123456789abcdefghi#${s.alias}`,
          type: s.type,
          serviceEndpoint: s.endpoint
        }));

        this.didDocument = {
          '@context': 'https://example.org/example-method/v1',
          'id': 'did:example:123456789abcdefghi',
          'publicKey': publicKeys,
          'authentication': authenticationKeys,
          'service': services
        };

        this.didDocumentPretified = JSON.stringify(this.didDocument, null, 2);
     });

    this.subscriptions.push(this.subscription$);
  }

  finalize() {
    this.store.dispatch(new CompleteStep(CreateStepsIndexes.Finalize));
  }

  goToPrevious() {
    this.router.navigate(['/create/keys/encrypt']);
  }
}
