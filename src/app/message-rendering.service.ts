import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot } from '@angular/fire/firestore';
import { Message } from '../models/message.interface';

@Injectable({
  providedIn: 'root'
})
export class MessageRenderingService {
  firestore: Firestore = inject(Firestore);
  messages: Message[] = [];


  constructor() {
    this.subProductsList();    
  }


  async addMessage(newMessage: any) {
    try {
      debugger;
      const collectionRef = this.getChannelMessages();
      const messageData = {
        'user': 'hi',
        'message': newMessage.message,
        'time': newMessage.time
      };
      await addDoc(collectionRef, newMessage);
    } catch (err) {
      console.error(err);
    }
  
    console.log('Nachricht gesendet');
  }
  


  getChannel() {
    let channelId = 'pVRkJzZ5JfuUVHPaoUwq';
    let channelRef = doc(collection(this.firestore, 'channels'), channelId);
    return channelRef;
  }


  getChannelMessages() {
    let channelRef = this.getChannel();
    let messagesRef = collection(channelRef, 'messages');
    return messagesRef;
  }


  private subProductsList() {
    let messagesRef = this.getChannelMessages();
    onSnapshot(messagesRef, (list) => {
      list.forEach((element) => {        
        this.messages.push(this.setMessageObject(element.data(), element.id));
      });
    });
  }


  private setMessageObject(obj: any, id: string) {
    return {
      id: obj.id || id,
      user: obj.user,
      message: obj.message,
      time: obj.time
    };
  }
}
