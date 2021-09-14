import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DrawEvents, featureGroup, FeatureGroup, icon, LatLng, latLng, marker, Marker, Polygon, tileLayer } from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Central } from 'src/app/core/models/central.model';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';
import { FormZonaComponent } from '../form-zona/form-zona.component';

@Component({
  selector: 'app-zonas-negocio',
  templateUrl: './zonas-negocio.component.html',
  styleUrls: ['./zonas-negocio.component.scss']
})
export class ZonasNegocioComponent implements OnInit {

  drawItems: FeatureGroup = featureGroup();
  iconoMovible: Marker;
  
  streetMaps: any;

  drawOptions: any;

  options: any;

  zonas = []

  constructor(private negocioService: NegocioService, private bottomSheet: MatBottomSheet, private toast: ToastrService) {
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

    this. iconoMovible = marker([-0.1834136, -78.474397], {
      icon: icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: '../assets/pin.png',
      }),
      draggable: true,
    }).on('dragend', val => {
      const latLng = val.target['_latlng'] as LatLng;
      const central:Central = {
        latitud: latLng.lat,
        longitud: latLng.lng
      }
      negocioService.editarCentral(central);
    });
  }

  ngOnInit(): void {
    this.options.layers.push(this.streetMaps)
    this.options.layers.push(this.iconoMovible)

    this.negocioService.listaZonasCobertura().subscribe(
      zonas => {
        this.drawItems.clearLayers();
        this.zonas = []
        zonas.forEach( zonaDB  => {
          const zona =  zonaDB.payload.toJSON() as ZonaCobertura
          zona.$key  = zonaDB.key;
          this.cargarZona(zona);
          this.zonas.push(zona)
        });
      }
    )

    const $sub = this.negocioService.recuperarCentral().subscribe(
      (central: Central) => {
        if (central === undefined || central.latitud === undefined || central.longitud === undefined) {
          this.iconoMovible.setLatLng(latLng(-0.1834136, -78.474397));
        } else {
          this.iconoMovible.setLatLng(latLng(central.latitud, central.longitud));
        }
        $sub.unsubscribe()
      }
    )
  }

  cargarZona(zona: ZonaCobertura) {
    const pol = new Polygon(JSON.parse(zona.vertices), {color: zona.color});
    this.drawItems.addLayer(pol)
  }

public  onDrawCreated(e: DrawEvents.Created) {
    const zona: ZonaCobertura = {
      vertices: JSON.stringify(e.layer['_latlngs'][0]),
      color: '#eb445a',
      nombre: ''
    }
    setTimeout(()=>{
      this.openBS(zona, 'guardar');
    }, 100)
}

  openBS(zona: ZonaCobertura, tipo: string) {
    const ref = this.bottomSheet.open(FormZonaComponent,
      {
        data: {zona, tipo},
        direction: 'ltr'
      }      
      );

    ref.afterDismissed().subscribe(
      result => {
        if(result === 'guardado') {
          this.toast.success('Nueva Zona de Cobertura', 'Guardado con Exito')
        } else if(result === 'modificado') {
          this.toast.success('Se modifico la Zona de Cobertura', 'Modificado con Exito')
        } else if( result === 'eliminado') {
          this.toast.success('Se Elimino Zona de Cobertura', 'Eliminado con Exito')
        }
      }
    )
  }

}
