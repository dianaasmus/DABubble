import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'rxfire/firestore/interfaces';
import { User } from '../models/user.interface';
import { BehaviorSubject, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  currentUser: User | undefined;
  firestore: Firestore = inject(Firestore);
  // users: User[] = [];
  checkData!: boolean;
  urlId!: any;
  private usersSubject = new BehaviorSubject<User[]>([]);
  private dataLoadedSubject = new BehaviorSubject<boolean>(false);
  users$ = this.usersSubject.asObservable();
  public users: User[] = [];

  newUser = this.fb.group({
    firstLastName: ['', [Validators.required, this.fullNameValidator]],
    email: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/)]],
    checkData: [false, Validators.requiredTrue],
    profileImg: ['', undefined]
  });


  constructor(private fb: FormBuilder, private route: Router) {   }

  // async ngOnInit() {
  //   debugger
  //   this.getUsers().then(users => {
  //     this.users = users;  // Setze die Benutzer nach der Promise-Auflösung
  //     // this.urlId = this.getUrlId();
  //     // this.currentUser = this.getCurrentUser();
  //   });
  //   // this.users = await this.getUsers(); 
  //   this.urlId = this.getUrlId();
    
  // }

  
  fullNameValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    if (!value) return null;
  
    const parts = value.trim().split(' ');
    if (parts.length < 2) {
      return { 'fullNameInvalid': true };  // At least two words (first and last name) are required
    }
  
    for (const part of parts) {
      if (!/^[A-Za-zÄäÖöÜüß]+$/.test(part)) {
        return { 'fullNameInvalid': true };  // Each part must match the name pattern
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
    // this.getUsers();

    // this.returnCurrentUser().subscribe(currentUser => {
    //   // if (currentUser !== null) {
        
    //     console.log(this.currentUser);
    //   //   return currentUser;
    //   // }
    //   return currentUser ? currentUser : undefined;
    // });

    return undefined
  }


  returnCurrentUser(users: User[]) {
    users.forEach(user => {
      if (user.id === this.getUrlId()) {
        return user;
        
      }
    return undefined

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


  async getUsers(): Promise<void> {
    try {
      const ref = this.getSingleDocRef();
      const list = await getDocs(ref);
  
      const users = list.docs.map((doc) => {
        const docId = doc.id;
        return this.setUserObject(doc.data(), docId);
      });
  
      this.usersSubject.next(users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }  

  private getSingleDocRef() {
    return collection(this.firestore, 'users');
  }

}