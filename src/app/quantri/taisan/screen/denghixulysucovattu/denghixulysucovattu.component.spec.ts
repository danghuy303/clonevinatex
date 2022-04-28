import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DenghixulysucovattuComponent } from './denghixulysucovattu.component';

describe('DenghixulysucovattuComponent', () => {
  let component: DenghixulysucovattuComponent;
  let fixture: ComponentFixture<DenghixulysucovattuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DenghixulysucovattuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DenghixulysucovattuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
