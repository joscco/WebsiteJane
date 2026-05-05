import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevealDirective } from '../../directives/reveal.directive';
import { ImpulseService } from '../../services/impulse.service';
import { ImpulseItem, IMPULSE_TABS } from '../../models/impulse-item.model';

@Component({
  selector: 'app-schreibimpulse',
  standalone: true,
  imports: [CommonModule, RevealDirective],
  template: `
    <section id="impulse" class="py-24 bg-cream-dark">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-10" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibimpulse</span>
          <h2 class="font-serif font-semibold text-brown mb-3" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Womit möchtest du beginnen?</h2>
          <p class="text-brown-muted max-w-lg mx-auto text-sm leading-relaxed">Wähle eine Form und such dir einen Impuls aus. 15 Minuten täglich genügen – kein Vorwissen nötig.</p>
        </div>

        <!-- Tabs -->
        <div class="flex flex-wrap gap-2 justify-center mb-10" appReveal role="tablist">
          @for (tab of tabs; track tab.key) {
            <button
              (click)="activeTab.set(tab.key)"
              class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200"
              [class.bg-sage]="activeTab() === tab.key"
              [class.text-white]="activeTab() === tab.key"
              [class.bg-cream-dark]="activeTab() !== tab.key"
              [class.text-brown-muted]="activeTab() !== tab.key"
              role="tab"
              [attr.aria-selected]="activeTab() === tab.key">
              <img [src]="tab.icon" alt="" class="w-4 h-4"
                   [style.filter]="activeTab() === tab.key ? 'brightness(0) invert(1)' : ''"/>
              {{ tab.label }}
            </button>
          }
        </div>

        <!-- Loading -->
        @if (loading()) {
          <div class="flex flex-col items-center gap-4 py-20 text-brown-muted">
            <div class="w-10 h-10 border-2 border-sage border-t-transparent rounded-full animate-spin"></div>
            <p class="text-sm">Impulse werden geladen …</p>
          </div>
        }

        <!-- Panels -->
        @if (!loading()) {
          @for (tab of tabs; track tab.key) {
            @if (activeTab() === tab.key) {
              <div class="grid md:grid-cols-3 gap-5" role="tabpanel">
                @for (card of cardsForTab(tab.key); track card.Titel) {
                  <article class="bg-white rounded-2xl p-6 border hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col gap-3 relative"
                           [class]="card._today ? tab.borderClass + ' ' + tab.borderClass.replace('border-', 'bg-').replace(']', '/30]') : 'border-border hover:' + tab.borderClass">
                    @if (card._today) {
                      <div class="absolute top-4 right-4 flex items-center gap-1 text-gold text-xs font-bold" aria-label="Impuls des Tages">
                        <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5"/> Heute
                      </div>
                    }
                    <div class="text-3xl font-serif font-bold leading-none" [class]="tab.numClass">{{ card._nr }}</div>
                    <h3 class="font-serif font-semibold text-brown text-base">{{ card.Titel }}</h3>
                    <p class="text-brown-muted text-sm leading-relaxed flex-1">{{ card.Beschreibung }}</p>
                    <span class="inline-block self-start text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full" [class]="tab.tagClass">{{ card.Tag }}</span>
                  </article>
                } @empty {
                  <div class="col-span-full py-16 text-center text-brown-muted">
                    <img src="/img/icon-star.svg" alt="" class="w-10 h-10 mx-auto mb-4 opacity-40"/>
                    <p class="text-sm">Noch keine Impulse in dieser Kategorie.</p>
                  </div>
                }
              </div>
            }
          }
        }

        <p class="text-center text-xs text-brown-muted mt-8 flex items-center justify-center gap-1.5" appReveal>
          <img src="/img/icon-star.svg" alt="" class="w-3 h-3"/> markiert den Impuls des Tages – täglich wechselnd
        </p>

      </div>
    </section>
  `,
})
export class SchreibimpulseComponent implements OnInit {
  private impulseService = inject(ImpulseService);

  tabs = IMPULSE_TABS;
  activeTab = signal('Brief');
  loading = signal(true);
  allImpulses = signal<ImpulseItem[]>([]);

  ngOnInit(): void {
    this.impulseService.getItems().subscribe(items => {
      this.allImpulses.set(items);
      this.loading.set(false);
    });
  }

  cardsForTab(kategorie: string): (ImpulseItem & { _nr: string; _today: boolean })[] {
    const items = this.allImpulses().filter(i => (i.Kategorie || '').trim().toLowerCase() === kategorie.toLowerCase());
    const todayIndex = this.todayIndex(items.length, kategorie);
    return items.map((item, i) => ({
      ...item,
      _nr: String(i + 1).padStart(2, '0'),
      _today: i === todayIndex,
    }));
  }

  private todayIndex(count: number, kategorie: string): number {
    if (count === 0) return -1;
    const now = new Date();
    const dayOfYear = Math.floor((now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / 86400000);
    let hash = 0;
    for (let i = 0; i < kategorie.length; i++) {
      hash = ((hash << 5) - hash) + kategorie.charCodeAt(i);
    }
    return (dayOfYear + hash) % count;
  }
}