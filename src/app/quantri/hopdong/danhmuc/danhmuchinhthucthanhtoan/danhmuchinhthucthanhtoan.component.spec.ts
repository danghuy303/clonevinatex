import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuchinhthucthanhtoanComponent } from './danhmuchinhthucthanhtoan.component';

describe('DanhmuchinhthucthanhtoanComponent', () => {
  let component: DanhmuchinhthucthanhtoanComponent;
  let fixture: ComponentFixture<DanhmuchinhthucthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuchinhthucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuchinhthucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
