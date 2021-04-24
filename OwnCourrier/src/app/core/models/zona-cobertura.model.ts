import { Conductor } from "./conductor.model";
import { Envio } from "./envio.model";

export interface ZonaCobertura {
        nombre: string;
        color: string,
        vertices: string
        $key?: string;

        envios?: Envio[];
        conductores ?: Conductor[];
}