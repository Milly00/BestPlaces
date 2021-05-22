import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Comentario } from '../data/sitios.interface';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  private itemsCollection: AngularFirestoreCollection<Comentario> ;
  comentario: Observable<Comentario[]>;

  constructor( private afs: AngularFirestore) { 

    this.itemsCollection = this.afs.collection<Comentario>('comentarios');
    this.comentario = this.itemsCollection.valueChanges();
  }

  getComentarios(){
  return   this.comentario;
  }

 agregarComentario(uid:string, contenido:string,ids: string, imgu:string){

  const c: Comentario = {
uid: uid,
contenido: contenido,
ids: ids,
imgu: imgu
  }

  return this.itemsCollection.add(c);
 }
}
