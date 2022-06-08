import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyGiaNgoaiTeModalComponent } from './ty-gia-ngoai-te-modal.component';

describe('TyGiaNgoaiTeModalComponent', () => {
  let component: TyGiaNgoaiTeModalComponent;
  let fixture: ComponentFixture<TyGiaNgoaiTeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyGiaNgoaiTeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyGiaNgoaiTeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
