import { Component, OnInit } from '@angular/core';
import { tileLayer, icon, marker, latLng, Map } from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss']
})
export class MapaComponent implements OnInit {


  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps
    },
  };

  options = {
    layers: [],
    zoom: 10,
    center: latLng([-0.1834136, -78.474397]),
  };

  iconoMovible = marker([-0.1834136, -78.474397], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: '../assets/pin.png',
    }),
    draggable: true,
  });


  constructor() { }

  ngOnInit(): void {
    this.options.layers = [this.streetMaps, this.iconoMovible];
  }


  clickMapa(event) {
    this.iconoMovible.setLatLng(latLng([event.latlng.lat, event.latlng.lng]));
    this.options.center = latLng([event.latlng.lat, event.latlng.lng]);
  }

}
