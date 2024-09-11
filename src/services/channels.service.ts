import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Channel } from '../models/channel.interface';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  currentChannel: string = 'Entwicklerteam';
  firestore: Firestore = inject(Firestore);
  // channels = [];
  private channelsSubject = new BehaviorSubject<Channel[]>([]);
  channels$ = this.channelsSubject.asObservable();


  constructor() {
    this.getChannels();
  }


  private setUserObject(obj: DocumentData): Channel {
    return {
      id: obj['id'],
      name: obj['name'],
      users: obj['users']
    };
  }


  // async addUser() {
  //   try {
  //     // const newUser = this.newUser.value;
  //     const collectionRef = this.getSingleDocRef();
  //     await addDoc(collectionRef, newUser);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }


  // getChannels(): void {
  //   const ref = this.getSingleDocRef();
  //   onSnapshot(ref, (list: any) => {
  //     this.channels = list.docs.map((doc: any) => this.setUserObject(doc.data()));
  //     console.log(this.channels);
  //     return this.channels;
  //   });
  // }

  getChannels(): void {
    const ref = this.getSingleDocRef();
    onSnapshot(ref, (list: any) => {
      const channels = list.docs.map((doc: any) => this.setUserObject(doc.data()));
      this.channelsSubject.next(channels); // Aktualisiert das BehaviorSubject mit den neuen Kanaldaten
    });
  }


  private getSingleDocRef() {
    return collection(this.firestore, 'channels');
  }
}
