import {Component, Input} from '@angular/core';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';

@Component({
  selector: 'app-asignacion-enviosxconductor',
  templateUrl: './asignacion-enviosxconductor.component.html',
  styleUrls: ['./asignacion-enviosxconductor.component.scss']
})
export class AsignacionEnviosxconductorComponent {

  @Input() zonas: ZonaCobertura[];

  constructor() {
    }

  ngOnInit(): void {
    console.log(this.zonas);
  }
}
