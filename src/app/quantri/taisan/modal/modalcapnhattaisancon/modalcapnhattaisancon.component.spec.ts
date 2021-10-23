import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcapnhattaisanconComponent } from './modalcapnhattaisancon.component';

describe('ModalcapnhattaisanconComponent', () => {
  let component: ModalcapnhattaisanconComponent;
  let fixture: ComponentFixture<ModalcapnhattaisanconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhattaisanconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhattaisanconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
