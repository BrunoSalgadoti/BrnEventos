import { environment } from '@environments/environment';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { Palestrante } from '@app/models/Palestrante';
import { PalestranteService } from '@app/services/palestrante.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-palestrante-lista',
  templateUrl: './palestrante-lista.component.html',
  styleUrls: ['./palestrante-lista.component.scss']
})
export class PalestranteListaComponent implements OnInit {
  public palestrantes: Palestrante[] = [];
  public eventoId = 0;
  public pagination = {} as Pagination;

  termoBuscaChange: Subject<string> = new Subject<string>();

  constructor(
    private palestranteService: PalestranteService,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.pagination = {
      currentPage: 1,
      itemsPerPage: 3,
      totalItems: 1,
    } as Pagination;

    this.carregarPalestrantes();
  }

  public filtrarPalestrantes(evt: any): void {
    if (this.termoBuscaChange.observers.length == 0) {
      this.termoBuscaChange.pipe(debounceTime(1000)).subscribe(
        filtrarpor => {
          this.spinner.show();
          this.palestranteService.getPalestrantes(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarpor
          ).subscribe({
            next: (paginatedResult: PaginatedResult<Palestrante[] | null>) => {
              this.palestrantes = paginatedResult.result!;
              this.pagination = paginatedResult.pagination;
            },
            error: (error: any) => {
              this.toastr.error('Erro ao Carregar os Palestrantes', 'Erro!');
            },
          }).add(() => this.spinner.hide())
        }
      )
    }
    this.termoBuscaChange.next(evt.value);
  }

  public getImagemURL(imagemName: string): string {
    if (imagemName)
      return environment.apiURL + `resources/perfil/${imagemName}`;
    else
      return './assents/img/SemImgPerfil.jpg';
  }

  public carregarPalestrantes(): void {
    this.spinner.show();
    this.palestranteService
      .getPalestrantes(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<Palestrante[] | null>) => {
          this.palestrantes = paginatedResult.result!;
          this.pagination = paginatedResult.pagination;
        },
        error: (error: any) => {
          this.toastr.error('Erro ao Carregar os Palestrantes', 'Erro!');
        }
      }).add(() => this.spinner.hide());
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarPalestrantes();
  }

}
