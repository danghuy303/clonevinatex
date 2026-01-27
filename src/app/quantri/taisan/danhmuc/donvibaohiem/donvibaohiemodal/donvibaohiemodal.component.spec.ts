import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonvibaohiemodalComponent } from './donvibaohiemodal.component';

describe('DonvibaohiemodalComponent', () => {
  let component: DonvibaohiemodalComponent;
  let fixture: ComponentFixture<DonvibaohiemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonvibaohiemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonvibaohiemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
