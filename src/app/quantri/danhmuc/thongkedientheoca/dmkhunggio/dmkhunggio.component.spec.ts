import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmkhunggioComponent } from './dmkhunggio.component';

describe('DmkhunggioComponent', () => {
  let component: DmkhunggioComponent;
  let fixture: ComponentFixture<DmkhunggioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmkhunggioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmkhunggioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
