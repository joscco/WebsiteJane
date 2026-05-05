import { Component, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RevealDirective } from '../../directives/reveal.directive';
import { FormService } from '../../services/form.service';

type StatusType = 'success' | 'error' | 'warn' | null;

@Component({
  selector: 'app-mitmachen',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  styles: [`
    .field-error input, .field-error select, .field-error textarea {
      border-color: #c06060 !important;
      background-color: #fdf0f0 !important;
    }
    .field-error input:focus, .field-error select:focus, .field-error textarea:focus {
      border-color: #a04040 !important;
      --tw-ring-color: rgba(160, 64, 64, 0.2) !important;
    }
  `],
  template: `
    <section id="mitmachen" class="py-24 bg-cream">
      <div class="max-w-5xl mx-auto px-6">

        <div class="text-center mb-14" appReveal>
          <span class="block text-[0.7rem] font-bold tracking-[0.14em] uppercase text-sage-dark mb-3">Schreibräume füllen</span>
          <h2 class="font-serif font-semibold text-brown mb-3" style="font-size: clamp(1.8rem, 3vw, 2.4rem)">Deinen Text einreichen</h2>
          <p class="text-brown-muted max-w-md mx-auto text-sm leading-relaxed">
            Diese Website lebt von den Texten der Menschen, die schreiben.
            Wenn du möchtest, dass dein Text hier erscheint, reiche ihn ein.
          </p>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-border overflow-hidden max-w-2xl mx-auto" appReveal>
          <div class="px-8 pt-7 pb-5 border-b border-border">
            <img src="/img/icon-star.svg" alt="" class="w-8 h-8 mb-2"/>
            <h3 class="font-serif font-semibold text-brown text-xl mb-1">Text einreichen</h3>
            <p class="text-brown-muted text-sm leading-relaxed">Alle Einreichungen werden gesichtet. Du bekommst eine Rückmeldung per Mail.</p>
          </div>

          <form class="p-8" [formGroup]="form" (ngSubmit)="onSubmit()" novalidate>
            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div [class.field-error]="isInvalid('name')">
                <label for="f-name" class="block text-xs font-bold text-brown mb-1.5">Name oder Pseudonym *</label>
                <input id="f-name" formControlName="name" type="text" autocomplete="name"
                       placeholder="Wie darf ich dich nennen?"
                       class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
                @if (isInvalid('name')) {
                  <p class="text-xs text-[#a04040] mt-1">Bitte gib einen Namen an.</p>
                }
              </div>
              <div [class.field-error]="isInvalid('email')">
                <label for="f-email" class="block text-xs font-bold text-brown mb-1.5">E-Mail * <span class="font-normal text-brown-muted">(für Rückmeldung)</span></label>
                <input id="f-email" formControlName="email" type="email" autocomplete="email"
                       placeholder="deine@email.de"
                       class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
                @if (hasError('email', 'required')) {
                  <p class="text-xs text-[#a04040] mt-1">Bitte gib deine E-Mail an.</p>
                } @else if (hasError('email', 'email')) {
                  <p class="text-xs text-[#a04040] mt-1">Das sieht nicht wie eine E-Mail aus.</p>
                }
              </div>
            </div>

            <div class="grid sm:grid-cols-2 gap-4 mb-4">
              <div [class.field-error]="isInvalid('kategorie')">
                <label for="f-kategorie" class="block text-xs font-bold text-brown mb-1.5">Textform *</label>
                <select id="f-kategorie" formControlName="kategorie"
                        class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
                  <option value="">Bitte wählen …</option>
                  @for (k of kategorien; track k) {
                    <option [value]="k">{{ k }}</option>
                  }
                </select>
                @if (isInvalid('kategorie')) {
                  <p class="text-xs text-[#a04040] mt-1">Bitte wähle eine Textform.</p>
                }
              </div>
              <div [class.field-error]="isInvalid('titel')">
                <label for="f-titel" class="block text-xs font-bold text-brown mb-1.5">Titel *</label>
                <input id="f-titel" formControlName="titel" type="text"
                       placeholder="Wie heißt dein Text?"
                       class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
                @if (isInvalid('titel')) {
                  <p class="text-xs text-[#a04040] mt-1">Bitte gib einen Titel an.</p>
                }
              </div>
            </div>

            <div class="mb-4" [class.field-error]="isInvalid('beschreibung')">
              <label for="f-beschreibung" class="block text-xs font-bold text-brown mb-1.5">
                Kurzbeschreibung oder Kontext * <span class="font-normal text-brown-muted">(erscheint in den Schreibräumen)</span>
              </label>
              <textarea id="f-beschreibung" formControlName="beschreibung" rows="3"
                        placeholder="Wie ist der Text entstanden? Was steckt dahinter?"
                        class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all resize-none"></textarea>
              @if (isInvalid('beschreibung')) {
                <p class="text-xs text-[#a04040] mt-1">Bitte gib eine Kurzbeschreibung an.</p>
              }
            </div>

            <div class="mb-4" [class.field-error]="isInvalid('text')">
              <label for="f-text" class="block text-xs font-bold text-brown mb-1.5">
                Dein Text * <span class="font-normal text-brown-muted">(wird auf der Website veröffentlicht)</span>
              </label>
              <textarea id="f-text" formControlName="text" rows="10"
                        placeholder="Schreib oder füge deinen Text hier ein …"
                        class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all resize-y"></textarea>
              @if (isInvalid('text')) {
                <p class="text-xs text-[#a04040] mt-1">Bitte gib deinen Text ein.</p>
              }
            </div>

            <div class="mb-6">
              <label for="f-tags" class="block text-xs font-bold text-brown mb-1.5">Schlagwörter <span class="font-normal text-brown-muted">(optional, kommagetrennt)</span></label>
              <input id="f-tags" formControlName="tags" type="text"
                     placeholder="z.B. verlust, hoffnung, wandel"
                     class="w-full px-4 py-2.5 border border-border rounded-xl text-sm bg-cream focus:outline-none focus:border-sage focus:ring-2 focus:ring-sage/20 transition-all">
            </div>

            <button type="submit" [disabled]="submitting()"
                    class="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-terra text-white font-bold text-sm rounded-full hover:bg-terra-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200">
              {{ submitting() ? 'Wird gesendet …' : 'Einreichen' }}
              <img src="/img/icon-star.svg" alt="" class="w-3.5 h-3.5" style="filter: brightness(0) invert(1)"/>
            </button>

            @if (statusMsg()) {
              <div class="mt-4 p-4 rounded-xl text-sm" [class]="statusClass()">{{ statusMsg() }}</div>
            }

            <p class="mt-4 text-xs text-brown-muted text-center">* Pflichtfelder · Deine E-Mail wird nicht veröffentlicht</p>
          </form>
        </div>

      </div>
    </section>
  `,
})
export class MitmachenComponent {
  private fb = inject(FormBuilder);
  private formService = inject(FormService);

