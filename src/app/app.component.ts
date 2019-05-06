import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from './core/store/app.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedAction: string;

  constructor (
    private cd: ChangeDetectorRef,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(select(state => state.action))
      .subscribe(action => {
        this.selectedAction = action.selectedAction;
        this.cd.detectChanges();
      });
  }
}
