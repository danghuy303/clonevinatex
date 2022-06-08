import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TyGiaNgoaiTeComponent } from './ty-gia-ngoai-te.component';

describe('TyGiaNgoaiTeComponent', () => {
  let component: TyGiaNgoaiTeComponent;
  let fixture: ComponentFixture<TyGiaNgoaiTeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TyGiaNgoaiTeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TyGiaNgoaiTeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
