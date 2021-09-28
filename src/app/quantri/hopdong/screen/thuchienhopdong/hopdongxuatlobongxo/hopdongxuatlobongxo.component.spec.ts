import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HopdongxuatlobongxoComponent } from './hopdongxuatlobongxo.component';

describe('HopdongxuatlobongxoComponent', () => {
  let component: HopdongxuatlobongxoComponent;
  let fixture: ComponentFixture<HopdongxuatlobongxoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HopdongxuatlobongxoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HopdongxuatlobongxoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
