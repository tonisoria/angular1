import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IProducte } from '../interfaces/iproducte';
import { Observable } from 'rxjs/internal/Observable';
import { ICategoria } from '../interfaces/icategoria';
import { User } from '../_models/user';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DadesProductesService {
  // incorporar al producte service un servei http
  // tslint:disable-next-line: variable-name
  constructor(private _http: HttpClient, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  currentUser: User | undefined;

  getDades(): Observable<IProducte[]> {
    // tslint:disable-next-line: max-line-length
    return this._http.get<IProducte[]>('http://localhost/DAW_M7_M14/symfony/M14/webservice/public/index.php/api/jugadors', {
    });
    // get retorna un observable
  }
  getDadesCategoria(): Observable<ICategoria[]> {
    return this._http.get<ICategoria[]>('http://localhost/DAW_M7_M14/symfony/M14/webservice/public/index.php/api/posicions', {
    });
    // get retorna un observable
  }

  getImage(id: number): Observable<Blob> {
    return this._http.get('http://localhost/DAW_M7_M14/symfony/M14/webservice/public/index.php/api/jugadorImatge/' + id, {
      responseType: 'blob'
    });
  }

}
