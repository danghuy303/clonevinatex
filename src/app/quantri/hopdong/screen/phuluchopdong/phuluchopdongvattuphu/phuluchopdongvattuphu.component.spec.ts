import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongvattuphuComponent } from './phuluchopdongvattuphu.component';

describe('PhuluchopdongvattuphuComponent', () => {
  let component: PhuluchopdongvattuphuComponent;
  let fixture: ComponentFixture<PhuluchopdongvattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
