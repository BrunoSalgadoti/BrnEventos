import { PalestranteService } from '@app/services/palestrante.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, map, tap } from 'rxjs';
import { Palestrante } from '@app/models/Palestrante';

@Component({
  selector: 'app-palestrante-detalhe',
  templateUrl: './palestrante-detalhe.component.html',
  styleUrls: ['./palestrante-detalhe.component.scss']
})
export class PalestranteDetalheComponent implements OnInit {
  public form!: FormGroup;
  public situacaoDoForm = '';
  public corDaDescricao = '';


  constructor(
    private fb: FormBuilder,
    public palestranteService: PalestranteService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.validation();
    this.verificaForm();
    this.carregarPalestrante();
  }

  private validation(): void {
    this.form = this.fb.group({
      miniCurriculo: [''],
    })
  }

  private carregarPalestrante(): void {
    this.spinner.show();

    this.palestranteService
      .getPalestrante()
      .subscribe({
        next: (palestrante: Palestrante) => {
          this.form.patchValue(palestrante);
        },
        error: (error: any) => {
          this.toastr.error('Erro ao carregar Palestrante', 'Erro!')
        }
      }).add(() => this.spinner.hide())

  }

  public get f(): any {
    return this.form.controls;
  }

  private verificaForm(): void {
    this.form.valueChanges
      .pipe(
        map(() => {
          this.situacaoDoForm = 'Minicurrículo está sendo Atualizado!';
          this.corDaDescricao = 'text-warning';
        }),
        debounceTime(1500),
        tap(() => this.spinner.show())
      ).subscribe(() => {
        this.palestranteService.put({ ...this.form.value })
          .subscribe({
            next: () => {
              this.situacaoDoForm = 'Minicurrículo foi atualizado!';
              this.corDaDescricao = 'text-success';

              setTimeout(() => {
                this.situacaoDoForm = 'Minicurrículo foi carregado!';
                this.corDaDescricao = 'text-mute';
              }, 2000);
            },
            error: () => {
              this.toastr.error('Erro ao tentar atualizar Palestrante', 'Erro!');
            }
          }).add(() => this.spinner.hide())
      });
  }

}
