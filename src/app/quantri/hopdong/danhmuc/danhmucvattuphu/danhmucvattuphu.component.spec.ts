import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucvattuphuComponent } from './danhmucvattuphu.component';

describe('DanhmucvattuphuComponent', () => {
  let component: DanhmucvattuphuComponent;
  let fixture: ComponentFixture<DanhmucvattuphuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucvattuphuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucvattuphuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
