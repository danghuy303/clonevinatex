import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuchinhthucthanhtoanComponent } from './modaldanhmuchinhthucthanhtoan.component';

describe('ModaldanhmuchinhthucthanhtoanComponent', () => {
  let component: ModaldanhmuchinhthucthanhtoanComponent;
  let fixture: ComponentFixture<ModaldanhmuchinhthucthanhtoanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuchinhthucthanhtoanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuchinhthucthanhtoanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
