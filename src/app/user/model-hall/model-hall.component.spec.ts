import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelHallComponent } from './model-hall.component';

describe('ModelHallComponent', () => {
  let component: ModelHallComponent;
  let fixture: ComponentFixture<ModelHallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelHallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelHallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
