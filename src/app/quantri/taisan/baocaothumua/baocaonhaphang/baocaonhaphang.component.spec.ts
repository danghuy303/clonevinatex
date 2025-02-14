import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaonhaphangComponent } from './baocaonhaphang.component';

describe('BaocaonhaphangComponent', () => {
  let component: BaocaonhaphangComponent;
  let fixture: ComponentFixture<BaocaonhaphangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaonhaphangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaonhaphangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
