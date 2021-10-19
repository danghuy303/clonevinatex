import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongbongxomodalComponent } from './phuluchopdongbongxomodal.component';

describe('PhuluchopdongbongxomodalComponent', () => {
  let component: PhuluchopdongbongxomodalComponent;
  let fixture: ComponentFixture<PhuluchopdongbongxomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongbongxomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongbongxomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
