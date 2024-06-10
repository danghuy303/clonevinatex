import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucbaocaodienmodalComponent } from './dinhmucbaocaodienmodal.component';

describe('DinhmucbaocaodienmodalComponent', () => {
  let component: DinhmucbaocaodienmodalComponent;
  let fixture: ComponentFixture<DinhmucbaocaodienmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucbaocaodienmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucbaocaodienmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
