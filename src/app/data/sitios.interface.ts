export interface Sitios{
    nombre?: string,
    ide?:string,
    descripcion?:string,
    img?: string,
    valoracion?: number,
    direccion?: string,
    longitud?:number,
    latitud?:number
}


export interface CalificarSitio{
    id: string,
    nombre: string,
    uid: string,
    puntuacion: number,
    //El contador puede ser con el total del arreglo
}

export interface Comentario{
    id?: string,
    contenido: string,
    uid: string,
    ids: string,
    imgu?: string,
    fecha?: Date
}