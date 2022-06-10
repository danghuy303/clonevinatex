import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuyTrinhTemplateComponent } from './quy-trinh-template.component';

describe('QuyTrinhTemplateComponent', () => {
  let component: QuyTrinhTemplateComponent;
  let fixture: ComponentFixture<QuyTrinhTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuyTrinhTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuyTrinhTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
