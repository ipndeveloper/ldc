import { TestBed, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, OnInit, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

import { MaxLengthDirective } from './max-length.directive';
import { FormControl, ReactiveFormsModule, FormGroup, FormBuilder  } from '@angular/forms';


describe('MaxLengthDirective', () => {

    let fixture: ComponentFixture<TestMaxLengthComponent>;
    let inputEl: DebugElement;
    let component: TestMaxLengthComponent;

    @Component({
          template: `<fieldset [formGroup]="form">
                        <input type="text"
                               id="numeroControl"
                               formControlName="numeroControl"
                               yrdMaxLength [maxLength]=2
                               value="11"
                               [control]="form.get('numeroControl')"/>
                        <input type="text"
                               id="decimalControl"
                               formControlName="decimalControl"
                               yrdMaxLength [maxLength]=10
                               [maxDecimalPlaces]=2
                               [control]="form.get('decimalControl')"/>
                     </fieldset>`
    })

    class TestMaxLengthComponent implements OnInit {
        form: FormGroup;
        control: FormControl;

        @ViewChild(MaxLengthDirective) directive: MaxLengthDirective;

        constructor(private readonly fb: FormBuilder) {
        }

        ngOnInit() {
            this.form = this.fb.group({
                numeroControl: { value: '', disabled: true },
                decimalControl: { value: '', disabled: false }
              });
        }
    }

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({
            declarations: [
                MaxLengthDirective,
                TestMaxLengthComponent
            ],
            imports: [
                ReactiveFormsModule
            ]
        }).createComponent(TestMaxLengthComponent);

        component = fixture.componentInstance;
        inputEl = fixture.debugElement.query(By.css('#numeroControl'));
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        const directive = new MaxLengthDirective();
        expect(directive).toBeTruthy();
    });

    it('should create an html input element with directive', () => {
        inputEl.nativeElement.value = 100;
        fixture.detectChanges();
        expect(inputEl.nativeElement).toBeTruthy();
    });

    it('should limit a decimal number of 10.2', () => {
        component.directive.control = component.form.controls.decimalControl as FormControl;
        component.directive.maxLength = 10;
        component.directive.maxDecimalPlaces = 2;
        component.directive.onInput(123456789.1234);
        fixture.detectChanges();
        expect(component.form.controls.decimalControl.value).toBe('12345678.12');
    });
});
