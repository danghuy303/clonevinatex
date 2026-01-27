import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheodoihoatdongComponent } from './theodoihoatdong.component';

describe('TheodoihoatdongComponent', () => {
  let component: TheodoihoatdongComponent;
  let fixture: ComponentFixture<TheodoihoatdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheodoihoatdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheodoihoatdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
