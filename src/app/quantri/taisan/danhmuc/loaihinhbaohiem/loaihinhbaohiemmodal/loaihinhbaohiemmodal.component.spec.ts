import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaihinhbaohiemmodalComponent } from './loaihinhbaohiemmodal.component';

describe('LoaihinhbaohiemmodalComponent', () => {
  let component: LoaihinhbaohiemmodalComponent;
  let fixture: ComponentFixture<LoaihinhbaohiemmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaihinhbaohiemmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaihinhbaohiemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
