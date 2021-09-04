import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comentario } from '../data/sitios.interface';
import { map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  //------------------------------------VARIABLES----------------------------------------------------------------

  private itemsCollection: AngularFirestoreCollection<Comentario>;
  comentario: Observable<Comentario[]>;

  //----------------------------------------CONSTRUCTOR-------------------------------------------------------

  constructor(private afs: AngularFirestore) {

    this.itemsCollection = this.afs.collection<Comentario>('comentarios');
    this.comentario = this.itemsCollection.valueChanges();
  }

  //----------------------------------OBTENER COMENTARIOS-------------------------------------------------
  getComentarios() {
    return this.comentario;
  }
  //---------------------------------AGREGAR COMENTARIOS---------------------------------------------------
  agregarComentario(uid: string, contenido: string, ids: string, imgu: string) {

    const c: Comentario = {
      uid: uid,
      contenido: contenido,
      ids: ids,
      imgu: imgu,
      fecha: new Date(),
    }

    return this.itemsCollection.add(c);
  }

  //----------------------------------ELIMINAR COMENTARIO---------------------------------------------------
  eliminarComentario(id: string) {
    this.afs.doc<Comentario>(`comentarios/${id}`).delete();
  }
  //------------------------------------EDITAR COMENTARIO--------------------------------------------------------
  editarComentario(id: string, cont: string) {
    this.afs.doc<Comentario>(`comentarios/${id}`).update({ contenido: cont });

  }
  //-------------------------------OBTENER COMENTARIOS DE UN SITIO---------------------------------------------
  getComentarioSitios(): Observable<Comentario[]> {
    return this.afs.collection('comentarios').snapshotChanges().pipe(map(data => {
      return data.map(datos => {
        const id = datos.payload.doc.id;
        const coment = datos.payload.doc.data() as Comentario;

        return { id, ...coment };
      })
    }));
  }


}

/**
 *  getComentarioSitios(ids:string): Observable<Comentario[]>{
  return this.afs.doc(this.afs.collection('comentarios').).collection('comentarios').snapshotChanges().pipe(map(data=>{
    return data.map(datos=>{
      const id = datos.payload.doc.id;
      const coment = datos.payload.doc.data() as Comentario;

      return {id , ...coment};
    })
  }));
  }
 */