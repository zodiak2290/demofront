import { effect, Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import {
  getAuth,
  User,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private app = initializeApp(environment.firebase);
  private auth = getAuth(this.app);
  private db = getFirestore(this.app);

  private _userSignal = signal<User | null>(null);
  readonly userSignal = this._userSignal.asReadonly();

  constructor() {
    const storedUser = localStorage.getItem('identity');
    if (storedUser) {
      try {
        this._userSignal.set(JSON.parse(storedUser));
      } catch (err) {
        console.error('Error al parsear usuario desde localStorage', err);
      }
    }


    effect(() => {
      const user = this.userSignal();
      if (user) {
        localStorage.setItem('identity', JSON.stringify(user));
      } else {
        localStorage.removeItem('identity');
      }
    });
  }

  async register(email: string, password: string): Promise<UserCredential> {
    const cred = await createUserWithEmailAndPassword(this.auth, email, password);
    await this.saveUser(cred.user);
    this.setUser(cred.user);
    return cred;
  }

  async login(email: string, password: string) {
    const cred = await signInWithEmailAndPassword(this.auth, email, password);
    this.setUser(cred.user);
    return cred;
  }

  async saveUser(user: User) {
    const userRef = doc(this.db, 'users', user.uid);
    await setDoc(userRef, {
      email: user.email,
      createdAt: new Date()
    });
  }

  async getUserData(uid: string) {
    const ref = doc(this.db, 'users', uid);
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() : null;
  }


  getIdentity() {
    const raw = localStorage.getItem('identity');
    if (raw) {
      try {
        return JSON.parse(raw);
      } catch {
        return null;
      }
    }
    return null;
  }


  setUser(user: User | null) {
    if (user) {
      this._userSignal.set({ uid: user.uid, email: user.email } as User);
    } else {
      this._userSignal.set(null);
    }
  }

  clearUser() {
    this._userSignal.set( null);
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      this.clearUser();
      localStorage.removeItem('identity');
    }
  }

  obtenerDatosSignal() {

    return this.userSignal;

  }

}


