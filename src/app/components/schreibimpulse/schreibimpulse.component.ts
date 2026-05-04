import { Component, signal } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

interface ImpulseCard {
  nr: string;
  title: string;
  text: string;
  tag: string;
  today?: boolean;
  borderClass: string;
  numClass: string;
  tagClass: string;
}

interface ImpulseTab {
  key: string;
  icon: string;
  label: string;
  cards: ImpulseCard[];
}

@Component({
  selector: 'app-schreibimpulse',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="impulse" class="py-24 bg-cream-dark">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-10" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibimpulse</span>
          <h2 class="font-serif font-semibold text-brown mb-3" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Womit möchtest du beginnen?</h2>
          <p class="text-brown-muted max-w-lg mx-auto text-sm leading-relaxed">Wähle eine Form und such dir einen Impuls aus. 15 Minuten täglich genügen – kein Vorwissen nötig.</p>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 justify-center mb-10" appReveal role="tablist">
          @for (tab of tabs; track tab.key) {
            <button
              (click)="activeTab.set(tab.key)"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              [class.bg-sage]="activeTab() === tab.key"
              [class.text-white]="activeTab() === tab.key"
              [class.bg-cream-dark]="activeTab() !== tab.key"
              [class.text-brown-muted]="activeTab() !== tab.key"
              role="tab"
              [attr.aria-selected]="activeTab() === tab.key">
              <img [src]="tab.icon" alt="" class="w-4 h-4"
                   [style.filter]="activeTab() === tab.key ? 'brightness(0) invert(1)' : ''"/>
              {{ tab.label }}
            </button>
          }
        </div>

        <!-- Panels -->
        @for (tab of tabs; track tab.key) {
          @if (activeTab() === tab.key) {
            <div class="grid md:grid-cols-3 gap-5" role="tabpanel">
              @for (card of tab.cards; track card.title) {
                <article class="bg-white rounded-2xl p-6 border hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 relative"
                         [class]="card.today ? card.borderClass + ' ' + card.borderClass.replace('border-', 'bg-').replace(']', '/30]') : 'border-border hover:' + card.borderClass">
                  @if (card.today) {
                    <div class="absolute top-4 right-4 flex items-center gap-1 text-gold text-xs font-bold" aria-label="Impuls des Tages">
                      <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5"/> Heute
                    </div>
                  }
                  <div class="text-3xl font-serif font-bold leading-none" [class]="card.numClass">{{ card.nr }}</div>
                  <h3 class="font-serif font-semibold text-brown text-base">{{ card.title }}</h3>
                  <p class="text-brown-muted text-sm leading-relaxed flex-1">{{ card.text }}</p>
                  <span class="inline-block self-start text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" [class]="card.tagClass">{{ card.tag }}</span>
                </article>
              }
            </div>
          }
        }

        <p class="text-center text-xs text-brown-muted mt-8 flex items-center justify-center gap-1.5" appReveal>
          <img src="/img/icon-star.svg" alt="" class="w-3 h-3"/> markiert den Impuls des Tages – jeden Tag ein anderer
        </p>

      </div>
    </section>
  `,
})
export class SchreibimpulseComponent {
  activeTab = signal('brief');

  tabs: ImpulseTab[] = [
    {
      key: 'brief', icon: '/img/icon-email.svg', label: 'Brief',
      cards: [
        { nr: '01', title: 'Brief ans zukünftige Ich', text: 'Schreib dir selbst einen Brief – von jemandem, der schon weiß, dass alles gut wird. Was würde dieser Mensch dir heute sagen? Was ist wichtig, was kann warten?', tag: 'Ermutigung', borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
        { nr: '02', title: 'Brief an die Krankheit', text: 'Was würdest du der Krankheit, der Krise oder dem Verlust sagen, wenn du ihr direkt schreiben könntest? Ohne Höflichkeit, ohne Rücksicht – nur ehrlich.', tag: 'Ausdruck', borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
        { nr: '03', title: 'Brief an jemanden, dem ich danke', text: 'Denke an jemanden, dem du in schwieriger Zeit dankbar bist – und der es vielleicht nicht weiß. Schreib ihm oder ihr einen Brief. Du musst ihn nicht abschicken.', tag: 'Dankbarkeit', today: true, borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
      ],
    },
    {
      key: 'tagebuch', icon: '/img/icon-diary.svg', label: 'Tagebuch',
      cards: [
        { nr: '01', title: 'Was ich heute gesehen habe', text: 'Schreib ein Beobachtungsprotokoll deines Tages. Nur Fakten, keine Wertung – was hast du gesehen, gehört, gespürt? Mindestens 5 Dinge. Dann: Was fällt dir daran auf?', tag: 'Achtsamkeit', borderClass: 'border-terra', numClass: 'text-terra/20', tagClass: 'bg-terra-light text-terra-dark' },
        { nr: '02', title: 'Ein Ort der Ruhe', text: 'Beschreibe einen Ort – real oder erfunden – an dem du dich vollkommen sicher fühlst. Was siehst, riechst, hörst du? Was macht ihn zu einem Ort der Ruhe?', tag: 'Ressource', borderClass: 'border-terra', numClass: 'text-terra/20', tagClass: 'bg-terra-light text-terra-dark' },
        { nr: '03', title: 'Was ich gerade brauche', text: 'Schreib drei Minuten lang: Was brauchst du gerade wirklich? Nicht was du solltest, nicht was andere erwarten – sondern was du selbst brauchst. Ohne Zensur.', tag: 'Klärung', today: true, borderClass: 'border-terra', numClass: 'text-terra/20', tagClass: 'bg-terra-light text-terra-dark' },
      ],
    },
    {
      key: 'poesie', icon: '/img/icon-plant.svg', label: 'Poesie',
      cards: [
        { nr: '01', title: 'Ein Wort, das alles sagt', text: 'Welches Wort beschreibt deinen heutigen Zustand am besten? Trage es in die Mitte eines Blatts. Drumherum: alles, was dazu gehört. Ein Gedicht ohne Regeln.', tag: 'Freivers', borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
        { nr: '02', title: 'Die Farbe von heute', text: 'Wenn dein heutiger Tag eine Farbe wäre – welche? Schreib ein kurzes Gedicht, das diese Farbe beschreibt, ohne sie zu nennen.', tag: 'Bild & Metapher', borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
        { nr: '03', title: 'Litanei der kleinen Dinge', text: 'Schreib eine Liste von Dingen, die heute gut waren. Auch das Kleinste zählt: ein warmer Schluck, ein Moment Stille. Wiederhole dabei: „Ich bin dankbar für …"', tag: 'Ritual', today: true, borderClass: 'border-sage', numClass: 'text-sage/20', tagClass: 'bg-sage-light text-sage-dark' },
      ],
    },
    {
      key: 'biografie', icon: '/img/icon-book-open.svg', label: 'Biografie',
      cards: [
        { nr: '01', title: 'Bevor alles begann', text: 'Beschreibe einen ganz gewöhnlichen Tag aus deinem Leben – bevor die Krise oder Krankheit begann. Was war selbstverständlich? Was hast du nicht bemerkt?', tag: 'Erinnerung', borderClass: 'border-[#b0a0d0]', numClass: 'text-[#b0a0d0]/40', tagClass: 'bg-[#f0eaf8] text-[#6050a0]' },
        { nr: '02', title: 'Jemand, der mich geprägt hat', text: 'Denke an eine Person, die dich stark beeinflusst hat – positiv wie negativ. Was hat sie in dir hinterlassen? Was trägst du noch heute von ihr mit?', tag: 'Beziehung', borderClass: 'border-[#b0a0d0]', numClass: 'text-[#b0a0d0]/40', tagClass: 'bg-[#f0eaf8] text-[#6050a0]' },
        { nr: '03', title: 'Ein Wendepunkt', text: 'Jeder kennt einen Moment, nach dem nichts mehr so war wie vorher. Beschreibe diesen Moment – nur den Augenblick selbst. Was war der erste Gedanke?', tag: 'Narrativ', today: true, borderClass: 'border-[#b0a0d0]', numClass: 'text-[#b0a0d0]/40', tagClass: 'bg-[#f0eaf8] text-[#6050a0]' },
      ],
    },
    {
      key: 'frei', icon: '/img/icon-star.svg', label: 'Freies Schreiben',
      cards: [
        { nr: '01', title: '10 Minuten, ohne aufhören', text: 'Stell einen Timer auf 10 Minuten. Schreib, ohne die Hand anzuheben, ohne zu korrigieren. Lass alles raus, was da ist.', tag: 'Automatisch', borderClass: 'border-terra', numClass: 'text-terra/30', tagClass: 'bg-terra-light text-terra-dark' },
        { nr: '02', title: '„Was mich heute trägt …"', text: 'Schreib diesen Satz auf und führe ihn fort – ohne nachzudenken. Wohin führt er dich? Was überrascht dich an dem, was entsteht?', tag: 'Satzeinstieg', borderClass: 'border-terra', numClass: 'text-terra/30', tagClass: 'bg-terra-light text-terra-dark' },
        { nr: '03', title: 'Das Bild in meinem Kopf', text: 'Schließ kurz die Augen. Welches Bild taucht auf? Halte es fest – so genau wie möglich. Warum genau dieses Bild?', tag: 'Innenbild', today: true, borderClass: 'border-terra', numClass: 'text-terra/30', tagClass: 'bg-terra-light text-terra-dark' },
      ],
    },
  ];
}

