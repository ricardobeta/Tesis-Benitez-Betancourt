import { Cliente } from "./cliente.model";
import { Direccion } from "./direccion.model";
import { InfoEnvio } from "./info-envio.model";

export interface Envio {
    cliente: Cliente;
    direccion: Direccion;
    infoEnvio: InfoEnvio;
    fecha: string;
    // valores opcionales
}