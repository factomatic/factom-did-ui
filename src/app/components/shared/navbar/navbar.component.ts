import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateStepsUrls } from 'src/app/core/enums/create-steps-urls';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public lastCompletedStepIndex: number;
  public firstTabLink: string;
  public secondTabLink: string;
  public thirdTabLink: string;
  public forthTabLink: string;
  public fifthTabLink: string;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.store
     .pipe(select(state => state.action))
     .subscribe(action => {
       this.lastCompletedStepIndex = action.lastCompletedStepIndex;
       if (action.selectedAction === ActionType.Create) {
        this.firstTabLink = CreateStepsUrls.PublicKeys.toString();
        this.secondTabLink = CreateStepsUrls.AuthenticationKeys.toString();
        this.thirdTabLink = CreateStepsUrls.Services.toString();
        this.forthTabLink = CreateStepsUrls.EncryptKeys.toString();
        this.fifthTabLink = CreateStepsUrls.Summary.toString();
       }
     });
  }
}
