import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { GalleryItem, DEMO_ITEMS } from '../models/gallery-item.model';
import { APP_CONFIG } from '../models/config.model';

@Injectable({ providedIn: 'root' })
export class GalleryService {
  private http = inject(HttpClient);

  get isDemo(): boolean {
    return APP_CONFIG.SHEET_ID === 'DEINE_SPREADSHEET_ID';
  }

  getItems(): Observable<GalleryItem[]> {
    if (this.isDemo) {
      return of(DEMO_ITEMS);
    }
    const url = `https://docs.google.com/spreadsheets/d/${APP_CONFIG.SHEET_ID}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(APP_CONFIG.SHEET_GALERIE)}`;
    return this.http.get(url, { responseType: 'text' }).pipe(
      map(text => this.parseGvizJSON(text)),
      catchError(() => of([]))
    );
  }

  private parseGvizJSON(text: string): GalleryItem[] {
    const jsonStr = text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    const data = JSON.parse(jsonStr);
    const cols: string[] = data.table.cols.map((c: any) => c.label);
    return data.table.rows
      .filter((row: any) => row && row.c)
      .map((row: any) => {
        const item: any = {};
        row.c.forEach((cell: any, i: number) => {
          item[cols[i]] = cell ? (cell.f ?? cell.v ?? '') : '';
        });
        return item as GalleryItem;
      })
      .filter((item: GalleryItem) =>
        String(item.Anzeigen).trim().toLowerCase() === 'ja'
      );
  }
}

