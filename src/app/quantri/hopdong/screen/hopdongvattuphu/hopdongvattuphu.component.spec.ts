import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongvattuphuComponent } from './hopdongvattuphu.component';

describe('HopdongvattuphuComponent', () => {
  let component: HopdongvattuphuComponent;
  let fixture: ComponentFixture<HopdongvattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
