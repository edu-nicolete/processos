import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Processo } from '../models/processos';
// import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})
export class ProcessoService {

  baseUrl: String = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private snack: MatSnackBar) { }

  buscaUf(): Observable<any> {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
    return this.http.get<any>(url);
  }

  buscaMunicipio(id: any): Observable<any> {
    const url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/"+id+"/municipios";
    return this.http.get<any>(url);
  }

  salvarProcesso(processo: Processo): Observable<Processo> {
    const url = this.baseUrl + "/processos/incluir";
    return this.http.post<any>(url, processo);
  }

  buscarProcessos(): Observable<Processo[]> {
    const url = this.baseUrl + "/processos/recuperar";
    return this.http.get<any>(url);
  }

  buscarProcessoId(id: any): Observable<Processo> {
    const url = this.baseUrl + "/processos/recuperarId/"+id;
    return this.http.get<any>(url);
  }

  alteraDataVisualizacao(id: any): Observable<Processo> {
    const url = this.baseUrl + "/processos/alterar";
    return this.http.post<any>(url, id);
  }

  excluirProcesso(id: any): Observable<Processo> {
    const url = this.baseUrl + "/processos/excluir/"+id;
    return this.http.get<any>(url);
  }
}
