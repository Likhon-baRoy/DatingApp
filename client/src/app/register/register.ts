import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';
import { TextInput } from "../_forms/text-input/text-input";
import { DatePicker } from "../_forms/date-picker/date-picker";
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe, TextInput, DatePicker],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private accountService = inject(Account);
  private toastr = inject(ToastrService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  cancelRegister = output<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});
  maxDate = new Date();
  validationError: string[] | undefined;

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]],
    });

    this.registerForm.controls['password'].valueChanges.subscribe({
      next: () => this.registerForm.controls['confirmPassword'].updateValueAndValidity()
    })
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value ? null : {isMatching: true}
    }
  }

  // getMaxDate() {
  //   const today = new Date;
  //   today.setFullYear(today.getFullYear() - 18);
  //   return today.toISOString().split('T')[0];
  // }

  // register() {
  //   this.accountService.register(this.model).subscribe({
  //     next: _ => this.router.navigateByUrl('/members'),
  //     error: error => this.validationError = error
  //   })
  // }

  register() {
    // Pass the raw form values, including the date object
    const formValues = this.registerForm.getRawValue();

    // You might need to format the dateOfBirth before sending it to the server
    const dateOfBirth = new Date(formValues.dateOfBirth);
    const formattedDate = dateOfBirth.toISOString().split('T')[0]; // Example: "YYYY-MM-DD"

    const payload = {
        ...formValues,
        dateOfBirth: formattedDate
    };

    this.accountService.register(payload).subscribe({
      next: _ => this.router.navigateByUrl('/members'),
      error: error => this.validationError = error
    })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
