import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaonhapxuattonComponent } from './baocaonhapxuatton.component';

describe('BaocaonhapxuattonComponent', () => {
  let component: BaocaonhapxuattonComponent;
  let fixture: ComponentFixture<BaocaonhapxuattonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaonhapxuattonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaonhapxuattonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
