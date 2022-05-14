import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockUIComponent } from './block-ui.component';
import { configureTestSuite } from '../../mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { PopupModule } from '../../services/popupService/popup.module';

describe('BlockUIComponent', () => {
  let component: BlockUIComponent;
  let fixture: ComponentFixture<BlockUIComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [BlockUIComponent],
      imports: [PopupModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockUIComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
