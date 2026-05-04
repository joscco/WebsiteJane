import { Routes } from '@angular/router';
import { HeroComponent } from './components/hero/hero.component';
import { KonzeptComponent } from './components/konzept/konzept.component';
import { FuerWenComponent } from './components/fuer-wen/fuer-wen.component';
import { WirkungComponent } from './components/wirkung/wirkung.component';
import { SchreibraeumeComponent } from './components/schreibraeume/schreibraeume.component';
import { SchreibimpulseComponent } from './components/schreibimpulse/schreibimpulse.component';
import { AngeboteComponent } from './components/angebote/angebote.component';
import { UeberMichComponent } from './components/ueber-mich/ueber-mich.component';
import { KontaktComponent } from './components/kontakt/kontakt.component';
import { MitmachenComponent } from './components/mitmachen/mitmachen.component';

export const routes: Routes = [
  { path: '',           component: HeroComponent,          title: 'Startseite – Krise & Kreativität' },
  { path: 'konzept',    component: KonzeptComponent,        title: 'Konzept – Krise & Kreativität' },
  { path: 'fuer-wen',   component: FuerWenComponent,        title: 'Für wen? – Krise & Kreativität' },
  { path: 'wirkung',    component: WirkungComponent,        title: 'Wissenschaft & Wirkung – Krise & Kreativität' },
  { path: 'schreibraeume', component: SchreibraeumeComponent, title: 'Schreibräume – Krise & Kreativität' },
  { path: 'impulse',    component: SchreibimpulseComponent, title: 'Schreibimpulse – Krise & Kreativität' },
  { path: 'angebote',   component: AngeboteComponent,       title: 'Angebote – Krise & Kreativität' },
  { path: 'ueber-mich', component: UeberMichComponent,      title: 'Über mich – Krise & Kreativität' },
  { path: 'kontakt',    component: KontaktComponent,        title: 'Kontakt – Krise & Kreativität' },
  { path: 'mitmachen',  component: MitmachenComponent,      title: 'Text einreichen – Krise & Kreativität' },
  { path: '**',         redirectTo: '' },
];

