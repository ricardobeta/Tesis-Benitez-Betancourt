import {Component, Input} from '@angular/core';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-asignacion-enviosxconductor',
  templateUrl: './asignacion-enviosxconductor.component.html',
  styleUrls: ['./asignacion-enviosxconductor.component.scss']
})
export class AsignacionEnviosxconductorComponent {

  @Input() zonas: ZonaCobertura[];


  folders: Section[] = [
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
  notes: Section[] = [
    {
      name: 'Vacation Itinerary',
      updated: new Date('2/20/16'),
    },
    {
      name: 'Kitchen Remodel',
      updated: new Date('1/18/16'),
    }
  ];

  constructor() {
    }

  ngOnInit(): void {
    console.log(this.zonas);
  }
}
