import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class CreateUserComponent implements OnInit {
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;

  roleOptions = ['Administrador', 'Profesor'];

  passwordInputType = 'password';
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.roleOptions[3]],
      phone: [],
    });

    this.passwordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      passwordConfirm: [null, Validators.required],
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });

    /**
     * Vertical Stepper
     * @type {FormGroup}
     */
    this.verticalAccountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.roleOptions[3]],
      phone: [],
    });

    this.verticalPasswordFormGroup = this.fb.group({
      password: [
        null,
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
      passwordConfirm: [null, Validators.required],
    });

    this.verticalConfirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });
  }

  showPassword() {
    this.passwordInputType = 'text';
    this.cd.markForCheck();
  }

  hidePassword() {
    this.passwordInputType = 'password';
    this.cd.markForCheck();
  }

  submit() {
    this.snackbar.open('Usuario creado con éxito.', null, {
      duration: 5000,
    });
  }
}
