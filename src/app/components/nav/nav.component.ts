import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      id="site-header"
      class="sticky top-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-border transition-shadow duration-300"
      [class.shadow-sm]="scrolled()">

      <nav class="max-w-5xl mx-auto flex items-center justify-between gap-4 px-6 py-4" aria-label="Hauptnavigation">

        <a routerLink="/" class="flex items-center gap-2.5 font-serif font-bold text-brown text-lg hover:text-terra transition-colors" aria-label="Zur Startseite">
          <img src="/img/nav-logo.svg" alt="" class="w-8 h-8 shrink-0" aria-hidden="true"/>
          <span>Krise & Kreativität</span>
        </a>

        <ul class="hidden md:flex items-center gap-1 text-sm font-semibold">
          @for (link of navLinks; track link.path) {
            <li>
              <a [routerLink]="link.path"
                 routerLinkActive="text-sage-dark"
                 [routerLinkActiveOptions]="{ exact: link.path === '/' }"
                 [class]="link.cta
                   ? 'ml-2 px-5 py-1.5 bg-sage text-white rounded-full hover:bg-sage-dark transition-colors'
                   : 'px-3.5 py-1.5 rounded-full text-brown hover:bg-sage-light hover:text-sage-dark transition-colors'">
                {{ link.label }}
              </a>
            </li>
          }
        </ul>

        <button
          (click)="toggleMenu()"
          class="md:hidden flex flex-col gap-[5px] p-1 cursor-pointer"
          [attr.aria-label]="menuOpen() ? 'Menü schließen' : 'Menü öffnen'"
          [attr.aria-expanded]="menuOpen()">
          <span class="block w-6 h-0.5 bg-brown rounded transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-brown rounded transition-all duration-300"></span>
          <span class="block w-6 h-0.5 bg-brown rounded transition-all duration-300"></span>
        </button>
      </nav>

      @if (menuOpen()) {
        <div class="md:hidden border-t border-border bg-white">
          <ul class="flex flex-col py-2">
            @for (link of navLinks; track link.path) {
              <li>
                <a [routerLink]="link.path"
                   (click)="closeMenu()"
                   class="block px-6 py-3 text-sm font-semibold text-brown hover:bg-sage-light hover:text-sage-dark transition-colors">
                  {{ link.label }}
                </a>
              </li>
            }
          </ul>
        </div>
      }
    </header>
  `,
})
export class NavComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

navLinks = [
    { path: '/konzept',       label: 'Konzept',       cta: false },
    { path: '/fuer-wen',      label: 'Für wen?',      cta: false },
    { path: '/wirkung',       label: 'Wirkung',       cta: false },
    { path: '/schreibraeume', label: 'Schreibräume',  cta: false },
    { path: '/impulse',       label: 'Impulse',       cta: false },
    { path: '/angebote',      label: 'Angebote',      cta: false },
    { path: '/ueber-mich',    label: 'Über mich',     cta: false },
    { path: '/kontakt',       label: 'Kontakt',        cta: true  },
  ];

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }

  @HostListener('window:scroll')
  onScroll(): void { this.scrolled.set(window.scrollY > 8); }
}
