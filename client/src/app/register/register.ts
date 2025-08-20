import { Component, inject, OnInit, output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { Account } from '../_services/account';
import { ToastrService } from 'ngx-toastr';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  private accountService = inject(Account);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any = {};
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('Hello', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(8)]),
      confirmPassword: new FormControl('', [Validators.required, this.matchValues('password')]),
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

  register() {
    console.log(this.registerForm.value);
    /* this.accountService.register(this.model).subscribe({
      next: response => {
        console.log(response);
        this.cancel();
      },
      error: error => this.toastr.error(error.error)
    }) */
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
