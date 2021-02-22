import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { tileLayer, icon, marker, latLng, Map, TileLayer, Marker } from 'leaflet';
import { Direccion } from 'src/app/core/models/direccion.model';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})

export class MapaComponent implements OnInit {

  streetMaps: TileLayer
  options: any;
  iconoMovible: Marker;
  @Output() confirmacion = new EventEmitter<boolean>();
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
  }

  confirmarDireccion() {
    this.confirmacion.emit(true);
  }
}
