import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set } from 'firebase/database';
import { environment } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';

@Injectable({ providedIn: 'root' })
export class ContactoService {
  enviarFormulario(data: any): Promise<void> {
    const app = initializeApp(environment.realtimefirebase, 'CVWEB');
    const database = getDatabase(app);
    const id = uuidv4();
    return set(ref(database, 'correos/' + id), data);
  }
}
