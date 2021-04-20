import { Component, OnInit } from '@angular/core';
import { DrawEvents, featureGroup, FeatureGroup, latLng, tileLayer } from 'leaflet';

@Component({
  selector: 'app-zonas-negocio',
  templateUrl: './zonas-negocio.component.html',
  styleUrls: ['./zonas-negocio.component.scss']
})
export class ZonasNegocioComponent implements OnInit {

  drawItems: FeatureGroup = featureGroup();

  streetMaps: any;

  drawOptions: any;

  options: any;


  constructor() {
    this.streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    this.drawOptions = {
      position: 'topright',
      draw: {
        marker: false,
        polyline: false,
        circlemarker: false,
        circle: false,
        rectangle: false,
        polygon: {
          shapeOptions: {
            color: '#eb445a'
          }
        },

      },
      edit: false,
    };

    this.options = {
      layers: [],
      zoom: 10,
      center: latLng([-0.1834136, -78.474397]),
    };
  }

  ngOnInit(): void {
    this.options.layers.push(this.streetMaps)
  }

  public onDrawCreated(e: any) {
    console.log(e.layer._latlngs[0])
    this.drawItems.addLayer((e as DrawEvents.Created).layer);
    console.log(this.drawItems.getLayers());
  }

}
