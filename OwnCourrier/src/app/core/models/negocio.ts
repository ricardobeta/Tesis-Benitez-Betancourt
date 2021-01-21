export interface Negocio {
    nombreEmpresa: string;
    tipo: string;
    celular: string;
    correo: string;
    categoria: string;
    palabrasClave: string[];
    descripción: string;
    direccion: string;
    redesSociales?: string[];
    quienes?: string;
    mision?: string;
    vision?: string;
    file?: any;
    path?: string;
    url?: string;
}
