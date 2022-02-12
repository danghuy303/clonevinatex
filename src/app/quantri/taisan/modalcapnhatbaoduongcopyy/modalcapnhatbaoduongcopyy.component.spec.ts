import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalcapnhatbaoduongcopyyComponent } from './modalcapnhatbaoduongcopyy.component';

describe('ModalcapnhatbaoduongcopyyComponent', () => {
  let component: ModalcapnhatbaoduongcopyyComponent;
  let fixture: ComponentFixture<ModalcapnhatbaoduongcopyyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalcapnhatbaoduongcopyyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalcapnhatbaoduongcopyyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
