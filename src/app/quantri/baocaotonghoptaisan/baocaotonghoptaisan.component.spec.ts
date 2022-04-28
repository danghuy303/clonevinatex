import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotonghoptaisanComponent } from './baocaotonghoptaisan.component';

describe('BaocaotonghoptaisanComponent', () => {
  let component: BaocaotonghoptaisanComponent;
  let fixture: ComponentFixture<BaocaotonghoptaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotonghoptaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotonghoptaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
