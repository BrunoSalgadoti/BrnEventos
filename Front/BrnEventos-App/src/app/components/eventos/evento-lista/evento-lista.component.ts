import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

import { EventoService } from '@app/services/evento.service';
import { Evento } from '@app/models/Evento';
import { environment } from '@environments/environment';
import { PaginatedResult, Pagination } from '@app/models/Pagination';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {

  modalRef?: BsModalRef;
  public eventos: Evento[] = [];
  public eventoId = 0;
  public pagination = {} as Pagination;

  public widthImg = 160;
  public heightimg = 100;
  public marginImg = 2;
  public showimg = true;

  termoBuscaChange: Subject<string> = new Subject<string>();

  public filtrarEventos(evt: any): void {
    if (this.termoBuscaChange.observers.length == 0) {
      this.termoBuscaChange.pipe(debounceTime(1000)).subscribe(
        filtrarpor => {
          this.spinner.show();
          this.eventoService.getEventos(
            this.pagination.currentPage,
            this.pagination.itemsPerPage,
            filtrarpor
          ).subscribe({
            next: (paginatedResult: PaginatedResult<Evento[] | null>) => {
              this.eventos = paginatedResult.result!;
              this.pagination = paginatedResult.pagination;
            },
            error: (error: any) => {
              this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
            },
          }).add(() => this.spinner.hide())
        }
      )
    }
    this.termoBuscaChange.next(evt.value);
  }

  constructor(
    private eventoService: EventoService,
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

    this.carregarEventos();
  }

  public alterarImagem(): void {
    this.showimg = !this.showimg;
  }

  public mostrarImagem(imagemURL: string): string {
    return imagemURL != ''
      ? `${environment.apiURL}resources/images/${imagemURL}`
      : `assets/img/SemImagem.gif`
  }

  public carregarEventos(): void {
    this.spinner.show();
    this.eventoService
      .getEventos(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe({
        next: (paginatedResult: PaginatedResult<Evento[] | null>) => {
          this.eventos = paginatedResult.result!;
          this.pagination = paginatedResult.pagination;
        },
        error: (error: any) => {
          this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
        }
      }).add(() => this.spinner.hide());
  }

  openModal(event: any, template: TemplateRef<any>, eventoId: number) {
    event.stopPropagation();
    this.eventoId = eventoId;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  public pageChanged(event): void {
    this.pagination.currentPage = event.page;
    this.carregarEventos();
  }

  confirm(): void {
    this.modalRef?.hide();
    this.spinner.show();

    this.eventoService.deleteEvento(this.eventoId).subscribe({
      next: (result: any) => {
        console.log(result);
        this.toastr.success('Evento deletado com Sucesso!', 'Deletado!');
        this.carregarEventos();

      },
      error: (error: any) => {
        console.error(error);
        this.toastr.error(`Error ao tentar deletar o Evento ${this.eventoId}`, 'Error!');
      },
    }).add(() => this.spinner.hide());

  }

  decline(): void {
    this.modalRef?.hide();
  }

  detalheEvento(id: number): void {
    this.router.navigate([`eventos/detalhe/${id}`]);
  }

}
