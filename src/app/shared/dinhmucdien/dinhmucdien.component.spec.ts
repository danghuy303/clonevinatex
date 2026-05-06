import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucdienComponent } from './dinhmucdien.component';

describe('DinhmucdienComponent', () => {
  let component: DinhmucdienComponent;
  let fixture: ComponentFixture<DinhmucdienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucdienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucdienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
