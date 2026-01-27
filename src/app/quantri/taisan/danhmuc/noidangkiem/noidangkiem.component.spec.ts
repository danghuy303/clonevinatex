import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidangkiemComponent } from './noidangkiem.component';

describe('NoidangkiemComponent', () => {
  let component: NoidangkiemComponent;
  let fixture: ComponentFixture<NoidangkiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidangkiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidangkiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
