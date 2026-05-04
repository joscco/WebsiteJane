import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { GalleryService } from '../../services/gallery.service';
import { GalleryItem, CATEGORY_STYLES } from '../../models/gallery-item.model';

@Component({
  selector: 'app-schreibraeume',
  standalone: true,
  imports: [CommonModule, RevealDirective, RouterLink],
  template: `
    <section id="galerie" class="py-24 bg-cream">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-10" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibräume</span>
          <h2 class="font-serif font-semibold text-brown mb-3" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Texte aus der Gemeinschaft</h2>
          <p class="text-brown-muted max-w-lg mx-auto text-sm leading-relaxed">
            Diese Website lebt vom Schreiben – und von den Menschen, die schreiben.
            Hier sind Texte von Teilnehmenden, die ihren Worten einen Raum geben wollten.
          </p>
        </div>

        @if (isDemo()) {
          <div class="bg-[#f5f0e0] border border-gold rounded-xl px-5 py-3 flex gap-3 items-start mb-6 text-sm" appReveal>
            <img src="/img/icon-info.svg" alt="" class="w-5 h-5 shrink-0 mt-0.5"/>
            <p class="text-[#7a6020] leading-relaxed">
              <strong>Demo-Modus:</strong> Diese Schreibräume zeigen Beispieltexte.
              Trage die echte <code class="bg-white/70 px-1 rounded">SHEET_ID</code> in
              <code class="bg-white/70 px-1 rounded">config.model.ts</code> ein, um echte Einreichungen zu laden.
            </p>
          </div>
        }

        <!-- Filter-Buttons -->
        <div class="flex flex-wrap gap-2 justify-center mb-8" appReveal>
          @for (f of filters; track f) {
            <button
              (click)="setFilter(f)"
              class="px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              [class.bg-sage]="activeFilter() === f"
              [class.text-white]="activeFilter() === f"
              [class.bg-cream]="activeFilter() !== f"
              [class.text-brown-muted]="activeFilter() !== f"
              [class.hover:bg-white]="activeFilter() !== f">
              {{ f === 'alle' ? 'Alle' : f }}
            </button>
          }
        </div>

        <!-- Loading -->
        @if (loading()) {
          <div class="col-span-full flex flex-col items-center gap-4 py-20 text-brown-muted">
            <div class="w-10 h-10 border-2 border-sage border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm">Texte werden geladen …</p>
          </div>
        }

        <!-- Grid -->
        @if (!loading()) {
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of filteredItems(); track item.Titel) {
              <article class="gallery-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
                       [attr.data-category]="item.Kategorie">
                <div class="px-5 pt-5 pb-3 bg-cream-dark relative">
                  <span class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full"
                        [class]="getBadgeClass(item.Kategorie)">{{ item.Kategorie }}</span>
                  @if (item.Text) {
                    <p class="mt-3 text-sm text-brown leading-relaxed italic line-clamp-4 whitespace-pre-line">{{ item.Text }}</p>
                  } @else {
                    <div class="mt-3 flex items-center justify-center py-4" aria-hidden="true">
                      <img src="/img/icon-star.svg" alt="" class="w-10 h-10 opacity-20"/>
                    </div>
                  }
                </div>
                <div class="p-5 flex flex-col flex-1 gap-2">
                  <h3 class="font-serif font-semibold text-brown text-base leading-snug">{{ item.Titel }}</h3>
                  <p class="text-xs text-brown-muted">von {{ item.Autor }}{{ item.Datum ? ' · ' + item.Datum : '' }}</p>
                  <p class="text-sm text-brown-muted leading-relaxed flex-1 line-clamp-3">{{ item.Beschreibung }}</p>
                  @if (item.Tags) {
                    <div class="flex flex-wrap gap-1 pt-1">
                      @for (tag of item.Tags.split(','); track tag) {
                        <span class="text-[0.68rem] px-2 py-0.5 bg-cream rounded-full text-brown-muted">{{ tag.trim() }}</span>
                      }
                    </div>
                  }
                </div>
              </article>
            } @empty {
              <div class="col-span-full py-16 text-center text-brown-muted">
                <img src="/img/icon-star.svg" alt="" class="w-10 h-10 mx-auto mb-4 opacity-40"/>
                <p class="text-sm">Noch keine Einträge in dieser Kategorie.</p>
              </div>
            }
          </div>
        }

        <div class="text-center mt-12" appReveal>
          <p class="text-brown-muted text-sm mb-5">Möchtest du deinen Text einreichen?</p>
          <a routerLink="/mitmachen" class="inline-flex items-center gap-2 px-7 py-3 bg-terra text-white text-sm font-bold rounded-full hover:bg-terra-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            Eigenen Text einreichen <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5" style="filter: brightness(0) invert(1)"/>
          </a>
        </div>

      </div>
    </section>
  `,
})
export class SchreibraeumeComponent implements OnInit {
  private galleryService = inject(GalleryService);

  filters = ['alle', 'Poesie', 'Biografie', 'Briefe', 'Prosa'];
  activeFilter = signal('alle');
  loading = signal(true);
  allItems = signal<GalleryItem[]>([]);
  isDemo = signal(false);

  filteredItems = computed(() => {
    const f = this.activeFilter();
    return f === 'alle' ? this.allItems() : this.allItems().filter(i => i.Kategorie === f);
  });

  ngOnInit(): void {
    this.isDemo.set(this.galleryService.isDemo);
    this.galleryService.getItems().subscribe(items => {
      this.allItems.set(items);
      this.loading.set(false);
    });
  }

  setFilter(f: string): void { this.activeFilter.set(f); }

  getBadgeClass(kategorie: string): string {
    return (CATEGORY_STYLES[kategorie] || CATEGORY_STYLES['Sonstiges']).badge;
  }
}

