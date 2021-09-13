import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhsachtinhluongComponent } from './modaldanhsachtinhluong.component';

describe('ModaldanhsachtinhluongComponent', () => {
  let component: ModaldanhsachtinhluongComponent;
  let fixture: ComponentFixture<ModaldanhsachtinhluongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhsachtinhluongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhsachtinhluongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
