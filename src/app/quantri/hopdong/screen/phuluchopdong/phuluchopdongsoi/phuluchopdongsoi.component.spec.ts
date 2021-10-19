import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongsoiComponent } from './phuluchopdongsoi.component';

describe('PhuluchopdongsoiComponent', () => {
  let component: PhuluchopdongsoiComponent;
  let fixture: ComponentFixture<PhuluchopdongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
