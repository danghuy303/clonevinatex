import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucthutucthanhtoanComponent } from './danhmucthutucthanhtoan.component';

describe('DanhmucthutucthanhtoanComponent', () => {
  let component: DanhmucthutucthanhtoanComponent;
  let fixture: ComponentFixture<DanhmucthutucthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucthutucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucthutucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
