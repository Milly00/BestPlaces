import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from './data/bestplace.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BestPlaces';
  user: Observable<any[]>;
  constructor(firestore: AngularFirestore) {
    this.user = firestore.collection('user').valueChanges();
  }
}
