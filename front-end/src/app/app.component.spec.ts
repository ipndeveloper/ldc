import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { TestModule } from './core/mocks/test.module';
import { NgxPermissionsService } from 'ngx-permissions';
import { configureTestSuite } from './core/mocks/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationService } from './core/services/navigationService/navigation.service';
import { ToolbarService } from './home/toolbar/toolbar.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  configureTestSuite(() => {
      TestBed.configureTestingModule({
          declarations: [
            AppComponent
          ],
          imports: [
            RouterTestingModule.withRoutes([]),
            TestModule,
          ],
          schemas: [
            NO_ERRORS_SCHEMA
          ],
          providers: [
            NgxPermissionsService,
            NavigationService,
            ToolbarService
          ]
      });
  });

  beforeEach(() => {
      fixture = TestBed.createComponent(AppComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
  });

  it('should create', () => {
      expect(component).toBeTruthy();
  });
});
