import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabkhieunaiComponent } from './tabkhieunai.component';

describe('TabkhieunaiComponent', () => {
  let component: TabkhieunaiComponent;
  let fixture: ComponentFixture<TabkhieunaiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabkhieunaiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabkhieunaiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
