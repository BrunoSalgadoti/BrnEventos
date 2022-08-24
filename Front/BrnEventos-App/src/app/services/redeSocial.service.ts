import { RedeSocial } from './../models/RedeSocial';
import { Observable, take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RedeSocialService {
  baseURl = environment.apiURL + 'api/redesSociais';

  constructor(private http: HttpClient) { }


  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId depende da sua origem
   * @returns Observable<RedeSocial[]>
   */
  public getRedesSociais(origem: string, id: number): Observable<RedeSocial[]> {
    let URL =
      id == 0
        ? `${this.baseURl}/${origem}`
        : `${this.baseURl}/${origem}/${id}`

    return this.http.get<RedeSocial[]>(URL).pipe(take(1))
  }

  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId depende da sua origem
   * @param RedesSociais Precisa adicionar Redes Sociais organizadas em RedeSocial[]
   * @returns Observable<RedeSocial[]>
   */
  public saveRedesSociais(
    origem: string,
    id: number,
    redesSociais: RedeSocial[]
  ): Observable<RedeSocial[]> {
    let URL =
      id == 0
        ? `${this.baseURl}/${origem}`
        : `${this.baseURl}/${origem}/${id}`

    return this.http.put<RedeSocial[]>(URL, redesSociais).pipe(take(1));
  }

  /**
   *
   * @param origem precisa passar a palavra 'palestrante' ou a palavra 'evento' em minúsculo.
   * @param id Precisa passar o PalestranteId ou o EventoId depende da sua origem
   * @param redeSocialId Precisa usar o id da Rede Social
   * @returns Observable<any> - é o retorno da Rota.
   */
  public deleteRedeSocial(
    origem: string,
    id: number,
    redeSocialId: number
  ): Observable<any> {
    let URL =
      id == 0
        ? `${this.baseURl}/${origem}/${redeSocialId}`
        : `${this.baseURl}/${origem}/${id}/${redeSocialId}`

    return this.http.delete(URL).pipe(take(1));
  }

}
