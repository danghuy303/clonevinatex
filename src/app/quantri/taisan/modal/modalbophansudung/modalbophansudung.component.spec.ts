import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalbophansudungComponent } from './modalbophansudung.component';

describe('ModalbophansudungComponent', () => {
  let component: ModalbophansudungComponent;
  let fixture: ComponentFixture<ModalbophansudungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalbophansudungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalbophansudungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
