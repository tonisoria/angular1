import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  titolTaula = 'Llistat Pràctica Angular';

  name = 'Toni';
  surname = 'Soria';
  // tslint:disable-next-line: typedef
  retornarNomCognom() {
    return this.name + ' ' + this.surname;
  }

}
