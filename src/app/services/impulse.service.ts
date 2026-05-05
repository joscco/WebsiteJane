import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { ImpulseItem, DEMO_IMPULSES } from '../models/impulse-item.model';
import { APP_CONFIG } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class ImpulseService {
  private http = inject(HttpClient);

  get isDemo(): boolean {
    return APP_CONFIG.SHEET_ID === 'DEINE_SPREADSHEET_ID';
  }

  getItems(): Observable<ImpulseItem[]> {
    if (this.isDemo) {
      return of(DEMO_IMPULSES);
    }
    const url = `https://docs.google.com/spreadsheets/d/${APP_CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(APP_CONFIG.SHEET_IMPULSE)}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(text => this.parseGvizJSON(text)),
      catchError(() => of(DEMO_IMPULSES))
    );
  }

  private parseGvizJSON(text: string): ImpulseItem[] {
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    let cols: string[] = data.table.cols.map((c: any) => (c.label || '').trim());
    const defaults = ['Titel', 'Beschreibung', 'Kategorie', 'Tag'];
    if (cols.every(c => !c)) {
      cols = defaults.slice(0, cols.length);
    }
    return data.table.rows
      .filter((row: any) => row && row.c)
      .map((row: any) => {
        const item: any = {};
        row.c.forEach((cell: any, i: number) => {
          item[cols[i]] = cell ? (cell.f ?? cell.v ?? '') : '';
        });
        return item as ImpulseItem;
      });
  }
}