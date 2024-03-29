import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheKhoGiaCongComponent } from './the-kho-gia-cong.component';

describe('TheKhoGiaCongComponent', () => {
  let component: TheKhoGiaCongComponent;
  let fixture: ComponentFixture<TheKhoGiaCongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheKhoGiaCongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheKhoGiaCongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
