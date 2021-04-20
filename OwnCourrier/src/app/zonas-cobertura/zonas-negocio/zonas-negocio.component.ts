import { Component, OnInit } from '@angular/core';
import { DrawEvents, featureGroup, FeatureGroup, latLng, Polygon, tileLayer } from 'leaflet';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

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

  layers = []

  constructor(private negocioService: NegocioService) {
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

    this.negocioService.listaZonasCobertura().subscribe(
      zonas => {
        zonas.forEach( zona  => {
          this.cargarZona(zona.payload.toJSON() as ZonaCobertura);
        })
      }
    )
  }

  cargarZona(zona: ZonaCobertura) {
    const pol = new Polygon(JSON.parse(zona.vertices), {color: zona.color}).on('click', 
      () =>{}
    )
    this.drawItems.addLayer(pol);
  }

  public onDrawCreated(e: DrawEvents.Created) {
    //console.log(e.layer.options['color'] = '#9e9e9e')
    // e.layer['_latlngs'][0]  guarda los puntos en la base de datos
    const zona: ZonaCobertura = {
      vertices: JSON.stringify(e.layer['_latlngs'][0]),
      color: '#eb445a'
    }

    this.negocioService.agregarZona(zona).then(
        value => {
          console.log(value)
        }
    )
    // this.drawItems.addLayer(new Polygon(e.layer['_latlngs'][0], {
    //      color: '#9e9e9e'
    //   }));
    // this.layers.push(new Polygon(e.layer['_latlngs'][0], {
    //   color: '#9e9e9e'
    // }))
  }

}
