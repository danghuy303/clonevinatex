import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmtieuchichatluonghopdongmodalComponent } from './dmtieuchichatluonghopdongmodal.component';

describe('DmtieuchichatluonghopdongmodalComponent', () => {
  let component: DmtieuchichatluonghopdongmodalComponent;
  let fixture: ComponentFixture<DmtieuchichatluonghopdongmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmtieuchichatluonghopdongmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmtieuchichatluonghopdongmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
