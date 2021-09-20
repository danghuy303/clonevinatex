import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalchiphibanhangtheonamComponent } from './modalchiphibanhangtheonam.component';

describe('ModalchiphibanhangtheonamComponent', () => {
  let component: ModalchiphibanhangtheonamComponent;
  let fixture: ComponentFixture<ModalchiphibanhangtheonamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalchiphibanhangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalchiphibanhangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
