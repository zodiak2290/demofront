import { Injectable } from '@angular/core';


import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { environment } from "../../../environments/environment";
import { collection, getDocs, orderBy } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor() { 
  }

  async getEmpresasAsync(){
    const firebaseApp = initializeApp(environment.firebase);
    const db = getFirestore();
    return await getDocs(collection(db, "Empresas"));
  }

}
