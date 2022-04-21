import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChiphilichxichnamchonthemComponent } from './chiphilichxichnamchonthem.component';

describe('ChiphilichxichnamchonthemComponent', () => {
  let component: ChiphilichxichnamchonthemComponent;
  let fixture: ComponentFixture<ChiphilichxichnamchonthemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChiphilichxichnamchonthemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChiphilichxichnamchonthemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
