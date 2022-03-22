import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmloaidienComponent } from './dmloaidien.component';

describe('DmloaidienComponent', () => {
  let component: DmloaidienComponent;
  let fixture: ComponentFixture<DmloaidienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmloaidienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmloaidienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
