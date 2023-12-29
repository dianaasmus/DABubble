import { Injectable, inject } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DatabaseFireService {
  firestore: Firestore = inject(Firestore);

  constructor() {}

  log() {
    if (this.firestore) {
      console.log(this.firestore);
      
    }
  }
}
