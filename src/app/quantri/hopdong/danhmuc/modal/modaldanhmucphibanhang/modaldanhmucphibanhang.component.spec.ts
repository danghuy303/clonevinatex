import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucphibanhangComponent } from './modaldanhmucphibanhang.component';

describe('ModaldanhmucphibanhangComponent', () => {
  let component: ModaldanhmucphibanhangComponent;
  let fixture: ComponentFixture<ModaldanhmucphibanhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucphibanhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucphibanhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
