import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheKhoVatTuComponent } from './the-kho-vat-tu.component';

describe('TheKhoVatTuComponent', () => {
  let component: TheKhoVatTuComponent;
  let fixture: ComponentFixture<TheKhoVatTuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheKhoVatTuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheKhoVatTuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
