import { Injectable, inject } from '@angular/core';
import { CollectionReference, Firestore, addDoc, collection, getDocs } from '@angular/fire/firestore';
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

  /**
   * Retrieves the guest login credentials (email and password).
   * 
   * @function getGuestCredentials
   * @returns {{ email: string, password: string }} - An object containing the guest email and password.
   */
  getGuestCredentials(): { email: string; password: string } {
    return {
      email: 'guest@guest.com',
      password: 'guest'
    };
  }

  /**
   * Validator for the full name field in the form.
   * @param control - The form control to validate.
   * @returns An object with a validation error or null if valid.
   */
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

  /**
   * Gets the user ID from the URL.
   * @returns The user ID as a string.
   */
  getUrlId(): string {
    const url = this.route.url;
    const urlSplit = url.split("/");
    return urlSplit[1];
  }

  /**
   * Gets the current user.
   * @returns The current user or undefined if not set.
   */
  getCurrentUser(): User | undefined {
    return undefined;
  }

  /**
   * Returns the user matching the current URL ID.
   * @param users - The list of users to search through.
   * @returns The matching user or undefined.
   */
  returnCurrentUser(): User | null {
    let foundUser = null;
    this.usersSubject
      .pipe(
        map(
          (users) => users.find((user) => user.id === this.getUrlId()) || null
        )
      )
      .subscribe((user) => {
        foundUser = user;
      });

    return foundUser;
  }
  
  /**
   * Handles checkbox change events and updates the form control.
   * @param event - The change event from the checkbox.
   */
  onCheckboxChange(event: Event): void {
    this.checkData = (event.target as HTMLInputElement).checked;
    this.newUser.get('checkData')?.setValue(this.checkData);
  }

  /**
   * Converts Firestore document data to a User object.
   * @param obj - The document data from Firestore.
   * @param docId - The document ID from Firestore.
   * @returns The User object.
   */
  private setUserObject(obj: DocumentData, docId: string): User {
    return {
      id: docId || obj['id'],
      firstLastName: obj['firstLastName'],
      email: obj['email'],
      password: obj['password'],
      profileImg: obj['profileImg']
    } as User;
  }

  /**
   * Adds a new user to the Firestore database and updates the users list.
   * @returns A promise that resolves when the operation is complete.
   */
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

  /**
   * Fetches the list of users from Firestore and updates the BehaviorSubject.
   * @returns A promise that resolves when the operation is complete.
   */
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

  /**
   * Gets the current value of the users list.
   * @returns The current list of users.
   */
  getUsersValue(): User[] {
    return this.usersSubject.getValue();
  }

  /**
   * Gets the current value of the data loaded state.
   * @returns True if data has been loaded, false otherwise.
   */
  getDataLoadedValue(): boolean {
    return this.dataLoadedSubject.getValue();
  }

  /**
   * Gets a reference to the 'users' collection in Firestore.
   * @returns A Firestore collection reference.
   */
  private getSingleDocRef(): CollectionReference<DocumentData> {
    return collection(this.firestore, 'users');
  }
}
