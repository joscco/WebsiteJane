import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-ueber-mich',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="ueber-mich" class="py-24 bg-cream-dark">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-16 items-start">

          <div class="flex justify-center" appReveal aria-hidden="true">
            <!-- Foto-Platzhalter – durch <img> ersetzen, sobald vorhanden -->
            <div class="w-full max-w-[340px] aspect-[3/4] bg-sage-light rounded-2xl flex flex-col items-center justify-center gap-4 text-[#7a9e7e] shadow-sm border border-[#c0d8c2]">
              <img src="/img/placeholder-person.svg" alt="" class="w-20 h-20 opacity-40"/>
              <p class="text-sm font-semibold opacity-50">Foto folgt</p>
            </div>
          </div>

          <div appReveal>
            <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-4">Über mich</span>
            <h2 class="font-serif font-semibold text-brown mb-5" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Jane Spiekermann</h2>

            <p class="text-brown-muted leading-relaxed mb-4">
              Hier steht Janes beruflicher Hintergrund – z. B. Studium, Ausbildung, relevante berufliche Stationen.
              Dieser Text wird noch ergänzt.
            </p>
            <p class="text-brown-muted leading-relaxed mb-4">
              Dieses Projekt ist aus einer persönlichen Erfahrung entstanden. Warum das Schreiben in
              meinem eigenen Leben eine Rolle gespielt hat und warum ich es anderen zugänglich machen
              möchte – das ist der Kern dieser Arbeit.
            </p>
            <p class="text-brown-muted leading-relaxed mb-8">
              „Warum mein Projekt?" – Nicht weil Schreiben einfach ist. Sondern weil es das Einzige war,
              was irgendwann geholfen hat. Und weil ich glaube, dass es das für andere sein kann.
            </p>

            <div class="flex flex-wrap gap-3">
              @for (tag of placeholderTags; track tag.text) {
                <span class="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 bg-white border border-border rounded-full text-brown-muted">
                  <img [src]="tag.icon" alt="" class="w-3.5 h-3.5"/>{{ tag.text }}
                </span>
              }
            </div>
          </div>

        </div>
      </div>
    </section>
  `,
})
export class UeberMichComponent {
  placeholderTags = [
    { icon: '/img/icon-pencil.svg',    text: '[Studium / Beruf eintragen]' },
    { icon: '/img/icon-location.svg',  text: '[Ort eintragen]' },
    { icon: '/img/icon-graduation.svg',text: '[Qualifikation eintragen]' },
  ];
}
