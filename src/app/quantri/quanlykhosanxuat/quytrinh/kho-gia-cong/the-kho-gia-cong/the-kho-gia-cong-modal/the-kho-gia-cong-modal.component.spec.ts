import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheKhoGiaCongModalComponent } from './the-kho-gia-cong-modal.component';

describe('TheKhoGiaCongModalComponent', () => {
  let component: TheKhoGiaCongModalComponent;
  let fixture: ComponentFixture<TheKhoGiaCongModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheKhoGiaCongModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheKhoGiaCongModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
