import { Injectable } from '@angular/core';


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../../environments/environment";
import { collection, getDocs, orderBy } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {
  public db;
  constructor() { 
    const firebaseApp = initializeApp(environment.firebase/*, 'CVWEB'*/);
    this.db = getFirestore();
  }

  async getEmpresasAsync(){
    return await getDocs(collection(this.db, "Empresas"));
  }

  async getHabilidades(){
    return await getDocs(collection(this.db, "habilidades"));  
  }

}
