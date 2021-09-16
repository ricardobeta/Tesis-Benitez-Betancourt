import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { Negocio } from 'src/app/core/models/negocio';
import { LoginService } from 'src/app/core/services/login/login.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { EnvioService } from '../../../core/services/envios/envio.service';
import { VehiculoService } from 'src/app/core/services/vehiculo/vehiculo.service';
import { ConductorService } from '../../../core/services/conductor/conductor.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  banderaCargando = true;
  negocio: Negocio;
  totalEnvios = 0;
  totalClientes = 0;
  totalVehiculos = 0;
  totalConductores = 0;

  constructor(private negociosService: NegocioService,
              private loginService: LoginService,
              private envioService: EnvioService,
              private vehiculosService: VehiculoService,
              private conductorService: ConductorService) { }

  ngOnInit(): void {
      this.negociosService.negocio.subscribe(
        negocioAux => {
          console.log(negocioAux);
          this.negocio = negocioAux;
          setTimeout(() => { this.banderaCargando = false;}, 800)
        }
      );

      this.envioService.listaEnvios().subscribe(envios => {
        this.totalEnvios = envios.length;
      });

      this.vehiculosService.listaVehiculos().subscribe(vehiculos => {
        this.totalVehiculos = vehiculos.length;
      });

      this.conductorService.listaConductores().subscribe(conductores => {
        this.totalConductores = conductores.length;
      });

  }

  
  cerrarSesion() {
    this.loginService.logout();
  }

}
