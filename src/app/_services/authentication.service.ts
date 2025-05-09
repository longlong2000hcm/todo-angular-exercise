import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, getFirestore, DocumentSnapshot } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  router = inject(Router);
  firestore = getFirestore();
  signedIn = false;
  auth = getAuth();
  provider = new GoogleAuthProvider();
  emailAutofill: any = '';

  constructor() {
  }

  login = async () => {

    const signInRes = await signInWithPopup(this.auth, this.provider)
      .catch(err => console.error('Google sign in error', err)) as UserCredential;

    const whitelistRef = doc(this.firestore, 'whitelist/' + this.auth.currentUser?.email);
    const whitelistDoc = await getDoc(whitelistRef)
      .catch(err => console.error('firebase error', err)) as DocumentSnapshot;
    const whitelisted = whitelistDoc.exists();

    if (!whitelisted) {
      console.log('user not registered');
      const emailParam = this.auth.currentUser?.email;
      this.emailAutofill = this.auth.currentUser?.email;
      await this.logout();
      this.router.navigate(['/register'], {state: {emailParam}});
      return;
    }
    
    const credential = GoogleAuthProvider.credentialFromResult(signInRes);
    console.log('user registered and login success, credential', credential);
    this.router.navigate(['/app']);
  }

  logout = async () => {
    await signOut(this.auth)
      .catch(err => console.log('sign out error:', err));
  }

  postRegister = async (user: {
    firstname: string;
    lastname: string;
    email: string;
  }) => {
    if (user.firstname=='' || user.lastname=='' || user.email=='') {
      return;
    }
    const docRef = doc(this.firestore, 'whitelist', user.email);
    await setDoc(docRef, user, { merge: true })
      .catch(err => console.error('register error', err));
    this.router.navigate(['']);
    this.login();
  };
}
