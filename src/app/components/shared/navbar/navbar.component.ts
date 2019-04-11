import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { CreateRoutes } from 'src/app/core/enums/create-routes';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public actionType = ActionType;
  public lastCompletedStepIndex: number;
  public selectedAction: string;
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
       this.selectedAction = action.selectedAction;

       if (action.selectedAction === ActionType.CreateAdvanced) {
        this.firstTabLink = CreateRoutes.PublicKeys.toString();
        this.secondTabLink = CreateRoutes.AuthenticationKeys.toString();
        this.thirdTabLink = CreateRoutes.Services.toString();
        this.forthTabLink = CreateRoutes.EncryptKeys.toString();
        this.fifthTabLink = CreateRoutes.Summary.toString();
       } else if (action.selectedAction === ActionType.CreateBasic) {
         this.firstTabLink = CreateRoutes.EncryptKeys.toString();
         this.secondTabLink = CreateRoutes.Summary.toString();
       }
     });
  }
}
