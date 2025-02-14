import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaocaotonghopgiamuahangComponent } from './baocaotonghopgiamuahang.component';

describe('BaocaotonghopgiamuahangComponent', () => {
  let component: BaocaotonghopgiamuahangComponent;
  let fixture: ComponentFixture<BaocaotonghopgiamuahangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaocaotonghopgiamuahangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaocaotonghopgiamuahangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
