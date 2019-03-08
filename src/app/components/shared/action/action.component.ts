import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { SelectAction } from 'src/app/core/store/action/action.actions';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  protected title =  'What do you want to do ?';
  protected actionType: string;

  constructor(
    private store: Store<AppState>,
    private router: Router) { }

  ngOnInit() {
  }

  goToNext() {
    this.store.dispatch(new SelectAction(this.actionType));
    this.router.navigate([`${this.actionType}/keys/public`]);
  }
}
