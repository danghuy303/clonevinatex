import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucchitieuclassimatComponent } from './dinhmucchitieuclassimat.component';

describe('DinhmucchitieuclassimatComponent', () => {
  let component: DinhmucchitieuclassimatComponent;
  let fixture: ComponentFixture<DinhmucchitieuclassimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucchitieuclassimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucchitieuclassimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
