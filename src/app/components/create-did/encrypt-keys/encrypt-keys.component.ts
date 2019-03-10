import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { KeyModel } from 'src/app/core/models/key.model';
import { KeysService } from 'src/app/core/services/keys.service';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';

@Component({
  selector: 'app-encrypt-keys',
  templateUrl: './encrypt-keys.component.html',
  styleUrls: ['./encrypt-keys.component.scss']
})
export class EncryptKeysComponent implements OnInit {
  protected generatedKeys: KeyModel[] = [];
  protected encryptForm;
  protected encrypted: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private keysService: KeysService) { }

  ngOnInit() {
    this.store
     .pipe(select(state => state.form))
     .subscribe(form => {
       this.generatedKeys = form.publicKeys;
       const generatedAuthenticationKeys = form.authenticationKeys.filter(k => !form.publicKeys.includes(k));
       generatedAuthenticationKeys.forEach(key => {
         this.generatedKeys.push(key);
       });
     });

    this.encryptForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  encryptKeys() {
    this.encrypted = true;
  }

  goToNext() {
    if (this.encrypted) {
      this.store.dispatch(new CompleteStep(CreateStepsIndexes.EncryptKeys));
      this.router.navigate(['/create/finalize']);
    }
  }

  goToPrevious() {
    this.router.navigate(['/create/services']);
  }

  get password () {
    return this.encryptForm.get('password');
  }

  get confirmPassword () {
    return this.encryptForm.get('confirmPassword');
  }
}
