import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongvattuphumodalComponent } from './phuluchopdongvattuphumodal.component';

describe('PhuluchopdongvattuphumodalComponent', () => {
  let component: PhuluchopdongvattuphumodalComponent;
  let fixture: ComponentFixture<PhuluchopdongvattuphumodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongvattuphumodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongvattuphumodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
