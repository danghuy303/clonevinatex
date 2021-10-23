import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucdonvitinhComponent } from './danhmucdonvitinh.component';

describe('DanhmucdonvitinhComponent', () => {
  let component: DanhmucdonvitinhComponent;
  let fixture: ComponentFixture<DanhmucdonvitinhComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucdonvitinhComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucdonvitinhComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
