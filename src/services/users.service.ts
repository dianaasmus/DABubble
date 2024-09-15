import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from '../models/user.interface';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: User | undefined;
  firestore: Firestore = inject(Firestore);
  checkData: boolean = false;
  urlId: string | undefined;

  public usersSubject = new BehaviorSubject<User[]>([]);
  public dataLoadedSubject = new BehaviorSubject<boolean>(false);

  newUser = this.fb.group({
    firstLastName: ['', [Validators.required, this.fullNameValidator]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [false, Validators.requiredTrue],
    profileImg: ['', undefined]
  });

  constructor(private fb: FormBuilder, private route: Router) {}

  fullNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
  
    const parts = value.trim().split(' ');
    if (parts.length < 2) {
      return { 'fullNameInvalid': true };
    }
  
    for (const part of parts) {
      if (!/^[A-Za-zÄäÖöÜüß]+$/.test(part)) {
        return { 'fullNameInvalid': true };
      }
    }
  
    return null;
  }

  getUrlId() {
    const url = this.route.url;
    const urlSplit = url.split("/");
    return urlSplit[1];
  }

  getCurrentUser(): User | undefined {
    return undefined;
  }

  returnCurrentUser(users: User[]) {
    users.forEach(user => {
      if (user.id === this.getUrlId()) {
        return user;
      }
      return undefined;
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

  async addUser(): Promise<void> {
    try {
      const newUser = this.newUser.value;
      const collectionRef = this.getSingleDocRef();
      await addDoc(collectionRef, newUser);
      await this.getUsers();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }

  async getUsers(): Promise<void> {
    try {
      const ref = this.getSingleDocRef();
      const list = await getDocs(ref);
  
      const users = list.docs.map((doc) => {
        const docId = doc.id;
        return this.setUserObject(doc.data(), docId);
      });
  
      this.usersSubject.next(users);
      this.dataLoadedSubject.next(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  getUsersValue(): User[] {
    return this.usersSubject.getValue();
  }

  getDataLoadedValue(): boolean {
    return this.dataLoadedSubject.getValue();
  }

  private getSingleDocRef() {
    return collection(this.firestore, 'users');
  }
}
