import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChonthutucthanhtoanmodalComponent } from './chonthutucthanhtoanmodal.component';

describe('ChonthutucthanhtoanmodalComponent', () => {
  let component: ChonthutucthanhtoanmodalComponent;
  let fixture: ComponentFixture<ChonthutucthanhtoanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChonthutucthanhtoanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChonthutucthanhtoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
