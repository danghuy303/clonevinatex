import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucloaitienteComponent } from './modaldanhmucloaitiente.component';

describe('ModaldanhmucloaitienteComponent', () => {
  let component: ModaldanhmucloaitienteComponent;
  let fixture: ComponentFixture<ModaldanhmucloaitienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucloaitienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucloaitienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
