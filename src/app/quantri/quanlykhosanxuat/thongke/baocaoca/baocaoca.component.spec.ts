import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaocaComponent } from './baocaoca.component';

describe('BaocaocaComponent', () => {
  let component: BaocaocaComponent;
  let fixture: ComponentFixture<BaocaocaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaocaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaocaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
