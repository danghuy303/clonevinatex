import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CapnhatthuvienComponent } from './capnhatthuvien.component';

describe('CapnhatthuvienComponent', () => {
  let component: CapnhatthuvienComponent;
  let fixture: ComponentFixture<CapnhatthuvienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CapnhatthuvienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CapnhatthuvienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
