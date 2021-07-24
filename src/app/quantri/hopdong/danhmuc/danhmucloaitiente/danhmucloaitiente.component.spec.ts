import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhmucloaitienteComponent } from './danhmucloaitiente.component';

describe('DanhmucloaitienteComponent', () => {
  let component: DanhmucloaitienteComponent;
  let fixture: ComponentFixture<DanhmucloaitienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhmucloaitienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhmucloaitienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
