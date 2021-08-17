import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KhoxokiemkemodalComponent } from './khoxokiemkemodal.component';

describe('KhoxokiemkemodalComponent', () => {
  let component: KhoxokiemkemodalComponent;
  let fixture: ComponentFixture<KhoxokiemkemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KhoxokiemkemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KhoxokiemkemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
