import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmchitieuclasimatComponent } from './dmchitieuclasimat.component';

describe('DmchitieuclasimatComponent', () => {
  let component: DmchitieuclasimatComponent;
  let fixture: ComponentFixture<DmchitieuclasimatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmchitieuclasimatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmchitieuclasimatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
