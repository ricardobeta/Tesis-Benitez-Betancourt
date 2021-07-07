import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClienteService } from 'src/app/core/services/cliente/cliente.service';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';

@Component({
  selector: 'app-envio-cliente',
  templateUrl: './envio-cliente.component.html',
  styleUrls: ['./envio-cliente.component.scss']
})
export class EnvioClienteComponent implements OnInit {

  idEmpresa: String;
  idEnvio: String;
  idConductor: String;
  empresa;
  envioR;
  conductor;
  banderaCargando = true;

  constructor(private route: ActivatedRoute,
              private clienteService: ClienteService,
              private conductorService: ConductorService) {
                this.idEmpresa = this.route.snapshot.params.nombreEmpresa;
                this.idEnvio = this.route.snapshot.params.idEnvio
              }

  ngOnInit(): void {

    this.clienteService.conseguirEmpresa(this.idEmpresa).subscribe(negocio => {
      this.empresa = negocio.payload.toJSON();
      this.clienteService.conseguirEnvio(this.idEmpresa, this.idEnvio).subscribe(envio => {
        this.envioR = envio.payload.toJSON()
        this.idConductor = this.envioR.keyConductor;
        this.conductorService.conseguirConductor(this.idConductor).subscribe(conductor => {
          this.conductor = conductor.payload.toJSON();
        });
        setTimeout(() => { this.banderaCargando = false;}, 800)
      });
      
    });
  }

}
