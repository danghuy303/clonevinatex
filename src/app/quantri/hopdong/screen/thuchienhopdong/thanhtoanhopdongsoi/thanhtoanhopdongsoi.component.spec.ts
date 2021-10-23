import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThanhtoanhopdongsoiComponent } from './thanhtoanhopdongsoi.component';

describe('ThanhtoanhopdongsoiComponent', () => {
  let component: ThanhtoanhopdongsoiComponent;
  let fixture: ComponentFixture<ThanhtoanhopdongsoiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThanhtoanhopdongsoiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThanhtoanhopdongsoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
