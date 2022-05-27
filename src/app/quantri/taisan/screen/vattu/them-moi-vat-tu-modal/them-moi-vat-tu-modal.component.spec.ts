import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemMoiVatTuModalComponent } from './them-moi-vat-tu-modal.component';

describe('ThemMoiVatTuModalComponent', () => {
  let component: ThemMoiVatTuModalComponent;
  let fixture: ComponentFixture<ThemMoiVatTuModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThemMoiVatTuModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemMoiVatTuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
