import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';
import { AppModule } from '../app.module';
import { BirdService } from '../bird.service';
import { Bird } from '../models/bird.interface';
import { BirdListComponent } from './bird-list.component';

describe('BirdListComponent', () => {
  let component: BirdListComponent;
  let fixture: ComponentFixture<BirdListComponent>;
  let getBirds: Mock<BirdService['getBirds']>;

  const birds: Bird[] = [
    { id: 1, name: 'Blackbird', shortname: 'blackbird', count: 0 },
    { id: 2, name: 'Blue tit', shortname: 'blue-tit', count: 0 }
  ];

  beforeEach(async () => {
    getBirds = vi.fn<BirdService['getBirds']>();
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: BirdService, useValue: { getBirds } }]
    });
    await TestBed.compileComponents();
  });

  function createComponent(response: Observable<Bird[]> = of(birds.map((bird) => ({ ...bird })))): void {
    getBirds.mockReturnValue(response);
    fixture = TestBed.createComponent(BirdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('loads and renders every bird returned by the service', () => {
    createComponent();

    expect(component.isLoading).toBe(false);
    expect(fixture.nativeElement.querySelectorAll('ul.row.col-lg-9 > li').length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Blackbird');
    expect(fixture.nativeElement.textContent).toContain('Blue tit');
  });

  it('updates counts through the buttons and prevents negative counts', () => {
    createComponent();

    const element: HTMLElement = fixture.nativeElement;
    const countButtons = element.querySelectorAll<HTMLButtonElement>('li button.btn-outline-primary');
    const addButton = countButtons[0];
    const removeButton = countButtons[1];
    const count = fixture.nativeElement.querySelector('output') as HTMLOutputElement;

    removeButton.click();
    fixture.detectChanges();
    expect(count.textContent?.trim()).toBe('0');

    addButton.click();
    fixture.detectChanges();
    expect(count.textContent?.trim()).toBe('1');
    expect(component.topBirdCount).toBe(1);

    removeButton.click();
    fixture.detectChanges();
    expect(count.textContent?.trim()).toBe('0');
  });

  it('calculates graph bars and heatmap colors safely for zero and relative counts', () => {
    createComponent();

    expect(component.getSliderValue(0)).toBe(0);
    expect(component.getHeatMapColor(0)).toBe('hsl(240 85% 50%)');

    component.addBird(component.birds[0]);
    component.addBird(component.birds[0]);
    component.addBird(component.birds[1]);

    expect(component.getSliderValue(1)).toBe(50);
    expect(component.getHeatMapColor(2)).toBe('hsl(0 85% 50%)');
  });

  it('shows an empty state when no birds are returned', () => {
    createComponent(of([]));

    expect(fixture.nativeElement.textContent).toContain('No birds are available.');
    expect(fixture.nativeElement.querySelectorAll('ul.row.col-lg-9 > li').length).toBe(0);
  });

  it('displays a recoverable error when loading bird data fails', () => {
    createComponent(throwError(() => new Error('Request failed')));

    expect(component.loadError).toBe(true);
    expect(fixture.nativeElement.querySelector('[role="alert"]')?.textContent)
      .toContain('Bird information could not be loaded.');
  });

  it('plays the selected bird song through its audio element', () => {
    createComponent();

    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement;
    vi.spyOn(audio, 'play').mockResolvedValue(undefined);

    component.playBirdsong(audio);

    expect(audio.play).toHaveBeenCalledTimes(1);
  });

  it('pauses a bird song that is already playing', () => {
    createComponent();

    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement;
    Object.defineProperty(audio, 'paused', { configurable: true, value: false });
    vi.spyOn(audio, 'pause').mockImplementation(() => undefined);

    component.playBirdsong(audio);

    expect(audio.pause).toHaveBeenCalledTimes(1);
  });

  it('announces an audio playback error', async () => {
    createComponent();

    const audio = fixture.nativeElement.querySelector('audio') as HTMLAudioElement;
    vi.spyOn(audio, 'play').mockRejectedValue(new Error('Playback failed'));

    await component.playBirdsong(audio);
    fixture.detectChanges();

    expect(component.songPlaybackError).toBe('Birdsong playback is unavailable.');
  });
});
