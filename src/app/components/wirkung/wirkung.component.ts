import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-wirkung',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="wirkung" class="py-24 bg-cream-dark">
      <div class="max-w-5xl mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-16 items-center">

          <div appReveal>
            <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-4">Wissenschaft &amp; Wirkung</span>
            <h2 class="font-serif font-semibold text-brown mb-5" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Wirkt Schreiben wirklich?</h2>
            <p class="text-brown-muted leading-relaxed mb-4">
              Ja – und das nicht nur gefühlt. Seit den 1980er Jahren untersucht der Psychologe James Pennebaker,
              was passiert, wenn Menschen regelmäßig über belastende Erlebnisse schreiben. Die Ergebnisse:
              weniger Krankheitssymptome, stabileres Wohlbefinden, mehr Gefühl von Kontrolle.
            </p>
            <p class="text-brown-muted leading-relaxed mb-4">
              Neuere Studien zeigen ähnliche Effekte bei Menschen mit chronischer Erkrankung, nach Traumata
              und in akuten Krisen. Das Schreiben wirkt dabei vor allem dann, wenn es strukturiert ist –
              also nicht einfach „drauflosschreiben", sondern einem begleiteten Prozess folgt.
            </p>
            <p class="text-brown-muted leading-relaxed">
              Wichtig: Diese Erkenntnisse machen Schreiben nicht zur Therapie. Aber sie zeigen,
              dass es mehr ist als ein netter Zeitvertreib.
            </p>
          </div>

          <div class="flex flex-col gap-5" appReveal style="transition-delay: 120ms">
            @for (point of points; track point.title; let i = $index) {
              <div class="bg-white rounded-2xl p-6 shadow-sm border border-border">
                <div class="flex items-start gap-4">
                  <div class="w-10 h-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm"
                       [class]="point.numBg">{{ (i + 1).toString().padStart(2, '0') }}</div>
                  <div>
                    <h4 class="font-serif font-semibold text-brown mb-1">{{ point.title }}</h4>
                    <p class="text-brown-muted text-sm leading-relaxed">{{ point.text }}</p>
                  </div>
                </div>
              </div>
            }
          </div>

        </div>
      </div>
    </section>
  `,
})
export class WirkungComponent {
  points = [
    {
      numBg: 'bg-sage-light text-sage-dark',
      title: 'Expressives Schreiben',
      text: 'Pennebakers Forschung zeigt: Das strukturierte Schreiben über belastende Erfahrungen kann die psychische und körperliche Gesundheit nachweislich verbessern.',
    },
    {
      numBg: 'bg-terra-light text-terra-dark',
      title: 'Schreiben bei Krankheit',
      text: 'Studien mit Krebspatient:innen und chronisch Erkrankten deuten auf reduzierte Angst, besseres Coping und ein stärkeres Gefühl von Kontrolle über die eigene Geschichte hin.',
    },
    {
      numBg: 'bg-[#f0eaf8] text-[#6050a0]',
      title: 'Selbstnarrativ & Identität',
      text: 'Wer die eigene Geschichte erzählt – auch bruchstückhaft – schreibt sich selbst als handelndes Subjekt. Das kann in Krisen einen bedeutsamen Unterschied machen.',
    },
  ];
}