  submitting = signal(false);
  statusMsg = signal<string | null>(null);
  statusType = signal<StatusType>(null);
  submitted = signal(false);

  kategorien = ['Poesie', 'Biografie', 'Briefe', 'Prosa', 'Sonstiges'];

  form = this.fb.group({
    name:         ['', Validators.required],
    email:        ['', [Validators.required, Validators.email]],
    kategorie:    ['', Validators.required],
    titel:        ['', Validators.required],
    beschreibung: ['', Validators.required],
    text:         ['', Validators.required],
    tags:         [''],
  });

  isInvalid(fieldName: string): boolean {
    const ctrl = this.form.get(fieldName);
    return !!(this.submitted() && ctrl && ctrl.invalid);
  }

  hasError(fieldName: string, errorCode: string): boolean {
    const ctrl = this.form.get(fieldName);
    return !!(this.submitted() && ctrl && ctrl.hasError(errorCode));
  }

  statusClass(): string {
    const map: Record<string, string> = {
      success: 'bg-sage-light border border-sage text-sage-dark',
      error:   'bg-[#fdf0f0] border border-[#d0a0a0] text-[#804040]',
      warn:    'bg-[#f5f0e0] border border-gold text-[#7a6020]',
    };
    return map[this.statusType() ?? ''] ?? map['warn'];
  }

  async onSubmit(): Promise<void> {
    this.submitted.set(true);
    if (this.form.invalid) {
      this.setStatus('error', 'Bitte füll alle Pflichtfelder aus (*).');
      return;
    }
    if (!this.formService.isConfigured) {
      this.setStatus('warn', 'Das Formular ist noch nicht mit Google verbunden (FORM_ENDPOINT in config.model.ts fehlt). Bitte folge der SETUP.md-Anleitung.');
      return;
    }
    this.submitting.set(true);
    const name = this.form.value.name!;
    try {
      await this.formService.submit(this.form.value as any);
      this.form.reset();
      this.submitted.set(false);
      this.setStatus('success', `Danke, ${name}! ✦ Deine Einreichung ist angekommen.`);
      setTimeout(() => this.statusMsg.set(null), 8000);
    } catch {
      this.setStatus('error', 'Beim Senden ist ein Fehler aufgetreten. Bitte versuch es erneut.');
    } finally {
      this.submitting.set(false);
    }
  }

  private setStatus(type: StatusType, msg: string): void {
    this.statusType.set(type);
    this.statusMsg.set(msg);
  }
}

