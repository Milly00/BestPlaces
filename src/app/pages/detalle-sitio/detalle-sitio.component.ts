import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CalificarSitio, Comentario } from 'src/app/data/sitios.interface';
import { AuthService } from 'src/app/services/auth.service';
import { SitiosService } from 'src/app/services/sitios.service';
import Swal from 'sweetalert2';
import { map } from "rxjs/operators";
import { NgForm } from '@angular/forms';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-detalle-sitio',
  templateUrl: './detalle-sitio.component.html',
  styleUrls: ['./detalle-sitio.component.css']
})
export class DetalleSitioComponent implements OnInit {

  //------------------------------VARIABLES---------------------------------------------------------------------
  public site: any = [];
  public puntuaciones: CalificarSitio[] = [];
  public uid: string;//recibe el id del usuario
  public id: string;//recibe el id del sitio
  public val: number; //recibe las estrellas del usuario
  public total: number;
  public ide: string;//Para recibir el id que viene de punt-sitio
  public punt: any = [];
  comentarios: Comentario[];
  public coleccionC: Comentario[] = [];
  usuario: any;
  activarComentario: boolean = false;
  cargando: boolean = false;
  autenticado: boolean = false;

  //--------------------------------------CONSTRUCTOR----------------------------------------------------
  constructor(private router: ActivatedRoute, private sitio: SitiosService, private user: AngularFireAuth
    , private coment: ComentariosService, private ruta: Router, private auth: AuthService) {

      if(this.auth.userToken){
        this.autenticado = true;
      }
    //OBTENEMOS EL ARREGLO DE LAS PUNTUACIONES   
    this.sitio.getPunt().subscribe(data => {
      this.puntuaciones = data;
    });

    /** this.coment.getComentarios().subscribe(dat=>{
      this.comentarios = dat;
    }); */

    this.coment.getComentarioSitios().subscribe(d => {
      // console.log(d);
      this.comentarios = d;
    })


  }

  //---------------------------------------ONINIT-----------------------------------------------------------
  ngOnInit(): void {
    //RECIBIMOS EL ID DEL SITIO
    this.cargando = true;
    // console.log(this.cargando);
    this.id = this.router.snapshot.params.ide;
    this.sitio.getSitio(this.id).subscribe(data => {
      //RECIBIMOS EL SITIO CON EL ID FILTRADO
      this.site = data;

      //console.log(this.site);
      this.cargando = false;
      //console.log(this.id, this.cargando);
    });


    //Necesito traer el doc de punt-sitios
    //console.log(this.puntuaciones);

    this.user.authState.subscribe(user => {
      if (!user) {
        return;
      }
      //OBTENEMOS EL ID DEL USUARIO PARA LLENAR LOS DATOS DE QUIEN VOTO
      this.uid = user.uid;
      if (user) { }
      this.usuario = user;
      // console.log(this.uid, 'El uid del user', this.usuario.photoURL)
    });


  }

  //--------------------------------METODO EVENTO NGSTARATING--------------------------------------------------

  //Para agregar la calificacion al sitios
  //PARA CALIFICAR EL SITIO Y ESCUCHAR EL EVENTO A LA ESTRELLA QYE SE PULSO
  onRate($event: { newValue: number }) {
    // console.log($event.newValue);
    this.val = $event.newValue;

  }
  //--------------------------------METODO PARA CALIFICAR-----------------------------------------------------
  acceso() {
    Swal.fire({
      title: 'Pulsa el botón de calificar',
      text: 'Si quieres calificar este sitio te invitamos a pulsar el boton calificar que esta a la derecha',
      icon: 'warning',

      confirmButtonText: 'Ok',

    })

  }

  //-------------------------------METODO PARA AGREGAR LA CALIFICACION DEL SITIO -------------------------------
  //PARA MANDAR LA VOTACION O RANKING A LA BD
  AddCalificacion() {
    // console.log(this.val);
    const val = this.site.valoracion;
    const total = this.site.length
    this.sitio.AddDetalleSitio(this.id, this.site.nombre, this.val, this.uid);
    this.contarValoracion();

  }

  //------------------------METODO QUE CALCULA PROMEDIO DE VOTOS--------------------------------------------
  //CALCULAR CUANTOS  PUNTOS SE ASIGNARON A DICHO SITIO
  contarValoracion() {

    let cont = 0;
    let valor = 0;
    //OBTENEMOS EL DOCUEMNTO COMPLETO DE TODOS LOS DATOS DE QUIENES VOTARON 
    // console.log(this.puntuaciones);
    for (let index = 0; index < this.puntuaciones.length; index++) {
      if (this.id == this.puntuaciones[index].id) {
        valor = this.puntuaciones[index].puntuacion + valor;
        cont = cont + 1;
      }
    }
    this.sitio.AddCalificacion(this.id, (valor / cont));

    // console.log(valor, cont)
  }

  //------------------------- METODO PARA GUARDAR COMENTARIO---------------------------------------------------

  guardarDatos(forma: NgForm) {
    this.coment.agregarComentario(this.uid, forma.value.contenido, this.id, this.usuario.photoURL);
    forma.resetForm();
  }

  //---------------------------------METODO QUE CARGA TODOS LOS COMENTARIOS-------------------------------------
  cargarComentarios() {
    //OBTENEMOS LA LISTA DE COMENTARIOS
    //console.log(this.comentarios);
    let i = 0;
    for (let index = 0; index < this.comentarios.length; index++) {

      if (this.id === this.comentarios[index].ids) {
        //  console.log(this.comentarios[index].ids, i);
        this.coleccionC[i] = this.comentarios[index];
        i = i + 1;
      }
      //console.log('Esta ws', this.coleccionC );
      this.activarComentario = true;
    }
  }

  //---------------------------------------METODO PARA ELIMINAR UN COMENTARIO-------------------------------

  eliminarComentario(id: string) {
    if (this.auth.userToken === id) {
      Swal.fire({
        title: '¿Estas seguro de eliminar este comentario?',
        text: '¡Estas a punto de elimnarlo, una vez eliminado no se puede recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminalo!',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.coment.eliminarComentario(id);
          this.ruta.navigateByUrl(`/detalle/${this.id}`)
          Swal.fire(
            '¡Comentario eliminado!',
            'Sucomentario ha sido eliminado con exito.',
          );
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Esta accion ha sido cancelada',
          )
        }
      })
    } else {
      Swal.fire(
        '¡No puedes eliminar este comentario!',
        'No puedes eliminar este comentario porque no eres el autor de este',
      );
    }

  }

  //----------------------------METODO PARA EDITAR COMENTARIO----------------------------------------------

  editarComentario(val: NgForm, id: string) {

    if (this.auth.userToken === id) {

      Swal.fire({
        title: '¿Estas seguro de realizar este comentario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si, guardar',
        cancelButtonText: 'No, cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.coment.editarComentario(id, val.value.conment);
          Swal.fire(
            '¡Comentario guardado!',
            'Su comentario ha sido guardado con exito.',
          )
          // For more information about handling dismissals please visit
          // https://sweetalert2.github.io/#handling-dismissals
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire(
            'Cancelado',
            'Esta accion ha sido cancelada',
          )
        }
      })

    } else {
      Swal.fire(
        '¡No puedes editar este comentario!',
        'No puedes editar este comentario porque no eres el autor.',
      );
    }
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

