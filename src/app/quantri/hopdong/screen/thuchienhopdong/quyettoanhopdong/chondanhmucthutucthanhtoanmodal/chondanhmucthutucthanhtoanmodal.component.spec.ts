import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChondanhmucthutucthanhtoanmodalComponent } from './chondanhmucthutucthanhtoanmodal.component';

describe('ChondanhmucthutucthanhtoanmodalComponent', () => {
  let component: ChondanhmucthutucthanhtoanmodalComponent;
  let fixture: ComponentFixture<ChondanhmucthutucthanhtoanmodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChondanhmucthutucthanhtoanmodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChondanhmucthutucthanhtoanmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
