import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaldanhmucdongiasanphamComponent } from './modaldanhmucdongiasanpham.component';

describe('ModaldanhmucdongiasanphamComponent', () => {
  let component: ModaldanhmucdongiasanphamComponent;
  let fixture: ComponentFixture<ModaldanhmucdongiasanphamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaldanhmucdongiasanphamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaldanhmucdongiasanphamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
