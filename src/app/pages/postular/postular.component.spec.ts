import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostularComponent } from './postular.component';

describe('PostularComponent', () => {
  let component: PostularComponent;
  let fixture: ComponentFixture<PostularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostularComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
