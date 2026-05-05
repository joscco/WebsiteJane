import { Component, signal, computed, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { RevealDirective } from '../../directives/reveal.directive';
import { GalleryService } from '../../services/gallery.service';
import { GalleryItem, CATEGORY_STYLES } from '../../models/gallery-item.model';

@Component({
  selector: 'app-schreibraeume',
  standalone: true,
  imports: [CommonModule, RevealDirective, RouterLink],
  styles: [`
    .modal-overlay {
      position: fixed;
      inset: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
      background: rgba(61, 46, 34, 0.5);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    .modal-overlay.modal-visible {
      opacity: 1;
    }
    .modal-card {
      background: #fff;
      border-radius: 1rem;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
      max-width: 42rem;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      opacity: 0;
      transform: translateY(24px) scale(0.97);
      transition: opacity 0.35s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .modal-card.modal-visible {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  `],
  template: `
    <section id="galerie" class="py-24 bg-cream">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-10" appReveal>
          <span
            class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibräume</span>
          <h2 class="font-serif font-semibold text-brown mb-3" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Texte aus
            der Gemeinschaft</h2>
          <p class="text-brown-muted max-w-lg mx-auto text-sm leading-relaxed">
            Diese Website lebt vom Schreiben – und von den Menschen, die schreiben.
            Hier sind Texte von Teilnehmenden, die ihren Worten einen Raum geben wollten.
          </p>
        </div>

        @if (isDemo()) {
          <div class="bg-[#f5f0e0] border border-gold rounded-xl px-5 py-3 flex gap-3 items-start mb-6 text-sm"
               appReveal>
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
              <article
                class="gallery-card bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group cursor-pointer"
                [attr.data-category]="item.Kategorie"
                (click)="openDetail(item)">
                <div class="px-5 pt-5 pb-3 bg-cream-dark relative">
                  <span class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full"
                        [class]="getBadgeClass(item.Kategorie)">{{ item.Kategorie }}</span>
                  @if (item.Text) {
                    <p
                      class="mt-3 text-sm text-brown leading-relaxed italic line-clamp-4 whitespace-pre-line">{{ item.Text }}</p>
                  } @else {
                    <div class="mt-3 flex items-center justify-center py-4" aria-hidden="true">
                      <img src="/img/icon-star.svg" alt="" class="w-10 h-10 opacity-20"/>
                    </div>
                  }
                </div>
                <div class="p-5 flex flex-col flex-1 gap-2">
                  <h3 class="font-serif font-semibold text-brown text-base leading-snug">{{ item.Titel }}</h3>
                  <p class="text-xs text-brown-muted">von {{ item.Name }}{{ item.Datum ? ' · ' + item.Datum : '' }}</p>
                  <p class="text-sm text-brown-muted leading-relaxed flex-1 line-clamp-3">{{ item.Beschreibung }}</p>
                  @if (item.Tags) {
                    <div class="flex flex-wrap gap-1 pt-1">
                      @for (tag of item.Tags.split(','); track tag) {
                        <span
                          class="text-[0.68rem] px-2 py-0.5 bg-cream rounded-full text-brown-muted">{{ tag.trim() }}</span>
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
          <a routerLink="/mitmachen"
             class="inline-flex items-center gap-2 px-7 py-3 bg-terra text-white text-sm font-bold rounded-full hover:bg-terra-dark hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200">
            Eigenen Text einreichen <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5"
                                         style="filter: brightness(0) invert(1)"/>
          </a>
        </div>

      </div>
    </section>

    <!-- Detail-Modal -->
    @if (modalOpen()) {
      <div class="modal-overlay" [class.modal-visible]="modalVisible()" (click)="closeDetail()">
        <div class="modal-card" [class.modal-visible]="modalVisible()" (click)="$event.stopPropagation()">
          <div class="sticky top-0 bg-white rounded-t-2xl border-b border-border px-6 py-4 flex items-center justify-between z-10">
            <div class="flex items-center gap-3">
              <span class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full"
                    [class]="getBadgeClass(selectedItem()!.Kategorie)">{{ selectedItem()!.Kategorie }}</span>
              <h3 class="font-serif font-semibold text-brown text-lg">{{ selectedItem()!.Titel }}</h3>
            </div>
            <button (click)="closeDetail()"
                    class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-cream-dark transition-colors text-brown-muted"
                    aria-label="Schließen">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
          <div class="px-6 py-5">
            <p class="text-xs text-brown-muted mb-1">von {{ selectedItem()!.Name }}{{ selectedItem()!.Datum ? ' · ' + selectedItem()!.Datum : '' }}</p>
            @if (selectedItem()!.Beschreibung) {
              <p class="text-sm text-brown-muted leading-relaxed mb-6 italic">{{ selectedItem()!.Beschreibung }}</p>
            }
            @if (selectedItem()!.Text) {
              <div class="text-brown text-base leading-relaxed whitespace-pre-line">{{ selectedItem()!.Text }}</div>
            } @else {
              <p class="text-brown-muted text-sm italic">Kein Textinhalt vorhanden.</p>
            }
            @if (selectedItem()!.Tags) {
              <div class="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-border">
                @for (tag of selectedItem()!.Tags.split(','); track tag) {
                  <span class="text-[0.68rem] px-2.5 py-0.5 bg-cream rounded-full text-brown-muted">{{ tag.trim() }}</span>
                }
              </div>
            }
          </div>
        </div>
      </div>
    }
  `,
})
export class SchreibraeumeComponent implements OnInit, OnDestroy {
  private galleryService = inject(GalleryService);

  filters = ['alle', 'Poesie', 'Biografie', 'Briefe', 'Prosa'];
  activeFilter = signal('alle');
  loading = signal(true);
  allItems = signal<GalleryItem[]>([]);
  isDemo = signal(false);
  selectedItem = signal<GalleryItem | null>(null);
  modalOpen = signal(false);
  modalVisible = signal(false);
  private closeTimer?: ReturnType<typeof setTimeout>;

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

  ngOnDestroy(): void {
    clearTimeout(this.closeTimer);
  }

  setFilter(f: string): void { this.activeFilter.set(f); }

  openDetail(item: GalleryItem): void {
    this.selectedItem.set(item);
    this.modalOpen.set(true);
    this.modalVisible.set(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.modalVisible.set(true);
      });
    });
  }

  closeDetail(): void {
    this.modalVisible.set(false);
    this.closeTimer = setTimeout(() => {
      this.modalOpen.set(false);
      this.selectedItem.set(null);
    }, 300);
  }

  getBadgeClass(kategorie: string): string {
    return (CATEGORY_STYLES[kategorie] || CATEGORY_STYLES['Sonstiges']).badge;
  }
}

