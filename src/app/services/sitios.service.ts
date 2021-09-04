import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { User } from '../data/bestplace.interface';
import { AuthService } from './auth.service';
import { map } from "rxjs/operators";
import { CalificarSitio, Sitios } from '../data/sitios.interface';


@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  //----------------------------------VARIABLES------------------------------------------------------------
  private itemsCollection: AngularFirestoreCollection<Sitios>;
  private detalleCollection: AngularFirestoreCollection<CalificarSitio>;
  sitios: Observable<Sitios[]>;
  detalle: Observable<CalificarSitio[]>;
  lugares: Sitios[] = [];

  public cargando: boolean;

  //--------------------------------------CONSTRUCTOR--------------------------------------------------
  constructor(public auth: AngularFireAuth, public afs: AngularFirestore, private servicio: AuthService,
  ) {

    this.itemsCollection = this.afs.collection<Sitios>('sitios');
    this.sitios = this.itemsCollection.valueChanges();

    this.detalleCollection = this.afs.collection<CalificarSitio>('punt-sitio');
    this.detalle = this.detalleCollection.valueChanges();

  }

  //--------------------------------------OBTENER SITIOS--------------------------------------------------

  cargarSitio() {
    return this.sitios;
  }

  //-----------------------------------OBTENER SITIOS PSDT: DELVUELVE LA COLECCION------------------------

  getSit(): Observable<Sitios[]> {
    this.cargando = true;
    return this.afs.collection('sitios').snapshotChanges().pipe(map(date => {
      return date.map((datos) => {
        const data = datos.payload.doc.data() as Sitios;
        const ide = datos.payload.doc.id;
        this.cargando = false;

        return { ide, ...data };
      })
    }))
  }

  //-------------------------OBTENER UN SITIO EN ESPECIFICO-------------------------------------------------
  public getSitio(id: string) {

    return this.afs.doc<Sitios[]>(`sitios/${id}`).valueChanges();

  }

  //---------------------------OBTENER SITIO SEGUN LA CATEGORIA----------------------------------------------

  public getSitiosCategoria(categoria: string): Observable<Sitios[]> {
    this.cargando = true;
    return this.afs.collection('sitios', ref => ref.where('categoria', '==', `${categoria}`)).snapshotChanges().pipe(map(date => {
      return date.map((datos) => {
        const data = datos.payload.doc.data() as Sitios;
        const ide = datos.payload.doc.id;
        this.cargando = false;

        return { ide, ...data };
      })
    }))
  }

  //---------------------------------ORDENAR SITIOS SEGUN LA VALORACION-----------------------------------
  public getSitiosOrder(): Observable<Sitios[]> {
    this.cargando = true;
    return this.afs.collection('sitios', ref => ref.orderBy('valoracion', 'desc')).snapshotChanges().pipe(map(date => {
      return date.map((datos) => {
        const data = datos.payload.doc.data() as Sitios;
        const ide = datos.payload.doc.id;
        this.cargando = false;

        return { ide, ...data };
      })
    }))

  }

  //------------------------ AGREGAR/EDITAR DETALLES SITIO (PARA LA VALORACION )------------------------------------
  AddDetalleSitio(id: string, nombre: string, punt: number, uid: string) {
    const Site: CalificarSitio = {
      id: id,
      nombre: nombre,
      puntuacion: punt,
      uid: uid
    }

    return this.detalleCollection.add(Site);
  }

  //---------------------------------------OBTENER PUNTUACIONES-----------------------------------------------------
  getPuntuaciones() {
    return this.detalle;
  }

  //----------------------------OBTIENE LOS NUEVOS DATOS DEL SITIO CALIFICADO----------------------------

  getPunt(): Observable<CalificarSitio[]> {

    this.cargando = true;

    return this.afs.collection('punt-sitio').snapshotChanges().pipe(map(date => {
      return date.map((datos) => {
        const data = datos.payload.doc.data() as CalificarSitio;
        const ide = datos.payload.doc.id;
        this.cargando = false;

        return { ...data };
      })
    }));
  }
  //--------------------------------------- ACTUALIZA LA VALORACION------------------------------------
  //Solo necesito traer
  AddCalificacion(id: string, val: number) {

    return this.afs.collection('sitios').doc(`${id}`).update({ valoracion: val });
  }



}

/**agregarStrella(star:number){
    let datos ={
      rating: star
    }
    return this.itemsCollection.add(datos);


    return this.afs.collection("sitios").snapshotChanges().pipe(
      map(actions =>{
        actions.map(a=>{
          const data = a.payload.doc.data() as Sitios;
          const sid = a.payload.doc.id ;
          return {sid, ...data};
        })
      })
    )


    getS(){
    return this.afs.collection("sitios").get().toPromise().then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        const ida = doc.id;
        const data = doc.data() as Sitios;
        console.log(ida, data);
        return {ida,...data}
      })
    })
  }

   getSitios() {
    console.log('Entre');
    return this.afs.collection("sitios").snapshotChanges().pipe(
      map(actions =>{
        console.log('Volvi');

        actions.map(a=>{
          const data = a.payload.doc.data() as Sitios;
          const sid = a.payload.doc.id ;
          console.log('Volvi');
          return {sid, ...data};
        })
      })
    );

  }
  } */
