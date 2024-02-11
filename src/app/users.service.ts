import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from '../models/user.class';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser!: User;
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
    this.getCurrentUser();
  }

  initUsers() {
    debugger;
    this.getUsers();
    this.getUrlId();
    this.getCurrentUser();
    return this.currentUser;
  }


  getUrlId() {
    const url = this.route.url;
    const urlSplit = url.split("/");
    this.urlId = urlSplit[1];
  }


  getCurrentUser() {
    this.users.forEach(user => {
      if (user.id === this.urlId) {
        this.currentUser = user;
        console.log(user);
      }
    });
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


  getUsers(): void {
    const ref = this.getSingleDocRef();
    onSnapshot(ref, (list) => {
      this.users = list.docs.map((doc) => {
        const docId = doc.id;
        console.log(docId);
        return this.setUserObject(doc.data(), docId);
      });
      debugger;
      this.getUrlId();
    });
  }


  private getSingleDocRef() {
    return collection(this.firestore, 'users');
  }

}
