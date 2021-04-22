export interface Conductor {
    cedula: string;
    celular: string;
    correo: string;
    direccion: string;
    fechaNacimiento: string;
    nombreCompleto: string;
    urlFoto?: string;
    urlLicencia?: string;
    pathFoto?: string;
    pathLicencia?: string;
    fileF?: any;
    fileL?: any;
    //user information
    uidConductor: string;
    keyNegocio: string;
    $key?: string;
    //
    estado?: string;
    keyVehiculo?: string;
    keyZona?: string
}