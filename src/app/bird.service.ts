import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bird } from './models/bird.interface';

@Injectable({ providedIn: 'root' })
export class BirdService {
  private readonly http = inject(HttpClient);

  private readonly birdUrl = '/assets/json/birds.json';

  getBirds(): Observable<Bird[]> {
    return this.http.get<Bird[]>(this.birdUrl);
  }
}
