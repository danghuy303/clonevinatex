import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucloaihopdongComponent } from './modaldanhmucloaihopdong.component';

describe('ModaldanhmucloaihopdongComponent', () => {
  let component: ModaldanhmucloaihopdongComponent;
  let fixture: ComponentFixture<ModaldanhmucloaihopdongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucloaihopdongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucloaihopdongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
