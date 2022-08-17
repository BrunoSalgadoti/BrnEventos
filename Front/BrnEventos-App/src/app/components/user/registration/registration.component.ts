import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { User } from '@app/models/identity/User';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControlOptions } from '@angular/forms';
import { ValidatorField } from '@app/helpers/validatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user = {} as User;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router,
    private toaster: ToastrService) { }

  ngOnInit(): void {
    this.validation();
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmarPassword')
    };

    this.form = this.fb.group({
      primeiroNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
      confirmarPassword: ['', Validators.required]
    }, formOptions);
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  register(): void {
    this.user = { ...this.form.value };
    this.accountService.register(this.user).subscribe({
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (error: any) => this.toaster.error(error.error)
    });
  }
}
