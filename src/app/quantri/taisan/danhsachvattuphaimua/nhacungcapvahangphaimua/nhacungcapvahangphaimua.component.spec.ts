import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NhacungcapvahangphaimuaComponent } from './nhacungcapvahangphaimua.component';

describe('NhacungcapvahangphaimuaComponent', () => {
  let component: NhacungcapvahangphaimuaComponent;
  let fixture: ComponentFixture<NhacungcapvahangphaimuaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NhacungcapvahangphaimuaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NhacungcapvahangphaimuaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
