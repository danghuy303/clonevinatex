import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhuluchopdongbongxoComponent } from './phuluchopdongbongxo.component';

describe('PhuluchopdongbongxoComponent', () => {
  let component: PhuluchopdongbongxoComponent;
  let fixture: ComponentFixture<PhuluchopdongbongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhuluchopdongbongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhuluchopdongbongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
