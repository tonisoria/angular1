import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { DadesProductesService } from '../services/dades-productes.service';
import { IProducte } from '../interfaces/iproducte';
import { ICategoria } from '../interfaces/icategoria';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-form-material',
  templateUrl: './form-material.component.html',
  styleUrls: ['./form-material.component.css']
})
export class FormMaterialComponent implements OnInit {
  myForm = new FormGroup({
    nom: new FormControl(''),
    sobrenom: new FormControl(''),
    equip: new FormControl(''),
    _posicio: new FormGroup({
      nom: new FormControl('')
    }),
    imatge: new FormControl(null)
  });
  categories: ICategoria[] = [];
  post: any = '';
  errorMsg = {
    name: {
      required: 'This field is required',
      minLength: '',
    }
  };

  constructor(private router: Router, private httpClient: HttpClient, private formBuilder: FormBuilder, private producteService: DadesProductesService) { }

  ngOnInit() {
    this.createForm();
    this.producteService.getDadesCategoria().subscribe((categories: Array<ICategoria>) => {
      this.categories = categories;
    });
    // this.setChangeValidate();
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      nom: ['', Validators.required],
      sobrenom: ['', Validators.required],
      equip: ['', Validators.required],
      _posicio: ['', Validators.required],
      imatge: ['', Validators.required],
      validate: ''
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append("_posicio", this.myForm.get('_posicio')?.value);
    formData.append("nom", this.myForm.get('nom')?.value);
    formData.append("sobrenom", this.myForm.get('sobrenom')?.value);
    formData.append("equip", this.myForm.get('equip')?.value);
    formData.append("imatge", this.myForm.get('imatge')?.value);

    this.httpClient.post<IProducte>('http://localhost/M7_M14/symfony/M14/webservice/public/index.php/api/jugador', formData).subscribe(
      (res) => this.router.navigate(['list']),
      (err) => console.log(err)
    )
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.get('imatge')?.setValue(file);
    }
  }

}
