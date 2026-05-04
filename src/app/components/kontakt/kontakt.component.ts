import { Component } from '@angular/core';
import { RevealDirective } from '../../directives/reveal.directive';

@Component({
  selector: 'app-kontakt',
  standalone: true,
  imports: [RevealDirective],
  template: `
    <section id="kontakt" class="py-24 bg-cream-dark">
      <div class="max-w-4xl mx-auto px-6">

        <div class="text-center mb-12" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Kontakt &amp; Einstieg</span>
          <h2 class="font-serif font-semibold text-brown mb-4" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Nächste Schritte</h2>
          <p class="text-brown-muted leading-relaxed max-w-lg mx-auto">
            Du hast Fragen? Du möchtest ein Angebot buchen, dich für den Newsletter anmelden oder einfach Hallo sagen?
          </p>
        </div>

        <div class="grid sm:grid-cols-3 gap-5" appReveal>

          <a href="mailto:hallo@jane-spiekermann.de"
             class="flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center">
            <div class="w-12 h-12 bg-sage-light rounded-full flex items-center justify-center group-hover:bg-sage transition-colors duration-300" aria-hidden="true">
              <img src="/img/icon-email.svg" alt="" class="w-5 h-5"/>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-brown-muted mb-1">E-Mail</p>
              <p class="font-semibold text-brown text-sm group-hover:text-terra transition-colors">hallo&#64;jane-spiekermann.de</p>
              <p class="text-xs text-brown-muted mt-1">Fragen, Anfragen, Hallo</p>
            </div>
          </a>

          <a href="#"
             class="flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center">
            <div class="w-12 h-12 bg-[#f5f0e0] rounded-full flex items-center justify-center group-hover:bg-gold/60 transition-colors duration-300" aria-hidden="true">
              <img src="/img/icon-newsletter.svg" alt="" class="w-5 h-5"/>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-brown-muted mb-1">Newsletter</p>
              <p class="font-semibold text-brown text-sm group-hover:text-terra transition-colors">Wöchentliche Schreibimpulse</p>
              <p class="text-xs text-brown-muted mt-1">Kostenlos &amp; jederzeit kündbar</p>
            </div>
          </a>

          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             class="flex flex-col items-center gap-3 bg-white rounded-2xl p-8 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group text-center">
            <div class="w-12 h-12 bg-terra-light rounded-full flex items-center justify-center group-hover:bg-terra transition-colors duration-300" aria-hidden="true">
              <img src="/img/icon-instagram.svg" alt="" class="w-5 h-5"/>
            </div>
            <div>
              <p class="text-xs font-bold uppercase tracking-wider text-brown-muted mb-1">Instagram</p>
              <p class="font-semibold text-brown text-sm group-hover:text-terra transition-colors">&#64;jane.schreibt</p>
              <p class="text-xs text-brown-muted mt-1">Impulse &amp; Einblicke</p>
            </div>
          </a>

        </div>
      </div>
    </section>
  `,
})
export class KontaktComponent {}
