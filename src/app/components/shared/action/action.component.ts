import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  protected title =  'What do you want to do ?';
  protected actionType: string;

  constructor() { }

  ngOnInit() {
  }

  goToNext() {
  }
}
