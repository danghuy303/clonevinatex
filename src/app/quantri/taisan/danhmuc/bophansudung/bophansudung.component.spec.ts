import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BophansudungComponent } from './bophansudung.component';

describe('BophansudungComponent', () => {
  let component: BophansudungComponent;
  let fixture: ComponentFixture<BophansudungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BophansudungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BophansudungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
