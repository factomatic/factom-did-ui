import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  protected secondTabLink = '/create/keys/public';
  protected thirdTabLink = '/create/keys/authentication';
  protected forthTabLink = '/create/services';

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.store
     .pipe(select(state => state.action.selectedAction))
     .subscribe(selectedAction => {
       if (selectedAction) {
        this.secondTabLink = `/${selectedAction}/keys/public`;
        this.thirdTabLink = `/${selectedAction}/keys/authentication`;
        this.forthTabLink = `/${selectedAction}/services`;
       }
     });
  }
}
