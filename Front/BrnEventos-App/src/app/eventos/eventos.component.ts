import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.scss']
})
export class EventosComponent implements OnInit {

  public eventos: any = [
    {
      Tema: 'Angular 14',
      Local: 'Maragogi-AL'
    },
    {
      Tema: '.NET 5',
      Local: 'Paulo Afonso-BA'
    },
    {
      Tema: 'Angular e Suas Novidades',
      Local: 'Porto Calvo-AL'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}
