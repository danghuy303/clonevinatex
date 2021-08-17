import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhobongkiemkekhoComponent } from './khobongkiemkekho.component';

describe('KhobongkiemkekhoComponent', () => {
  let component: KhobongkiemkekhoComponent;
  let fixture: ComponentFixture<KhobongkiemkekhoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongkiemkekhoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongkiemkekhoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
