import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VatTuPhuComponent } from './vat-tu-phu.component';

describe('VatTuPhuComponent', () => {
  let component: VatTuPhuComponent;
  let fixture: ComponentFixture<VatTuPhuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VatTuPhuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VatTuPhuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
