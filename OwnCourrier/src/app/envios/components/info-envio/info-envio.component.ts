import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Cliente } from 'src/app/core/models/cliente.model';
import { Direccion } from 'src/app/core/models/direccion.model';
import { Envio } from 'src/app/core/models/envio.model';
import { InfoEnvio } from 'src/app/core/models/info-envio.model';
import { EnvioService } from 'src/app/core/services/envios/envio.service';

@Component({
  selector: 'app-info-envio',
  templateUrl: './info-envio.component.html',
  styleUrls: ['./info-envio.component.scss']
})
export class InfoEnvioComponent implements OnInit {

  envioSeleccionado: Envio;
  clienteSeleccionado: Cliente;
  direccion: Direccion;
  infoEnvio: InfoEnvio;
  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: { envio: Envio },
    private envioService: EnvioService) { }

  ngOnInit(): void {

  }

}
