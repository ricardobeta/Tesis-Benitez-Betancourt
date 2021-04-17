import { Component, OnInit } from '@angular/core';
import { Negocio } from 'src/app/core/models/negocio';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  banderaCargando = true;
  negocio: Negocio;

  constructor(private negociosService: NegocioService,
              private loginService: LoginService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.banderaCargando = false;
      this.negociosService.negocio.subscribe(
        negocioAux => {
          console.log(negocioAux);
          this.negocio = negocioAux;
        }
      );
    }, 1000);
  }

  
  cerrarSesion() {
    this.loginService.logout();
  }

}
