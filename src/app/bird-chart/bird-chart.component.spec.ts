import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';

import { BirdChartComponent } from './bird-chart.component';

describe('BirdChartComponent', () => {
  let component: BirdChartComponent;
  let fixture: ComponentFixture<BirdChartComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [ BirdChartComponent ]
    });
    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BirdChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
