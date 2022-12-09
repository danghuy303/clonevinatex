import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DauxeBaocaocaComponent } from './dauxe-baocaoca.component';

describe('DauxeBaocaocaComponent', () => {
  let component: DauxeBaocaocaComponent;
  let fixture: ComponentFixture<DauxeBaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DauxeBaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DauxeBaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
