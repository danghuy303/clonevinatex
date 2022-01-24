import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VattudutruComponent } from './vattudutru.component';

describe('VattudutruComponent', () => {
  let component: VattudutruComponent;
  let fixture: ComponentFixture<VattudutruComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VattudutruComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattudutruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
