import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, icon, marker, latLng, Map, TileLayer, Marker } from 'leaflet';
import { Direccion } from 'src/app/core/models/direccion.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})

export class MapaComponent implements OnInit {

  streetMaps: TileLayer;
  options: any;
  iconoMovible: Marker;
  mapa: Map;
  zoom;
  @Output() direccionConf = new EventEmitter<Direccion>();
  @Input() direccion: Direccion;

 
  constructor() {
    this.streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    });
    this.options  = {
      layers: [],
      zoom: 10,
      center: latLng([-0.1834136, -78.474397]),
    };
    this.zoom = 10;
    this. iconoMovible = marker([-0.1834136, -78.474397], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../assets/pin.png',
      }),
      draggable: true,
    });
  }

  ngOnInit(): void {
    this.options.layers = [this.streetMaps, this.iconoMovible];
  }


  clickMapa(event) {
    this.iconoMovible.setLatLng(latLng([event.latlng.lat, event.latlng.lng]));
    this.options.center = latLng([event.latlng.lat, event.latlng.lng]);
    this.confirmarDireccion();
  }


  descripcionKeyUp(event) {
    this.direccion.descripcion = event.target.value;
    this.confirmarDireccion();
  }
  confirmarDireccion() {
    const latLng = this.iconoMovible.getLatLng();
    this.direccion.latitud = latLng.lat;
    this.direccion.longitud = latLng.lng;
    this.direccion.zoom = this.zoom;
    this.direccion.urlMapa = `http://google.com/maps?q=${this.direccion.latitud},${this.direccion.longitud}`
    this.direccionConf.emit(this.direccion);
  }
}
