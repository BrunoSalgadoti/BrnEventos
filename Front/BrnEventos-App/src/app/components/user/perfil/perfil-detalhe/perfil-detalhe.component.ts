import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidatorField } from '@app/helpers/validatorField';
import { UserUpdate } from '@app/models/identity/UserUpdate';
import { AccountService } from '@app/services/account.service';
import { PalestranteService } from '@app/services/palestrante.service';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.scss']
})
export class PerfilDetalheComponent implements OnInit {
  @Output() changeFormValue = new EventEmitter();

  userUpdate = {} as UserUpdate;
  form!: FormGroup;

  get f(): any {
    return this.form.controls;
  }

  constructor(
    public fb: FormBuilder,
    public accountService: AccountService,
    public palestranteService: PalestranteService,
    private router: Router,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.validation();
    this.carregarUsuario();
    this.verificaFrom();
  }

  private verificaFrom(): void {
    this.form.valueChanges
      .subscribe(() => this.changeFormValue.emit({ ...this.form.value }))
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
      imagemURL: [''],
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
    this.userUpdate = { ...this.form.value };
    this.spinner.show();

    if (this.f.funcao.value == 'Palestrante') {
      this.palestranteService.post().subscribe({
        next: () => this.toaster.success('Função Palestrante Ativada!', 'Sucesso!'),
        error: (error) => {
          this.toaster.error('A função Palestrante não pode ser Ativada!', 'Erro!');
          console.error(error);
        }
      })
    }

    this.accountService
      .updateUser(this.userUpdate)
      .subscribe({
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
