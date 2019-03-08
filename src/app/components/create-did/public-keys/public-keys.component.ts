import { CollapseComponent } from 'angular-bootstrap-md';
import { Component, OnInit, AfterViewInit, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.scss']
})
export class PublicKeysComponent implements OnInit, AfterViewInit {
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  protected generatedKeys = [];
  protected title = '';
  protected keyForm;

  constructor(
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.keyForm = this.fb.group({
      type: ['', [Validators.required]],
      controller: ['', [Validators.required]],
      alias: ['', [Validators.required]]
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });
  }

  generateKey() {
    if (this.keyForm.invalid) {
      return;
    }

    this.generatedKeys.push({
      type: this.type.value,
      controller: this.controller.value,
      alias: this.alias.value,
      pubKey: '2aommKjGU5bVm3HfaetG...NrcMTBHhTv'
    });

    this.keyForm.reset();
  }

  goToNext() {
  }

  goToPrevious() {
    this.router.navigate(['action']);
  }

  get type () {
    return this.keyForm.get('type');
  }

  get alias () {
    return this.keyForm.get('alias');
  }

  get controller () {
    return this.keyForm.get('controller');
  }
}
