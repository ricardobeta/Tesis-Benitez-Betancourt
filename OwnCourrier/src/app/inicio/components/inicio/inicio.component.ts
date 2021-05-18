import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Negocio } from 'src/app/core/models/negocio';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  banderaCargando = true;
  negocio: Negocio;

  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(private negociosService: NegocioService,
              private loginService: LoginService) { }

  ngOnInit(): void {
      this.negociosService.negocio.subscribe(
        negocioAux => {
          console.log(negocioAux);
          this.negocio = negocioAux;
          setTimeout(() => { this.banderaCargando = false;}, 800)
        }
      );

  }

  
  cerrarSesion() {
    this.loginService.logout();
  }

}
