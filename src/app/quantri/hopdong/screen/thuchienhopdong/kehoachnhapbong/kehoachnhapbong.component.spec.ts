import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachnhapbongComponent } from './kehoachnhapbong.component';

describe('KehoachnhapbongComponent', () => {
  let component: KehoachnhapbongComponent;
  let fixture: ComponentFixture<KehoachnhapbongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachnhapbongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachnhapbongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
