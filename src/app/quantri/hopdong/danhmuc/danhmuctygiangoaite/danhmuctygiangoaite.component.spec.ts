import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmuctygiangoaiteComponent } from './danhmuctygiangoaite.component';

describe('DanhmuctygiangoaiteComponent', () => {
  let component: DanhmuctygiangoaiteComponent;
  let fixture: ComponentFixture<DanhmuctygiangoaiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmuctygiangoaiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmuctygiangoaiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
