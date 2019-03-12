import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  protected lastCompletedStepIndex: number;
  protected secondTabLink = '/create/keys/public';
  protected thirdTabLink = '/create/keys/authentication';
  protected forthTabLink = '/create/services';
  protected fifthTabLink = '/create/keys/encrypt';
  protected sixthTabLink = '/create/finalize';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store
     .pipe(select(state => state.action))
     .subscribe(action => {
       this.lastCompletedStepIndex = action.lastCompletedStepIndex;
       if (action.selectedAction) {
        this.secondTabLink = `/${action.selectedAction}/keys/public`;
        this.thirdTabLink = `/${action.selectedAction}/keys/authentication`;
        this.forthTabLink = `/${action.selectedAction}/services`;
        this.fifthTabLink = `/${action.selectedAction}/keys/encrypt`;
        this.sixthTabLink = `/${action.selectedAction}/finalize`;
       }
     });
  }
}
