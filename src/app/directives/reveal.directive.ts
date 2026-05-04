import { Directive, ElementRef, OnInit, OnDestroy, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
  host: { 'class': 'reveal' },
})
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    if (!('IntersectionObserver' in window)) {
      this.el.nativeElement.classList.add('visible');
      return;
    }
    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            this.observer?.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}

