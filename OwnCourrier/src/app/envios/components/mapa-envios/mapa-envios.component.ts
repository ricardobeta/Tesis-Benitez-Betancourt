import { Component, Input, OnInit } from '@angular/core';
import { icon, latLng, LatLng, Layer, marker, polygon, tileLayer } from 'leaflet';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';

@Component({
  selector: 'app-mapa-envios',
  templateUrl: './mapa-envios.component.html',
  styleUrls: ['./mapa-envios.component.scss']
})
export class MapaEnviosComponent implements OnInit {

  streetMaps: any;
  options: any;
  layers:Layer[] = [];
  centralIcono
  
  @Input() zonas: ZonaCobertura[];
  @Input() central: LatLng
  constructor() {
    this.streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });

    this.options = {
      layers: [],
      zoom: 10,
      center: latLng([-0.1834136, -78.474397]),
    };



  }

  ngOnInit(): void {
    this.layers.push(this.streetMaps)
    this.centralIcono = marker(this.central, {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../assets/pin.png',
      }),
    })
    this.layers.push(this.centralIcono);
    console.log(this.zonas)
    this.zonas.forEach(
      zona => {
        const poligono = polygon(JSON.parse(zona.vertices),{color: zona.color});
        this.layers.push(poligono);
        zona.conductores.forEach(
          conductor => {
            conductor.envios.forEach(
              envio => {
                console.log(envio.direccion.descripcion)
                const pointer = marker(latLng(envio.direccion.latitud, envio.direccion.longitud),{
                  icon: icon({
                    iconSize: [25, 41],
                    iconAnchor: [13, 41],
                    iconUrl: conductor.urlFoto,
                  }),
                });
                console.log(pointer.getLatLng());
                this.layers.push(pointer);
              }
            )
          }
        )
      }
    )
  }

}
