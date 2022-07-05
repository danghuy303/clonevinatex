import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiPhiBangTienModalComponent } from './chi-phi-bang-tien-modal.component';

describe('ChiPhiBangTienModalComponent', () => {
  let component: ChiPhiBangTienModalComponent;
  let fixture: ComponentFixture<ChiPhiBangTienModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiPhiBangTienModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiPhiBangTienModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
