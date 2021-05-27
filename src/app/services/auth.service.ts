import { Injectable } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import firebase from 'firebase/app';
import { User } from '../data/bestplace.interface';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


/**
 * NOTA: Aun nos falta confirmar email, tambien restablecer contraseña , arreglar lo de las opciones
 * del navbar cuando esta en responsive
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private itemsCollection: AngularFirestoreCollection<User> ;
  public  user: Observable<User[]>;
  public  usuario: any = {};

  public  datos: any;

  public  userToken: string | null;
  public  autenticado: boolean;
  
  constructor(public auth: AngularFireAuth, public afs: AngularFirestore , private router:Router) {

      this.cargarUsuario();
      this.leerToken();
      this.user = this.itemsCollection.valueChanges();
      this.auth.authState.subscribe(user=>{
        if(!user){
          return;
        }
        this.usuario.nombre = user.displayName;
        this.usuario.uid = user.uid;
        this.usuario.email = user.email;
        this.usuario.imgu = user.photoURL;
        this.guardarToken(user.refreshToken);
        console.log(this.usuario, user.refreshToken);
      });

    }

    getUsuario(){
      this.auth.authState.subscribe(user=>{
      if(!user){
         return;
        }
        return this.datos = user;
      });
    }

    cargarUsuario(){
      this.itemsCollection = this.afs.collection<User>('user');
     return  this.user = this.itemsCollection.valueChanges();
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

    registroEmail(email: string,pass:string){
      this.auth.createUserWithEmailAndPassword(email,pass).then((userCredential)=>{
        const user = userCredential.user;

        const Us:User={
          email: email,
          password: pass,
          uid: userCredential.user?.uid
        }

      console.log(Us , 'Estoy en ');
      
      return  this.itemsCollection.add(Us);
      
      }).catch((error)=>{
      const err = error.code;
      const errmsg = error.message;
      console.log('Error: ' + err , 'Mensaje: ' + errmsg);
      });
  }


    loginEmail(email: string,pass:string){

      this.auth.signInWithEmailAndPassword(email, pass).then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          icon: 'error',
          title: errorCode,
          text: 'Datos no validos, verifique sus credenciales.',
          })
        });
    }

    login() {
      this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.leerToken();

       setTimeout(() => {
         this.router.navigateByUrl('/general');
          this.autenticado = true;
        }, 7000);
       
    }

    reestablecerPass(nueva:string){
      this.auth.sendPasswordResetEmail(nueva);
    }


    logout() {
      this.auth.signOut();
      localStorage.clear();
    }

  

  /*RECORDAR EL AUTH GUARD
  */

    private guardarToken(id:string){
   
      localStorage.setItem('token',id);
          
  }

    leerToken(){
      console.log(this.userToken, 'local');

      return this.userToken = localStorage.getItem('token');
 
  }

  
}

/**DEBEMOS CREAR DE NUEVO LAS AUTENTICACIONES
 * this.auth.idToken.subscribe(token=>{
      if(token!==null){
        this.userToken = token;
    
      }
      
    })


    
  sendAutenticacio():boolean{
    if(this.autenticacion == true){
      return true;
    }else{
      return false;
    }
  }


  leerToken(){
      this.userToken = localStorage.getItem('token');
console.log(this.userToken, 'local');
    
  }



  esAutenticado():boolean{
    if(this.leerToken() !== null){
 //this.userToken.length > 2;
 this.router.navigateByUrl('/general');
 return true;
    }else{
      console.log(this.userToken);
      this.router.navigateByUrl('/home');
      return false;
    }
    
  }

   login() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(da=>{
      da.user?.getIdToken().then(id=>{

        this.guardarToken(id);
        this.userToken = id;
        console.log(this.userToken);
      });
    });
    
  }
 */