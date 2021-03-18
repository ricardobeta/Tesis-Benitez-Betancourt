import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/core/services/login/login.service';

@Component({
  selector: 'app-prinpical-registro',
  templateUrl: './prinpical-registro.component.html',
  styleUrls: ['./prinpical-registro.component.scss']
})
export class PrinpicalRegistroComponent implements OnInit {
  bandera = false;
  constructor(private loginService: LoginService) {
      this.loginService.usuarioConecteado().then(
        usuario => {
          console.log(usuario)
          if(usuario) {
            this.loginService.irNegocio(usuario.uid);
          } else {
            this.bandera = true;
          }
        }
      );
  }

  ngOnInit(): void {
  }

}
