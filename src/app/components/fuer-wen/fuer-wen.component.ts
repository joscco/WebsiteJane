import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-fuer-wen',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <section id="fuer-wen" class="py-24 bg-cream">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-14" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Für wen ist das?</span>
          <h2 class="font-serif font-semibold text-brown mb-4" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Schreiben kennt keine Voraussetzungen</h2>
          <p class="text-brown-muted max-w-xl mx-auto text-sm leading-relaxed">
            Dieses Projekt richtet sich an Menschen, die in einer Zeit leben, in der das Leben mehr fordert als üblich.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 mb-10">
          @for (group of groups; track group.title; let i = $index) {
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-border flex gap-5 items-start" appReveal
                 [style.transition-delay]="i * 80 + 'ms'">
              <div class="w-11 h-11 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                   [class]="group.iconBg" aria-hidden="true">
                <img [src]="group.icon" alt="" class="w-6 h-6"/>
              </div>
              <div>
                <h3 class="font-serif font-semibold text-brown text-base mb-2">{{ group.title }}</h3>
                <p class="text-brown-muted text-sm leading-relaxed">{{ group.text }}</p>
              </div>
            </div>
          }
        </div>

        <div class="text-center" appReveal>
          <a routerLink="/angebote" class="inline-flex items-center gap-2 px-7 py-3 bg-sage text-white text-sm font-bold rounded-full hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            Beginne hier <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5" style="filter: brightness(0) invert(1)"/>
          </a>
        </div>

      </div>
    </section>
  `,
})
export class FuerWenComponent {
  groups = [
    {
      icon: '/img/icon-plant.svg',
      iconBg: 'bg-[#fdf0f0]',
      title: 'Menschen mit schwerer Erkrankung',
      text: 'Eine Diagnose verändert alles – das eigene Selbstbild, den Alltag, die Sprache für das, was man erlebt. Schreiben kann helfen, diese Veränderungen zu fassen: als Ausdruck, als Verarbeitung, als Ort der Stille inmitten von Behandlung und Unsicherheit.',
    },
    {
      icon: '/img/icon-wave.svg',
      iconBg: 'bg-[#f0eaf8]',
      title: 'Menschen in Lebenskrisen',
      text: 'Verlust, Trauer, beruflicher Umbruch, das Ende einer Beziehung – Krisen stellen alte Gewissheiten in Frage. In solchen Momenten kann das Schreiben ein Anker sein: nicht um Antworten zu finden, sondern um überhaupt zu fragen.',
    },
    {
      icon: '/img/icon-handshake.svg',
      iconBg: 'bg-sage-light',
      title: 'Angehörige',
      text: 'Wer jemanden durch Krankheit oder Krise begleitet, trägt selbst eine Last. Schreiben kann auch für Angehörige ein Raum sein – für das, was man im Alltag nicht sagen kann oder darf.',
    },
    {
      icon: '/img/icon-books.svg',
      iconBg: 'bg-terra-light',
      title: 'Fachpersonen',
      text: 'Pflegende, Therapeut:innen und andere, die beruflich begleiten, können das kreative Schreiben als ergänzendes Werkzeug kennenlernen – mit Material und Impulsen, die sich in bestehende Arbeit integrieren lassen.',
    },
  ];
}
