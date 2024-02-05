import { Injectable, inject } from '@angular/core';
import { DocumentData, Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { Channel } from '../models/channel.class';

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {
  currentChannel: string = 'Entwicklerteam';
  firestore: Firestore = inject(Firestore);
  channels = [];


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


  getChannels(): void {
    const ref = this.getSingleDocRef();
    onSnapshot(ref, (list: any) => {
      this.channels = list.docs.map((doc: any) => this.setUserObject(doc.data()));
      console.log(this.channels);
      
    });
  }


  private getSingleDocRef() {
    return collection(this.firestore, 'channels');
  }
}
