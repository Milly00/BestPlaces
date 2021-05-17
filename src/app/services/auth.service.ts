import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { User } from '../data/bestplace.interface';


/**
 * NOTA: Aun nos falta confirmar email, tambien restablecer contraseña , arreglar lo de las opciones
 * del navbar cuando esta en responsive
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private itemsCollection: AngularFirestoreCollection<User> ;
  user: Observable<User[]>;
usuario: any = {};
  
  constructor(public auth: AngularFireAuth, public afs: AngularFirestore) {

    this.cargarUsuario();
    this.user = this.itemsCollection.valueChanges();this.auth.authState.subscribe(user=>{
  if(!user){
    return;
  }
  this.usuario.nombre = user.displayName;
  this.usuario.uid = user.uid;
  this.usuario.email = user.email;
  this.usuario.imgu = user.photoURL;

  console.log(this.usuario);
});

   }

  getUsuario(){

  }

  cargarUsuario(){
    this.itemsCollection = this.afs.collection<User>('user');
    this.user = this.itemsCollection.valueChanges();
  }

  agregarUsuario(){
const Us:User={
  nombre: this.usuario.nombre,
  uid: this.usuario.uid,
  email: this.usuario.email,
  imgu: this.usuario.imgu
}
console.log(Us , 'Estoy en ');
  return  this.itemsCollection.add(Us);
  }

  loginEmail(email: string,pass:string){
    this.auth.createUserWithEmailAndPassword(email,pass).then((userCredential)=>{
      const user = userCredential.user;

      const Us:User={
        email: email,
        password: pass,
        uid: userCredential.user?.uid
      }
      console.log(Us , 'Estoy en ');
        return  this.itemsCollection.add(Us);
      console.log(user);
    }).catch((error)=>{
      const err = error.code;
      const errmsg = error.message;
      console.log('Error: ' + err , 'Mensaje: ' + errmsg);
    })
  }

  login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
