import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { CalificarSitio, Comentario } from 'src/app/data/sitios.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SitiosService } from 'src/app/services/sitios.service';
import Swal from 'sweetalert2';
import {  map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-detalle-sitio',
  templateUrl: './detalle-sitio.component.html',
  styleUrls: ['./detalle-sitio.component.css']
})
export class DetalleSitioComponent implements OnInit {

  public site: any = [];
  public puntuaciones: CalificarSitio[] = [];
          uid: string;//recibe el id del usuario
          id: string;//recibe el id del sitio
          val: number; //recibe las estrellas del usuario
          total: number;
          ide: string;//Para recibir el id que viene de punt-sitio
  public punt:  any = [];
  comentarios: Comentario[];
  coleccionC: Comentario[];
usuario: any;
  
  constructor(private router: ActivatedRoute , private sitio: SitiosService , private user:AngularFireAuth
    , private coment: ComentariosService) {
       
 //OBTENEMOS EL ARREGLO DE LAS PUNTUACIONES   
        this.sitio.getPunt().subscribe(data=>{
        this.puntuaciones = data;
        });

      this.coment.getComentarios().subscribe(datc=>{
          
    this.comentarios = datc; 
    
   
   
   
      })
       
   }

  ngOnInit(): void {
//RECIBIMOS EL ID DEL SITIO
    this.id = this.router.snapshot.params.ide;
      this.sitio.getSitio(this.id).subscribe(data=>{
      //RECIBIMOS EL SITIO CON EL ID FILTRADO
          this.site = data;
          console.log(this.site);
          });
          console.log(this.id);
    
          //Necesito traer el doc de punt-sitios
          console.log(this.puntuaciones);

          this.user.authState.subscribe(user=>{
            if(!user){
               return;
         }
           //OBTENEMOS EL ID DEL USUARIO PARA LLENAR LOS DATOS DE QUIEN VOTO
           this.uid = user.uid;
           if(user){}
           this.usuario = user;
           console.log(this.uid, 'El uid del user', this.usuario.photoURL)
            });

           this.cargarComentarios();

  }

  //Para agregar la calificacion al sitios
//PARA CALIFICAR EL SITIO Y ESCUCHAR EL EVENTO A LA ESTRELLA QYE SE PULSO
  onRate($event:{newValue:number} ){
    console.log($event.newValue);
    this.val = $event.newValue;

  }
//PARA MANDAR LA VOTACION O RANKING A LA BD
  AddCalificacion(){
      console.log(this.val);
      const val = this.site.valoracion;
      const total = this.site.length
      this.sitio.AddDetalleSitio(this.id, this.site.nombre, this.val, this.uid);
      this.contarValoracion();

  }
//CALCULAR CUANTOS  PUNTOS SE ASIGNARON A DICHO SITIO
  contarValoracion(){

     let cont = 0;
     let valor = 0;
  //OBTENEMOS EL DOCUEMNTO COMPLETO DE TODOS LOS DATOS DE QUIENES VOTARON 
    console.log(this.puntuaciones);
      for (let index = 0; index < this.puntuaciones.length; index++) {
            if(this.id == this.puntuaciones[index].id){
                valor = this.puntuaciones[index].puntuacion + valor;
                cont = cont +1;
            }
         }
      this.sitio.AddCalificacion(this.id, (valor/cont) );

      console.log(valor, cont)
}

guardarDatos(forma:NgForm){
this.coment.agregarComentario(this.uid, forma.value.contenido,this.id, this.usuario.photoURL);

}


cargarComentarios(){
 //OBTENEMOS LA LISTA DE COMENTARIOS
 console.log(this.comentarios);
setTimeout(()=>{
  for (let index = 0; index < this.comentarios.length; index++) {
    
   if(this.id === this.comentarios[index].ids){
 this.coleccionC.push(this.comentarios[index]);
 console.log('Esta ws',this.coleccionC);

 }
   
 }
}, 3000)
}
  
}

/**contarValoracion(){
     let cont = 0;
     let v = 0;
  //OBTENEMOS EL DOCUEMNTO COMPLETO DE TODOS LOS DATOS DE QUIENES VOTARON 
  this.sitio.getPuntuaciones().subscribe(data=>{
    //this.punt = data;
    //NO SE PORQUE PERO SOLO ME DEJA TRAER LOS DATOS ASI 
    //TRAEMOS LOS DATOS DE LA COLECCION PUNT-SITIO
    data.map(a=>{

      this.ide = a.id;
     // this.val = a.puntuacion;
      //this.punt = [this.ide,this.val];
    })
//COMO ES UN ARREGLO ITERAMOS SOBRE EL
    for (let index = 0; index < data.length; index++) {
      //VERIFICAMOS QUE EL ID DEL SITIOS COINCIDA CON EL ID DEL DOCUMENTO
      if(this.id==data[index].id){
        v = data[index].puntuacion + v;
        cont ++;
      }
        
    };

   
this.total = v/cont;

   });
    

     console.log(this.total);
}
 */

