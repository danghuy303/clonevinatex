import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoidangkiemmodalComponent } from './noidangkiemmodal.component';

describe('NoidangkiemmodalComponent', () => {
  let component: NoidangkiemmodalComponent;
  let fixture: ComponentFixture<NoidangkiemmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoidangkiemmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoidangkiemmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
