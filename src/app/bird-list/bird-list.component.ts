import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { BirdService } from '../bird.service';
import { Bird } from '../models/bird.interface';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.scss'],
  standalone: false
})
export class BirdListComponent implements OnInit {
  private readonly birdService = inject(BirdService);
  private readonly changeDetector = inject(ChangeDetectorRef);

  birds: Bird[] = [];
  faMinus: IconDefinition = faMinus;
  faPlus: IconDefinition = faPlus;
  topBirdCount = 0;
  isLoading = true;
  loadError = false;
  songPlaybackError: string | null = null;

  ngOnInit(): void {
    this.birdService.getBirds().subscribe({
      next: (birds: Bird[]) => {
        this.birds = birds;
        this.isLoading = false;
        this.calculateTop();
        this.changeDetector.markForCheck();
      },
      error: () => {
        this.isLoading = false;
        this.loadError = true;
        this.changeDetector.markForCheck();
      }
    });
  }

  addBird(bird: Bird): void {
    bird.count += 1;
    this.calculateTop();
  }

  calculateTop(): void {
    this.topBirdCount = Math.max(0, ...this.birds.map((bird: Bird) => bird.count));
  }

  getSliderValue(count: number): number {
    return this.topBirdCount === 0 ? 0 : 100 * count / this.topBirdCount;
  }

  getHeatMapColor(count: number): string {
    const hue = 240 - this.getSliderValue(count) * 2.4;
    return `hsl(${hue} 85% 50%)`;
  }

  removeBird(bird: Bird): void {
    if (bird.count > 0) {
      bird.count -= 1;
    }
    this.calculateTop();
  }

  playBirdsong(audioPlayer: HTMLAudioElement): Promise<void> {
    if (!audioPlayer.paused) {
      audioPlayer.pause();
      return Promise.resolve();
    }

    this.songPlaybackError = null;
    return audioPlayer.play().catch(() => {
      this.songPlaybackError = 'Birdsong playback is unavailable.';
      this.changeDetector.markForCheck();
    });
  }
}
