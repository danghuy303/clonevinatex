import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabkhieunaimodalComponent } from './tabkhieunaimodal.component';

describe('TabkhieunaimodalComponent', () => {
  let component: TabkhieunaimodalComponent;
  let fixture: ComponentFixture<TabkhieunaimodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabkhieunaimodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabkhieunaimodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
