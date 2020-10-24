import { Component, OnInit } from '@angular/core';
import { BirdService } from '../bird.service';
import { Bird } from '../models/bird.interface'
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-bird-list',
  templateUrl: './bird-list.component.html',
  styleUrls: ['./bird-list.component.scss']
})
export class BirdListComponent implements OnInit {
  birds: Bird[];
  faMinus: {} = faMinus;
  faPlus: {} = faPlus;
  topBirdCount: number = 0;

  constructor(private birdService: BirdService) { }

  ngOnInit() {
    this.birdService
      .getBirds()
      .subscribe((data: Bird[]) => this.birds = data)
  }

  addBird(bird) {
    bird.count += 1;
    this.calculateTop();
  };

  calculateTop() {
    this.topBirdCount = [...this.birds].sort((a, b) => {
      return b.count-a.count
    })[0].count;
  }

  getSliderColor(count) {
    let value = 100 / this.topBirdCount * count;
    if (value > 90) {
      return "success"
    } else {
      return "primary"
    }
  }

  getSliderValue(count) {
    return 100 / this.topBirdCount * count
  }

  removeBird(bird) {
    if (bird.count > 0) {
      bird.count -= 1;
    }
    this.calculateTop();
  };

  playBirdsong(id) {
    var audio_id = 'audio_' + id;
    let audioPlayer = <HTMLVideoElement>document.getElementById(audio_id);
    if (audioPlayer.paused)
      audioPlayer.play();
    else
      audioPlayer.pause();
  }

}
