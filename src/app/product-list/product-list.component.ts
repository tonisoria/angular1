import { Component, Input, OnInit } from '@angular/core';
import { IProducte } from '../interfaces/iproducte';
import { DadesProductesService } from '../services/dades-productes.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  @Input() titolLlistat = 'Llistat de productes';

  listFilter = '';

  errorMessage = '';

  // tslint:disable-next-line: max-line-length
  productes: IProducte[] = [];

  constructor(private producteService: DadesProductesService) {
  }

  // tslint:disable-next-line: typedef
  ngOnInit() {
    // fem servir event de creacio
    console.log('Listat de productes inicialitzat');
    this.producteService.getDades().subscribe((productes: Array<IProducte>) => {
      this.productes = productes;
    }, (error) => {
      this.errorMessage = error.message; // treurem l'error a html
    });
  }

}
