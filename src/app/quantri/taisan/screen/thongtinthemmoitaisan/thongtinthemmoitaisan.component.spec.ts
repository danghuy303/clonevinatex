import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThongtinthemmoitaisanComponent } from './thongtinthemmoitaisan.component';

describe('ThongtinthemmoitaisanComponent', () => {
  let component: ThongtinthemmoitaisanComponent;
  let fixture: ComponentFixture<ThongtinthemmoitaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThongtinthemmoitaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThongtinthemmoitaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
