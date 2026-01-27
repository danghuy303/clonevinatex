import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaihinhbaohiemComponent } from './loaihinhbaohiem.component';

describe('LoaihinhbaohiemComponent', () => {
  let component: LoaihinhbaohiemComponent;
  let fixture: ComponentFixture<LoaihinhbaohiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaihinhbaohiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaihinhbaohiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
