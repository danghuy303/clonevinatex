import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietkehoachthangmodalComponent } from './chitietkehoachthangmodal.component';

describe('ChitietkehoachthangmodalComponent', () => {
  let component: ChitietkehoachthangmodalComponent;
  let fixture: ComponentFixture<ChitietkehoachthangmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitietkehoachthangmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChitietkehoachthangmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
