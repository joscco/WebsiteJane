import { Injectable } from '@angular/core';
import { APP_CONFIG } from '../models/config.model';

export interface FormData {
  name: string;
  email: string;
  kategorie: string;
  titel: string;
  beschreibung: string;
  bild: string;
  tags: string;
}

@Injectable({ providedIn: 'root' })
export class FormService {
  get isConfigured(): boolean {
    return APP_CONFIG.FORM_ENDPOINT !== 'DEIN_APPS_SCRIPT_URL';
  }

  async submit(data: FormData): Promise<void> {
    await fetch(APP_CONFIG.FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify(data),
    });
  }
}

