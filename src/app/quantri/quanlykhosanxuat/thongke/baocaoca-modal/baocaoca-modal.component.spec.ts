import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaocaModalComponent } from './baocaoca-modal.component';

describe('BaocaocaModalComponent', () => {
  let component: BaocaocaModalComponent;
  let fixture: ComponentFixture<BaocaocaModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaocaModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaocaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
