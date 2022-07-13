import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachdaduyetComponent } from './kehoachdaduyet.component';

describe('KehoachdaduyetComponent', () => {
  let component: KehoachdaduyetComponent;
  let fixture: ComponentFixture<KehoachdaduyetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachdaduyetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachdaduyetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
