import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { ActivatedRoute, Router } from '@angular/router';
import { latLng, LatLng } from 'leaflet';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { Central } from 'src/app/core/models/central.model';
import { Conductor } from 'src/app/core/models/conductor.model';
import { Envio } from 'src/app/core/models/envio.model';
import { ZonaCobertura } from 'src/app/core/models/zona-cobertura.model';
import { ConductorService } from 'src/app/core/services/conductor/conductor.service';
import { EnvioService } from 'src/app/core/services/envios/envio.service';
import { NegocioService } from 'src/app/core/services/negocio/negocio.service';

@Component({
  selector: 'asignar-envios',
  templateUrl: 'asignar-envios.component.html',
  styleUrls: ['asignar-envios.component.scss'],
})
export class AsignarEnviosComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;
  zonas: ZonaCobertura[] = []
  conductoresDisponibles: Conductor[] = []
  envios: Envio[] = []

  $subC: Subscription;
  $subF: Subscription;
  $subZ: Subscription;
  loading = false;

  form: FormGroup;

  central: LatLng
  asignado = false;


  constructor(private negocioService:NegocioService, private conductorService: ConductorService, private envioService: EnvioService, private fb: FormBuilder,
    private router: Router, private ruta: ActivatedRoute, private toast: ToastrService) { 
    this.buildForm();
  }


  ngOnInit(): void {
    this.conseguirConductoresDisponibles();
    this.conseguirZonas();
    this.centralNegocio();
  }

  conseguirConductoresDisponibles() {
    this.$subC = this.conductorService.listaConductores().subscribe(
      conductoresDB => {
        this.conductoresDisponibles = conductoresDB.map(
          conductorDB => {
            const conductor  = conductorDB.payload.toJSON() as Conductor;
            conductor.$key = conductorDB.key;
            return conductor
          }
        ).filter( conductor => conductor.estado === 'disponible' && conductor.keyVehiculo!== '' && conductor.keyZona !== '' );
      }
    );
  }


  conseguirEnvios(fecha: string) {
    return this.envioService.enviosFecha(fecha).pipe(first()).toPromise().then(
      enviosDB => {
        this.envios = enviosDB.map(
          envioDB => {
            const envio = envioDB.payload.toJSON() as Envio;
            envio.$key = envioDB.key;
            return envio
          }
        ).filter(envio=> envio.estado === 'pendiente');
      }
    )
  }

  conseguirZonas() {
    this.$subZ = this.negocioService.listaZonasCobertura().subscribe(
      zonasDB => {
        this.zonas = zonasDB.map(
          zonaDB => {
            const zona = zonaDB.payload.toJSON() as ZonaCobertura;
            zona.envios = [];
            zona.conductores = [];
            zona.$key = zonaDB.key;
            return zona;
          }
        )
      }
    )
  }

  centralNegocio() {
    this.negocioService.recuperarCentral().pipe(first()).toPromise().then(
      (centralDB:Central) => {
        this.central = latLng(centralDB.latitud,centralDB.longitud);
      }
    )
  }

  buildForm() {
    this.form = this.fb.group({
      maxEnvios: ['', [Validators.required]],
      maxPeso: ['', [Validators.required]],
      fecha: ['', [Validators.required]],
    });
  }


  asignar() {
    if(this.form.valid) {
      this.conseguirEnvios(this.fecha)
      .then(
        () => {
          // calculo de todo :D
          // primero ver que envios se encuentran en cada zona
          this.envios.forEach(envio => {
            for (const key in this.zonas) {
              if (Object.prototype.hasOwnProperty.call(this.zonas, key)) {
                const zona = this.zonas[key];
                if(this.comprobarEnvioEnZona(envio, zona)) {
                  break;
                }
              }
            }
          })
          this.agregarConductoresEnZona();
          this.asignarEnviosConductor();
          console.log('zonas', this.zonas);
          this.asignado = true;
        }
      );
    }
  }


  get maxEnvios() {
    return this.form.get('maxEnvios').value;
  }

  get maxPeso() {
    return this.form.get('maxPeso').value;
  }
  get fecha() {
    return this.form.get('fecha').value;
  }

  ngOnDestroy(): void {
    this.$subC.unsubscribe();
    this.$subZ.unsubscribe();
    if(this.$subF) {
      this.$subF.unsubscribe();
    }
  }


  comprobarEnvioEnZona(envio: Envio, zona: ZonaCobertura) {
    // console.log("poligono");
    var puntosPoligono: any[] = JSON.parse(zona.vertices);
    // for (let pol in poligono.figura.coordenadas) {
    //   puntosPoligono.push(poligono.figura.coordenadas[pol]);
    // }
    var x = envio.direccion.latitud;
    var y = envio.direccion.longitud;

    var dentro = false;
    for (var i = 0, j = puntosPoligono.length - 1; i < puntosPoligono.length; j = i++) {
      var xi = puntosPoligono[i].lat;
      var yi = puntosPoligono[i].lng;
      var xj = puntosPoligono[j].lat;
      var yj = puntosPoligono[j].lng;

      var interseccion = ((yi > y) != (yj > y))
        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
      if (interseccion) dentro = !dentro;
    }
    //console.log(zona.nombre, envio.direccion.descripcion, dentro)
   if(dentro) {
    zona.envios.push(envio);
   }
    return dentro;
  };

  agregarConductoresEnZona() {
    this.conductoresDisponibles.forEach(
      conductor => 
      {
        conductor.envios = []
        this.zonas.filter( zona => zona.$key == conductor.keyZona)[0].conductores.push(conductor)
      }
    );
  }

  asignarEnviosConductor() {
    console.log(this.zonas)
    this.zonas.forEach( zona => {
      // a cada Conductor disponible se le de minimo 1 envio
      console.log(zona.nombre);
      zona.conductores.forEach(
        conductor => {
          const enviosC: Envio[] = [];
          let peso = 0;
          let  ultimoNodo;
          while(enviosC.length < this.maxEnvios && zona.envios.length > 0) {
            let key;
            console.log(key)
            if(!ultimoNodo) {
              key = this.enviosCercano(zona.envios, this.central);
              ultimoNodo = latLng(zona.envios[key].direccion.latitud, zona.envios[key].direccion.longitud)
            } else {
              key = this.enviosCercano(zona.envios, ultimoNodo);
              ultimoNodo = latLng(zona.envios[key].direccion.latitud, zona.envios[key].direccion.longitud)
            }
            peso += zona.envios[key].infoEnvio.peso;
            if(peso <= this.maxPeso) {
              enviosC.push(zona.envios[key]);
              zona.envios.splice(key,1);
            } else {
              break;
            }
            console.log(zona.envios)
          }
          conductor.envios = enviosC;
        }
      );


    })
  }



  enviosCercano(envios: Envio[], punto: LatLng) {
    console.log(punto);
    let key;
    let distanciatmp: number = Number.MAX_SAFE_INTEGER;
    for (let keyA in envios) {
      const auxEnvio = envios[keyA]
      let distance: number = punto.distanceTo(latLng(auxEnvio.direccion.latitud, auxEnvio.direccion.longitud));
      if (distance <= distanciatmp) {
        distanciatmp = distance;
        key = keyA;
      }
    }
    return key;
  }

  async procesarEnvios() {
    this.loading = true;
    for (const key in this.zonas) {
        const zona = this.zonas[key];
        for (const key in zona.conductores) {
            const conductor = zona.conductores[key];
            for (const key in conductor.envios) {
                const envio = conductor.envios[key];
                const auxEnvio = {key: envio.$key, escanear: false};
                await this.envioService.procesar(auxEnvio, conductor.$key,envio.$key).then(
                  (bool) => {
                    console.log(bool, auxEnvio.key)
                  }
                );
            }
             await this.envioService.enviarMensaje(conductor.$key);
        }
    }

    // this.zonas.forEach(
    //   zona => {
    //     zona.conductores.forEach(
    //       conductor => {
    //         conductor.envios.forEach(
    //           envio => {
    //             const auxEnvio = {key: envio.$key, escanear: false};
    //             this.envioService.procesar(auxEnvio, conductor.$key,envio.$key)
    //             // .then(
    //             //   bool => {
    //             //     this.loading =false;
    //             //     this.toast.success('Envios Asignados Correctamente');
    //             //     this.router.navigate(['../'], {relativeTo: this.ruta})
    //             //   }
    //             // );
    //           }
    //         );
    //       }
    //     );
    //   }
    // );
  }
}