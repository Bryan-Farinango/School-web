import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fadeInRightAnimation } from '../../@fury/animations/fade-in-right.animation';
import { scaleInAnimation } from '../../@fury/animations/scale-in.animation';
import { fadeInUpAnimation } from '../../@fury/animations/fade-in-up.animation';

@Component({
  selector: 'app-create-subject',
  templateUrl: './create-subject.component.html',
  styleUrls: ['./create-subject.component.scss'],
  animations: [fadeInUpAnimation, fadeInRightAnimation, scaleInAnimation],
})
export class CreateSubjectComponent implements OnInit {
  accountFormGroup: FormGroup;
  passwordFormGroup: FormGroup;
  confirmFormGroup: FormGroup;

  verticalAccountFormGroup: FormGroup;
  verticalPasswordFormGroup: FormGroup;
  verticalConfirmFormGroup: FormGroup;

  yearOptions = ['2021', '2022', '2023', '2024', '2025', '2026'];
  gradeOptions = ['Basico 1 ', 'Basico 2', 'Inicial 2'];
  passwordInputType = 'password';
  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.accountFormGroup = this.fb.group({
      subjectName: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });

    this.passwordFormGroup = this.fb.group({
      grade: [null, Validators.required],
    });

    this.confirmFormGroup = this.fb.group({
      terms: [null, Validators.requiredTrue],
    });
    /*
    this.verticalAccountFormGroup = this.fb.group({
      username: [null, Validators.required],
      name: [null, Validators.required],
      email: [null, Validators.required],
      phonePrefix: [this.phonePrefixOptions[3]],
      phone: [],
    });
*/
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
    this.snackbar.open('Asignatura creada con éxito.', null, {
      duration: 5000,
    });
  }
}
