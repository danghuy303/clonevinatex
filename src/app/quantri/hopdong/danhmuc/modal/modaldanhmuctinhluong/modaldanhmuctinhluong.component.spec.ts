import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmuctinhluongComponent } from './modaldanhmuctinhluong.component';

describe('ModaldanhmuctinhluongComponent', () => {
  let component: ModaldanhmuctinhluongComponent;
  let fixture: ComponentFixture<ModaldanhmuctinhluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmuctinhluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmuctinhluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
