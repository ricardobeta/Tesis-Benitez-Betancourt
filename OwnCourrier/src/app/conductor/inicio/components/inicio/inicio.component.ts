import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/core/models/negocio';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  banderaCargando = true;
  negocio: Negocio;

  constructor(private negociosService: NegocioService) { }

  ngOnInit(): void {
    this.negociosService.negocio.subscribe(
      negocioAux => {
        console.log(negocioAux);
        this.negocio = negocioAux;
        setTimeout(() => { this.banderaCargando = false;}, 800)
      }
    );
  }

}
