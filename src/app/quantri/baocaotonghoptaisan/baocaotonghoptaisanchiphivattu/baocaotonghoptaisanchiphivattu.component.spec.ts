import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotonghoptaisanchiphivattuComponent } from './baocaotonghoptaisanchiphivattu.component';

describe('BaocaotonghoptaisanchiphivattuComponent', () => {
  let component: BaocaotonghoptaisanchiphivattuComponent;
  let fixture: ComponentFixture<BaocaotonghoptaisanchiphivattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotonghoptaisanchiphivattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotonghoptaisanchiphivattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
