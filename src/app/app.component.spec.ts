import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { BirdService } from './bird.service';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{
        provide: BirdService,
        useValue: { getBirds: () => of([{ id: 1, name: 'Blackbird', shortname: 'blackbird', count: 0 }]) }
      }]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
  });

  it('renders the garden bird count and copyright year', () => {
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('h1')?.textContent).toContain('Garden Bird Count');
    expect(element.querySelector('footer')?.textContent).toContain(String(new Date().getFullYear()));
  });

  it('toggles the information panel and its expanded state', () => {
    const element: HTMLElement = fixture.nativeElement;
    const button = element.querySelector('header button') as HTMLButtonElement;
    const info = element.querySelector('#collapseExample') as HTMLElement;

    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(info.textContent).toContain('RSPB Big Garden Birdwatch');

    button.click();
    fixture.detectChanges();

    expect(button.getAttribute('aria-expanded')).toBe('true');
    expect(button.getAttribute('aria-label')).toBe('Hide app information');
  });
});
