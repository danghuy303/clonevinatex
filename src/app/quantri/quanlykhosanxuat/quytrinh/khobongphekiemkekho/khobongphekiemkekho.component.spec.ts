import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhobongphekiemkekhoComponent } from './khobongphekiemkekho.component';

describe('KhobongphekiemkekhoComponent', () => {
  let component: KhobongphekiemkekhoComponent;
  let fixture: ComponentFixture<KhobongphekiemkekhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongphekiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongphekiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
