import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VitrikienmodalComponent } from './vitrikienmodal.component';

describe('VitrikienmodalComponent', () => {
  let component: VitrikienmodalComponent;
  let fixture: ComponentFixture<VitrikienmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VitrikienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VitrikienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
