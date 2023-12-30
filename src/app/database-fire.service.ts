import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, onSnapshot } from '@angular/fire/firestore';
import { FormBuilder, Validators } from '@angular/forms';
import { DocumentData } from 'rxfire/firestore/interfaces';


interface User {
  firstLastName: string;
  email: string;
  password: string;
  checkData: boolean;
  profileImg?: string;
}


@Injectable({
  providedIn: 'root'
})
export class DatabaseFireService {
  firestore: Firestore = inject(Firestore);
  users: User[] = [];
  checkData: boolean = false;

  newUser = this.fb.group({
    firstLastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]+\s[a-zA-Z]+$/)]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [false, Validators.requiredTrue],
    profileImg: ['', undefined]
  });


  constructor(private fb: FormBuilder) {
    this.getUsers();
  }


  onCheckboxChange(event: Event) {
    this.checkData = (event.target as HTMLInputElement).checked;
    this.newUser.get('checkData')?.setValue(this.checkData);
  }


  private setUserObject(obj: DocumentData): User {
    return {
      firstLastName: obj['firstLastName'],
      email: obj['email'],
      password: obj['password'],
      checkData: false,
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


  private getUsers(): void {
    const ref = this.getSingleDocRef();
    onSnapshot(ref, (list) => {
      this.users = list.docs.map((doc) => this.setUserObject(doc.data()));
      console.log(this.users);
    });
  }


  private getSingleDocRef() {
    return collection(this.firestore, 'users');
  }
}
