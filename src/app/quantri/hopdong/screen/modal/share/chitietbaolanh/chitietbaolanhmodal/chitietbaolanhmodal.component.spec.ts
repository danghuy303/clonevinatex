import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietbaolanhmodalComponent } from './chitietbaolanhmodal.component';

describe('ChitietbaolanhmodalComponent', () => {
  let component: ChitietbaolanhmodalComponent;
  let fixture: ComponentFixture<ChitietbaolanhmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietbaolanhmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietbaolanhmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
