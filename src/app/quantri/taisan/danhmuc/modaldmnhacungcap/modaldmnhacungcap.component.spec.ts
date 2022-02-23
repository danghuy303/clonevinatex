import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldmnhacungcapComponent } from './modaldmnhacungcap.component';

describe('ModaldmnhacungcapComponent', () => {
  let component: ModaldmnhacungcapComponent;
  let fixture: ComponentFixture<ModaldmnhacungcapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldmnhacungcapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldmnhacungcapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
