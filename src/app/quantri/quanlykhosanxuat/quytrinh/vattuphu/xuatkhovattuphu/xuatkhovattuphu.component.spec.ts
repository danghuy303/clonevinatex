import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XuatkhovattuphuComponent } from './xuatkhovattuphu.component';

describe('XuatkhovattuphuComponent', () => {
  let component: XuatkhovattuphuComponent;
  let fixture: ComponentFixture<XuatkhovattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XuatkhovattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XuatkhovattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
