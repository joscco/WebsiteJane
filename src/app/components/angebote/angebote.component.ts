import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-angebote',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <section id="angebote" class="py-24 bg-cream">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-14" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibangebote</span>
          <h2 class="font-serif font-semibold text-brown mb-4" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Wähle dein Format</h2>
          <p class="text-brown-muted max-w-xl mx-auto text-sm leading-relaxed">
            Ob allein, in einer Gruppe oder im eigenen Tempo – es gibt verschiedene Wege, mit dem Schreiben zu beginnen.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-14">
          @for (offer of offers; track offer.title; let i = $index) {
            <div class="bg-white rounded-2xl overflow-hidden shadow-sm border border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300" appReveal
                 [style.transition-delay]="i * 80 + 'ms'">
              <div class="h-2" [style.background-color]="offer.color"></div>
              <div class="p-8 flex flex-col gap-4">
                <div class="w-12 h-12 rounded-full flex items-center justify-center shrink-0" [class]="offer.iconBg" aria-hidden="true">
                  <img [src]="offer.icon" alt="" class="w-7 h-7"/>
                </div>
                <div>
                  <span class="text-[0.65rem] font-bold uppercase tracking-wider mb-1 block" [style.color]="offer.color">{{ offer.subtitle }}</span>
                  <h3 class="font-serif font-semibold text-brown text-xl mb-2">{{ offer.title }}</h3>
                  <p class="text-brown-muted text-sm leading-relaxed mb-4">{{ offer.description }}</p>
                  <div class="flex gap-2 flex-wrap">
                    @for (tag of offer.tags; track tag) {
                      <span class="text-xs px-3 py-1 rounded-full" [class]="offer.tagClass">{{ tag }}</span>
                    }
                  </div>
                </div>
                <a routerLink="/kontakt" class="mt-2 inline-flex items-center gap-1.5 text-sm font-bold transition-colors hover:text-terra" [style.color]="offer.color">
                  {{ offer.cta }} →
                </a>
              </div>
            </div>
          }
        </div>

        <div class="bg-brown text-white rounded-2xl px-8 py-10 text-center max-w-2xl mx-auto" appReveal>
          <img src="/img/icon-star.svg" alt="" class="w-6 h-6 mx-auto mb-3"/>
          <h3 class="font-serif font-semibold text-xl mb-3">Du weißt noch nicht, womit du anfangen sollst?</h3>
          <p class="text-[#c8b8a8] text-sm leading-relaxed mb-6">
            Schreib mir einfach. Wir finden gemeinsam heraus, was gerade zu dir passt – kein Format ist Pflicht.
          </p>
          <a routerLink="/kontakt" class="inline-flex items-center gap-2 px-7 py-3 bg-sage text-white text-sm font-bold rounded-full hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            Beginne hier <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5" style="filter: brightness(0) invert(1)"/>
          </a>
        </div>

      </div>
    </section>
  `,
})
export class AngeboteComponent {
  offers = [
    {
      color: '#8aaa8e',
      icon: '/img/icon-calendar.svg',
      iconBg: 'bg-sage-light',
      subtitle: 'Digital · Eigenverantwortlich',
      title: '100-Tage-Schreibreise',
      description: '100 Tage, 100 Impulse – zum Download. Du schreibst in deinem eigenen Tempo, zu Hause, ohne Anmeldung oder Verpflichtung. Täglich ein Schreibimpuls, abgestimmt auf die Themen Krise, Krankheit und Veränderung.',
      tags: ['PDF-Download', 'Freies Tempo', 'Keine Anmeldung'],
      tagClass: 'bg-sage-light text-sage-dark',
      cta: 'Interesse melden',
    },
    {
      color: '#c4956a',
      icon: '/img/icon-laptop.svg',
      iconBg: 'bg-terra-light',
      subtitle: 'Online · Live · Gruppe',
      title: 'Online-Schreibgruppe',
      description: 'Regelmäßige Live-Sessions, in denen gemeinsam geschrieben wird – mit Impulsen, kurzen Leserunden und Austauschmöglichkeit. Kein Vorwissen nötig; was geschrieben wird, bleibt privat.',
      tags: ['Videokonferenz', 'Kleine Gruppe', 'Regelmäßig'],
      tagClass: 'bg-terra-light text-terra-dark',
      cta: 'Auf Warteliste eintragen',
    },
    {
      color: '#b0a0d0',
      icon: '/img/icon-house.svg',
      iconBg: 'bg-[#f0eaf8]',
      subtitle: 'Vor Ort · Präsenz',
      title: 'Schreibwerkstatt vor Ort',
      description: 'Schreibworkshops in geschütztem Rahmen – für Einzelpersonen, Gruppen oder in Kooperation mit Kliniken, Hospizen und anderen Einrichtungen. Individuell anpassbar.',
      tags: ['Präsenz', 'Kooperationen', 'Anpassbar'],
      tagClass: 'bg-[#f0eaf8] text-[#6050a0]',
      cta: 'Anfragen',
    },
    {
      color: '#e8c060',
      icon: '/img/icon-envelope-in.svg',
      iconBg: 'bg-[#f5f0e0]',
      subtitle: 'Digital · Wöchentlich',
      title: 'Newsletter mit Schreibimpulsen',
      description: 'Wöchentlich ein Schreibimpuls direkt ins Postfach – mit kurzem Hintergrundinput, Frage und konkreter Übung. Kostenlos, jederzeit abbestellbar, kein Spam.',
      tags: ['Wöchentlich', 'Kostenlos', 'Jederzeit kündbar'],
      tagClass: 'bg-[#f5f0e0] text-[#7a6020]',
      cta: 'Jetzt anmelden',
    },
  ];
}
