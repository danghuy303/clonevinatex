import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VattuthaythelichxichnamComponent } from './vattuthaythelichxichnam.component';

describe('VattuthaythelichxichnamComponent', () => {
  let component: VattuthaythelichxichnamComponent;
  let fixture: ComponentFixture<VattuthaythelichxichnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VattuthaythelichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VattuthaythelichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
