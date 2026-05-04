import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [RevealDirective, RouterLink],
  template: `
    <section class="min-h-[92vh] grid md:grid-cols-2 items-center gap-10 px-[7%] pt-12 pb-8 bg-cream relative overflow-hidden">
      <div appReveal>
        <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-4">Kreativität als Weg durch Krankheit und Krise</span>
        <h1 class="font-serif font-bold text-brown leading-tight mb-6" style="font-size: clamp(2.2rem, 4.5vw, 3.6rem)">
          Schreiben,<br>wenn die Worte<br><em class="text-terra not-italic">fehlen.</em>
        </h1>
        <p class="text-brown-muted text-md leading-relaxed mb-8 max-w-lg">
          Krankheit, Verlust, Umbruch – manchmal fehlt es an Worten für das, was uns innerlich bewegt.
          Das Schreiben kann ein Weg sein, wenn Gefühle zu groß werden, um sie einfach zu tragen:
          nicht als Therapie, sondern als Zugang zu sich selbst.
        </p>
        <div class="flex flex-wrap gap-3">
          <a routerLink="/konzept" class="inline-flex items-center gap-2 px-7 py-3 bg-sage text-white text-sm font-bold rounded-full hover:bg-sage-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            Mehr erfahren <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5" style="filter: brightness(0) invert(1)"/>
          </a>
          <a routerLink="/angebote" class="inline-flex items-center px-7 py-3 bg-transparent text-brown text-sm font-bold rounded-full border border-border hover:bg-cream-dark hover:border-terra hover:-translate-y-0.5 transition-all duration-200">
            Angebote entdecken
          </a>
        </div>
      </div>

      <div class="flex justify-center items-end" aria-hidden="true" appReveal>
        <img src="/img/hero-illustration.svg" alt="" class="w-full max-w-[380px] drop-shadow-xl"/>
      </div>
    </section>
  `,
})
export class HeroComponent {}
