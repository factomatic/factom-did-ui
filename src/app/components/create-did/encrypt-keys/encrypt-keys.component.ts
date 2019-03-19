import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from '../../base.component';
import { CompleteStep } from 'src/app/core/store/action/action.actions';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import { CreateStepsIndexes } from 'src/app/core/enums/create-steps-indexes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { KeysService } from 'src/app/core/services/keys.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-encrypt-keys',
  templateUrl: './encrypt-keys.component.html',
  styleUrls: ['./encrypt-keys.component.scss']
})
export class EncryptKeysComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  protected lastCompletedStepIndex: number;
  protected currentStepIndex = CreateStepsIndexes.EncryptKeys;
  protected encryptForm;
  protected encryptedFile: string;
  protected fileDowloaded: boolean;
  protected keysGenerated: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private keysService: KeysService) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
     .pipe(select(state => state))
     .subscribe(state => {
        this.lastCompletedStepIndex = state.action.lastCompletedStepIndex;
        if (state.form.publicKeys.length > 0 || state.form.authenticationKeys.length > 0) {
          this.keysGenerated = true;
        }
     });

    this.subscriptions.push(this.subscription$);

    this.encryptForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: CustomValidators.passwordsDoMatch.bind(this)});
  }

  encryptKeys() {
    if (this.encryptForm.invalid) {
      return;
    }

    this.keysService
      .encryptKeys(this.password.value)
      .subscribe(encryptedFile => {
        this.encryptedFile = encryptedFile;
        this.encryptForm.reset();
      });
  }

  downloadFile() {
    if (this.encryptedFile) {
      const downloader = document.createElement('a');
      document.body.appendChild(downloader);

      const blob = new Blob([this.encryptedFile], { type: 'text/json' });
      const url = window.URL;
      const fileUrl = url.createObjectURL(blob);

      downloader.setAttribute('href', fileUrl);
      const date = new Date();
      downloader.setAttribute('download', `UTC--${date.toISOString()}--did-keys-backup`);
      downloader.click();

      this.fileDowloaded = true;
    }
  }

  goToNext() {
    if (this.fileDowloaded || this.lastCompletedStepIndex === CreateStepsIndexes.EncryptKeys || !this.keysGenerated) {
      if (this.lastCompletedStepIndex === CreateStepsIndexes.Services) {
        this.store.dispatch(new CompleteStep(CreateStepsIndexes.EncryptKeys));
      }

      this.router.navigate([CreateRoutes.Finalize]);
    }
  }

  goToPrevious() {
    this.router.navigate([CreateRoutes.Services]);
  }

  get password () {
    return this.encryptForm.get('password');
  }

  get confirmPassword () {
    return this.encryptForm.get('confirmPassword');
  }
}
