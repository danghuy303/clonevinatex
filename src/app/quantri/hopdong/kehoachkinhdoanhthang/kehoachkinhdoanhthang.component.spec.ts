import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KehoachkinhdoanhthangComponent } from './kehoachkinhdoanhthang.component';

describe('KehoachkinhdoanhthangComponent', () => {
  let component: KehoachkinhdoanhthangComponent;
  let fixture: ComponentFixture<KehoachkinhdoanhthangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KehoachkinhdoanhthangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KehoachkinhdoanhthangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
