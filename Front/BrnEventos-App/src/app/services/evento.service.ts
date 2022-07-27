import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Evento } from '../models/Evento';

@Injectable(
  // Declarado em (app.module.ts)
  //{providedIn: 'root'} <-----Implementa o service na raiz do app para todos os components
  )
export class EventoService {
  baseURL = 'https://localhost:5001/api/eventos'

constructor(private http: HttpClient) { }

public getEventos(): Observable<Evento[]> {
  return this.http.get<Evento[]>(this.baseURL)
}

public getEventosByTema(tema: string): Observable<Evento[]> {
  return this.http.get<Evento[]>(`${this.baseURL}/${tema}/tema`)
}

public getEventoById(id: number): Observable<Evento> {
  return this.http.get<Evento>(`${this.baseURL}/${id}`)
}
}
