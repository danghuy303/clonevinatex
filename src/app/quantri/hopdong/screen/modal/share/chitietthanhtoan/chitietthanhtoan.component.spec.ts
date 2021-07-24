import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietthanhtoanComponent } from './chitietthanhtoan.component';

describe('ChitietthanhtoanComponent', () => {
  let component: ChitietthanhtoanComponent;
  let fixture: ComponentFixture<ChitietthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
