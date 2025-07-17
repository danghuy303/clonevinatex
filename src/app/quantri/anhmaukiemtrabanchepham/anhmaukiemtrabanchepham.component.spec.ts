import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnhmaukiemtrabanchephamComponent } from './anhmaukiemtrabanchepham.component';

describe('AnhmaukiemtrabanchephamComponent', () => {
  let component: AnhmaukiemtrabanchephamComponent;
  let fixture: ComponentFixture<AnhmaukiemtrabanchephamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnhmaukiemtrabanchephamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnhmaukiemtrabanchephamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
