import {Component} from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="bg-brown text-[#c8b8a8] py-8">
      <div class="max-w-5xl mx-auto px-6 text-center">
        <p class="text-[#7a6855] text-xs">&copy; 2026 Jane Spiekermann &middot; Schreiben in Krise &amp; Krankheit</p>
      </div>
    </footer>
  `,
})
export class FooterComponent {
}
