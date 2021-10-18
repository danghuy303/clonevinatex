import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcapnhattaisanComponent } from './modalcapnhattaisan.component';

describe('ModalcapnhattaisanComponent', () => {
  let component: ModalcapnhattaisanComponent;
  let fixture: ComponentFixture<ModalcapnhattaisanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhattaisanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhattaisanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
