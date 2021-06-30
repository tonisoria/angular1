import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { DadesProductesService } from '../services/dades-productes.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  image: SafeUrl | null = null;
  // @ts-ignore
  @Input() id: number;

  constructor(private producteService: DadesProductesService, private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    const mediaType = 'application/image';
    this.producteService.getImage(this.id).subscribe(value => {
      const blob = new Blob([value], { type: mediaType });
      const unsafeImg = URL.createObjectURL(blob);
      this.image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
    }, error => {
      console.log(error);
    });
  }

}
