import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from '../models/user.class';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser!: any;
  firestore: Firestore = inject(Firestore);
  users: User[] = [];
  checkData!: boolean;
  urlId!: any;


  newUser = this.fb.group({
    firstLastName: ['', [Validators.required, Validators.pattern(/^[A-Za-zÄäÖöÜüß ]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [false, Validators.requiredTrue],
    profileImg: ['', undefined]
  });


  constructor(private fb: FormBuilder, private route: Router) {
    this.getUsers();
    this.getUrlId();
    this.currentUser = this.getCurrentUser();
  }


  getUrlId() {
    const url = this.route.url;
    const urlSplit = url.split("/");
    this.urlId = urlSplit[1];
  }


  getCurrentUser() {
    // debugger;
    if (this.urlId == 'dashboard') {
      if (this.currentUser.firstLastName !== 'Gast') {
        this.returnCurrentUser();
      } else {
        return this.currentUser;
      }
    } else {
      this.returnCurrentUser();
    }
  }


  returnCurrentUser() {
    this.currentUser = this.users.find(user => user.id === this.urlId);
    return this.currentUser;
  }


  onCheckboxChange(event: Event) {
    this.checkData = (event.target as HTMLInputElement).checked;
    this.newUser.get('checkData')?.setValue(this.checkData);
  }


  private setUserObject(obj: DocumentData, docId: string): User {
    return {
      id: docId || obj['id'],
      firstLastName: obj['firstLastName'],
      email: obj['email'],
      password: obj['password'],
      profileImg: obj['profileImg']
    } as User;
  }


  async addUser() {
    try {
      const newUser = this.newUser.value;
      const collectionRef = this.getSingleDocRef();
      await addDoc(collectionRef, newUser);
    } catch (err) {
      console.error(err);
    }
  }


  async getUsers(): Promise<void> {
    const ref = this.getSingleDocRef();
    const list = await getDocs(ref);
    this.users = list.docs.map((doc) => {
      const docId = doc.id;
      return this.setUserObject(doc.data(), docId);
    });
    console.log(this.users);

    this.getUrlId();
  }



  private getSingleDocRef() {
    return collection(this.firestore, 'users');
  }

}
