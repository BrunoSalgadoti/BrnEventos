import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { RedeSocial } from './../../models/RedeSocial';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { RedeSocialService } from '@app/services/redeSocial.service';

@Component({
  selector: 'app-resdesSociais',
  templateUrl: './resdesSociais.component.html',
  styleUrls: ['./resdesSociais.component.scss']
})
export class ResdesSociaisComponent implements OnInit {
  modalRef!: BsModalRef;
  @Input() eventoId = 0;
  public formRS!: FormGroup;
  public redeSocialAtual = { id: 0, nome: '', indice: 0 };

  public get redesSociais(): FormArray {
    return this.formRS.get('redesSociais') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private redeSocialService: RedeSocialService
  ) { }

  ngOnInit() {
    this.carregarRedesSociais(this.eventoId);
    this.validation();
  }

  private carregarRedesSociais(id: number = 0): void {
    let origem = 'palestrante';

    if (this.eventoId != 0) origem = 'evento';
    
    this.spinner.show();

    this.redeSocialService
      .getRedesSociais(origem, id)
      .subscribe(
        (redeSocialRetorno: RedeSocial[]) => {
          redeSocialRetorno.forEach((redeSocial) => {
            this.redesSociais.push(this.criarRedeSocial(redeSocial))
          });
        },
        (error: any) => {
          this.toastr.error('Erro ao tentar carregar Rede Social', 'Erro');
          console.log(error);
        }
      ).add(() => this.spinner.hide());
  }

  public validation(): void {
    this.formRS = this.fb.group({
      redesSociais: this.fb.array([])
    })
  }

  public adicionarRedeSocial(): void {
    this.redesSociais.push(this.criarRedeSocial({ id: 0 } as RedeSocial));
  }

  public criarRedeSocial(redeSocial: RedeSocial): FormGroup {
    return this.fb.group({
      id: [redeSocial.id],
      nome: [redeSocial.nome, Validators.required],
      url: [redeSocial.url, Validators.required]

    });
  }

  public retornaTitulo(nome: string): string {
    return nome == null || nome == '' ? 'Rede Social' : nome;
  }

  public cssValidator(fieldForm: FormControl | AbstractControl | null): any {
    return { 'is-invalid': fieldForm?.errors && fieldForm?.touched };

  }

  public salvarRedesSociais(): void {
    let origem = 'palestrante';

    if (this.eventoId != 0) origem = 'evento';

    if (this.formRS.controls['redesSociais'].valid) {
      this.spinner.show();
      this.redeSocialService
        .saveRedesSociais(origem, this.eventoId, this.formRS.value.redesSociais).subscribe({
          next: () => {
            this.toastr.success('Redes Sociais salvas com Sucesso.', 'Sucesso!');
          },
          error: (error: any) => {
            this.toastr.error('Erro ao tentar salvar Redes Sociais.', 'Error!');
            console.error(error);
          },
        }).add(() => this.spinner.hide());
    }
  }

  public removerRedeSocial(template: TemplateRef<any>, indice: number): void {
    this.redeSocialAtual.id = this.redesSociais.get(indice + '.id')?.value;
    this.redeSocialAtual.nome = this.redesSociais.get(indice + '.nome')?.value;
    this.redeSocialAtual.indice = indice;

    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public confirmDeleteRedeSocial(): void {
    let origem = 'palestrante';
    this.modalRef.hide();
    this.spinner.show();

    if (this.eventoId != 0) origem = 'evento';

    this.redeSocialService
      .deleteRedeSocial(origem, this.eventoId, this.redeSocialAtual.id)
      .subscribe(
        () => {
          this.toastr.success('Rede Social deletada com Sucesso., Sucesso!');
          this.redesSociais.removeAt(this.redeSocialAtual.indice);
        },
        (error: any) => {
          this.toastr.error(`Error ao tentar deletar a Rede Social ${this.redeSocialAtual.id}`, 'Error!');
          console.error(error);
        }
      ).add(() => this.spinner.hide());
  }
  public declineDeleteRedeSocial(): void {
    this.modalRef.hide();
  }

}
