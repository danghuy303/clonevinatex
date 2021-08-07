import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThoigiannhaphangmodalComponent } from './thoigiannhaphangmodal.component';

describe('ThoigiannhaphangmodalComponent', () => {
  let component: ThoigiannhaphangmodalComponent;
  let fixture: ComponentFixture<ThoigiannhaphangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThoigiannhaphangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThoigiannhaphangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
