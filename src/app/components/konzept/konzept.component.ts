import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-konzept',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="konzept" class="py-24 bg-cream-dark">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-14" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Konzept</span>
          <h2 class="font-serif font-semibold text-brown mb-4" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Worum es hier geht</h2>
          <p class="text-brown-muted max-w-xl mx-auto text-sm leading-relaxed">
            Schreiben ist mehr als Worte auf Papier. Es kann ein Werkzeug sein – um das Chaos zu ordnen,
            Gefühle greifbar zu machen und sich selbst neu zu begegnen.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          @for (card of cards; track card.title; let i = $index) {
            <div class="bg-white rounded-2xl p-8 shadow-sm border border-border flex flex-col gap-4" appReveal
                 [style.transition-delay]="i * 100 + 'ms'">
              <div class="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                   [class]="card.iconBg" aria-hidden="true">{{ card.icon }}</div>
              <h3 class="font-serif font-semibold text-brown text-lg">{{ card.title }}</h3>
              @for (p of card.paragraphs; track p) {
                <p class="text-brown-muted text-sm leading-relaxed" [innerHTML]="p"></p>
              }
            </div>
          }
        </div>

        <div class="bg-sage-light/60 border border-sage/30 rounded-2xl px-8 py-7 max-w-2xl mx-auto text-center" appReveal>
          <p class="font-serif text-brown text-lg leading-relaxed">
            „Es geht nicht darum, schön zu schreiben. Es geht darum, ehrlich zu schreiben."
          </p>
          <p class="text-brown-muted text-xs mt-3 tracking-wide uppercase">Grundsatz dieses Projekts</p>
        </div>

      </div>
    </section>
  `,
})
export class KonzeptComponent {
  cards = [
    {
      icon: '✍️',
      iconBg: 'bg-sage-light',
      title: 'Was ist „heilendes Schreiben"?',
      paragraphs: [
        'Heilendes Schreiben bedeutet nicht, dass Schreiben heilt. Es bedeutet, dass der Schreibprozess etwas in Bewegung bringen kann: Gedanken, die sich festgefahren haben. Gefühle, die keinen Ausdruck finden. Erlebnisse, die noch keinen Ort haben.',
        'Der Begriff ist ein Hinweis auf eine Qualität des Schreibens – nicht auf ein Versprechen.',
      ],
    },
    {
      icon: '📔',
      iconBg: 'bg-terra-light',
      title: 'Kein Tagebuch. Keine Therapie.',
      paragraphs: [
        'Ein Tagebuch hält fest. Therapie begleitet und behandelt. Das Schreiben hier ist etwas anderes: Es folgt einer Struktur, einem Impuls – und lädt ein, nicht zu berichten, sondern zu erkunden.',
        'Es ersetzt keine professionelle Begleitung, kann aber neben ihr – oder unabhängig – einen eigenen Raum öffnen.',
      ],
    },
    {
      icon: '🔑',
      iconBg: 'bg-[#f0eaf8]',
      title: 'Verarbeitung. Struktur. Selbstwirksamkeit.',
      paragraphs: [
        'Aus psychologischer Sicht geht es nicht um Katharsis oder Heilung per se – sondern um drei konkrete Wirkungen: das Erlebte in Worte fassen (<em>Verarbeitung</em>), Gedanken ordnen (<em>Strukturierung</em>) und spüren, dass man handlungsfähig ist (<em>Selbstwirksamkeit</em>).',
      ],
    },
  ];
}

