import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountService } from './../../../services/account.service';
import { FormControl, FormGroup, FormBuilder, AbstractControlOptions, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidatorField } from '@app/helpers/validatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(public fb: FormBuilder,
    public accountService: AccountService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
  }

  private carregarUsuario(): void {
    this.spinner.show();
    this.accountService.getUser().subscribe({
      next: (userRetorno: UserUpdate) => {
        console.log(userRetorno)
        this.userUpdate = userRetorno;
        this.form.patchValue(this.userUpdate);
        this.toaster.success('Usuário Carregado', 'Sucesso!');
      },
      error: (error) => {
        console.error('Usuário não carregado', 'Erro!');
        this.router.navigate(['/dashboard'])
      }
    }).add(() => this.spinner.hide());
  }

  private validation(): void {

    const formOptions: AbstractControlOptions = {
      validators: ValidatorField.MustMatch('password', 'confirmarPassword')
    };

    this.form = this.fb.group({
      userName: [''],
      titulo: ['NaoInformado', Validators.required,],
      primeiroNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      ultimoNome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      funcao: ['NaoInformado', Validators.required],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
      password: ['', [Validators.minLength(6), Validators.maxLength(30)]],
      confirmarPassword: ['']
    }, formOptions);
  }

  public cssValidator(campoForm: FormControl): any {
    return { 'is-invalid': campoForm.errors && campoForm.touched };
  }

  onSubmit(): void {
   this.atualizarUsuario();
  }

  public atualizarUsuario(): void {
    this.userUpdate = { ...this.form.value }
    this.spinner.show();

    this.accountService.updateUser(this.userUpdate).subscribe({
      next: () => this.toaster.success('Usuário atualizado.', 'Sucesso!'),
      error: (error) => {
        this.toaster.error(error.error);
        console.error(error);
      }
    }).add(() => this.spinner.hide())
  }

  public resetForm(event: any): void {
    event.preventDefault();
    this.form.reset();
  }
}
