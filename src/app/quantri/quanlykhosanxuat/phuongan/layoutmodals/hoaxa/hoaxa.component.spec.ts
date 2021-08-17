import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoaxaComponent } from './hoaxa.component';

describe('HoaxaComponent', () => {
  let component: HoaxaComponent;
  let fixture: ComponentFixture<HoaxaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoaxaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoaxaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
