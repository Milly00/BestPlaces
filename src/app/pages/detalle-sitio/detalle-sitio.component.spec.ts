import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleSitioComponent } from './detalle-sitio.component';

describe('DetalleSitioComponent', () => {
  let component: DetalleSitioComponent;
  let fixture: ComponentFixture<DetalleSitioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleSitioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleSitioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
