import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphilichxichnamComponent } from './chiphilichxichnam.component';

describe('ChiphilichxichnamComponent', () => {
  let component: ChiphilichxichnamComponent;
  let fixture: ComponentFixture<ChiphilichxichnamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphilichxichnamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphilichxichnamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
