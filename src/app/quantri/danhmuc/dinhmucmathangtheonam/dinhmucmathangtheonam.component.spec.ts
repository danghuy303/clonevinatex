import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinhmucmathangtheonamComponent } from './dinhmucmathangtheonam.component';

describe('DinhmucmathangtheonamComponent', () => {
  let component: DinhmucmathangtheonamComponent;
  let fixture: ComponentFixture<DinhmucmathangtheonamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinhmucmathangtheonamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinhmucmathangtheonamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
