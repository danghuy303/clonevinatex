import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuccocaunhansuComponent } from './modaldanhmuccocaunhansu.component';

describe('ModaldanhmuccocaunhansuComponent', () => {
  let component: ModaldanhmuccocaunhansuComponent;
  let fixture: ComponentFixture<ModaldanhmuccocaunhansuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuccocaunhansuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuccocaunhansuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
