import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class BirdService {
  constructor(private http: HttpClient) { }

  birdUrl = '../assets/json/birds.json';

  getBirds() {
    return this.http.get(this.birdUrl);
  }
}
