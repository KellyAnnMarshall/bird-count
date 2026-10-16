import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse, provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { BirdService } from './bird.service';
import { Bird } from './models/bird.interface';

describe('BirdService', () => {
  let service: BirdService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BirdService, provideHttpClient(), provideHttpClientTesting()]
    });
    service = TestBed.inject(BirdService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTestingController.verify());

  it('requests the bundled bird data and returns typed records', () => {
    const expectedBirds: Bird[] = [
      { id: 1, name: 'Blackbird', shortname: 'blackbird', count: 0 }
    ];
    let actualBirds: Bird[] | undefined;

    service.getBirds().subscribe((birds) => actualBirds = birds);

    const request = httpTestingController.expectOne('/assets/json/birds.json');
    expect(request.request.method).toBe('GET');
    request.flush(expectedBirds);

    expect(actualBirds).toEqual(expectedBirds);
  });

  it('preserves HTTP errors for the component to handle', () => {
    let actualError: HttpErrorResponse | undefined;

    service.getBirds().subscribe({ error: (error: HttpErrorResponse) => actualError = error });

    httpTestingController.expectOne('/assets/json/birds.json').flush('Unavailable', {
      status: 503,
      statusText: 'Service Unavailable'
    });

    expect(actualError?.status).toBe(503);
  });
});
