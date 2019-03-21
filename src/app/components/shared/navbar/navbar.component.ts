import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { CreateStepsUrls } from 'src/app/core/enums/create-steps-urls';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  protected lastCompletedStepIndex: number;
  protected secondTabLink = CreateStepsUrls.PublicKeys.toString();
  protected thirdTabLink = CreateStepsUrls.AuthenticationKeys.toString();
  protected forthTabLink = CreateStepsUrls.Services.toString();
  protected fifthTabLink = CreateStepsUrls.EncryptKeys.toString();
  protected sixthTabLink = CreateStepsUrls.Summary.toString();

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
        this.sixthTabLink = `/${action.selectedAction}/summary`;
       }
     });
  }
}
