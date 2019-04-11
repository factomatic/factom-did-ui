import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { ActionType } from 'src/app/core/enums/action-type';
import { AppState } from 'src/app/core/store/app.state';
import { BaseComponent } from '../../base.component';
import { CreateAdvancedStepsIndexes } from 'src/app/core/enums/create-advanced-steps-indexes';
import { CreateBasicStepsIndexes } from 'src/app/core/enums/create-basic-steps-indexes';
import { CreateRoutes } from 'src/app/core/enums/create-routes';
import CustomValidators from 'src/app/core/utils/customValidators';
import { KeysService } from 'src/app/core/services/keys.service';
import { MoveToStep, ClearForm } from 'src/app/core/store/action/action.actions';
import { SharedRoutes } from 'src/app/core/enums/shared-routes';
import { Subscription } from 'rxjs';
import { TooltipMessages } from 'src/app/core/utils/tooltip.messages';
import { WorkflowService } from 'src/app/core/services/workflow.service';

@Component({
  selector: 'app-encrypt-keys',
  templateUrl: './encrypt-keys.component.html',
  styleUrls: ['./encrypt-keys.component.scss']
})
export class EncryptKeysComponent extends BaseComponent implements OnInit {
  private subscription$: Subscription;
  public currentStepIndex = CreateAdvancedStepsIndexes.EncryptKeys;
  public encryptForm;
  public encryptedFile: string;
  public fileDowloaded: boolean;
  public keysGenerated: boolean;
  public tooltipMessage = TooltipMessages.EncryptHeaderTooltip;
  public boldPartTooltipMessage = TooltipMessages.EncryptHeaderBoldPartTooltip;
  public continueButtonText = 'Skip';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<AppState>,
    private keysService: KeysService,
    private workflowService: WorkflowService) {
    super();
  }

  ngOnInit() {
    this.subscription$ = this.store
     .pipe(select(state => state))
     .subscribe(state => {
        if (state.form.publicKeys.length > 0 || state.form.authenticationKeys.length > 0) {
          this.keysGenerated = true;
          this.continueButtonText = 'Next';
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
      downloader.setAttribute('download', `paper-did-UTC--${date.toISOString()}`);
      downloader.click();

      this.fileDowloaded = true;
    }
  }

  goToNext() {
    if (this.fileDowloaded || !this.keysGenerated) {
      const selectedAction = this.workflowService.getSelectedAction();
      if (selectedAction === ActionType.CreateAdvanced) {
        this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.Summary));
        this.router.navigate([CreateRoutes.Summary]);
      } else if (selectedAction === ActionType.CreateBasic) {
        this.store.dispatch(new MoveToStep(CreateBasicStepsIndexes.Summary));
        this.router.navigate([CreateRoutes.Summary]);
      }
    }
  }

  goToPrevious() {
    const selectedAction = this.workflowService.getSelectedAction();
    if (selectedAction === ActionType.CreateAdvanced) {
      this.store.dispatch(new MoveToStep(CreateAdvancedStepsIndexes.Services));
      this.router.navigate([CreateRoutes.Services]);
    } else if (selectedAction === ActionType.CreateBasic) {
      this.store.dispatch(new ClearForm());
      this.router.navigate([SharedRoutes.Action]);
    }
  }

  get password () {
    return this.encryptForm.get('password');
  }

  get confirmPassword () {
    return this.encryptForm.get('confirmPassword');
  }
}
