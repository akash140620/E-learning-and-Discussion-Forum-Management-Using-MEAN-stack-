import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentreContentComponent } from './centre-content.component';

describe('CentreContentComponent', () => {
  let component: CentreContentComponent;
  let fixture: ComponentFixture<CentreContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CentreContentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CentreContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
