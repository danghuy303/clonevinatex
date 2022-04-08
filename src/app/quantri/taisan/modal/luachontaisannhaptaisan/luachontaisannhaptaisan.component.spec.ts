import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LuachontaisannhaptaisanComponent } from './luachontaisannhaptaisan.component';

describe('LuachontaisannhaptaisanComponent', () => {
  let component: LuachontaisannhaptaisanComponent;
  let fixture: ComponentFixture<LuachontaisannhaptaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuachontaisannhaptaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuachontaisannhaptaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
