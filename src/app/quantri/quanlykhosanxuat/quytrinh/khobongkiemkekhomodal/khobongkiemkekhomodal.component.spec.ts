import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhobongkiemkekhomodalComponent } from './khobongkiemkekhomodal.component';

describe('KhobongkiemkekhomodalComponent', () => {
  let component: KhobongkiemkekhomodalComponent;
  let fixture: ComponentFixture<KhobongkiemkekhomodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhobongkiemkekhomodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhobongkiemkekhomodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
