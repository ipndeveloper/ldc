import { Component, DebugElement, ViewChild, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { FocusDirective } from './focus.directive';
import { By } from '@angular/platform-browser';
import { TestModule } from '../../mocks/test.module';

describe('FocusDirective', () => {

    let fixture: ComponentFixture<TestFocusComponent>;
    let inputEl: DebugElement;

    @Component({
          template: `<input #inputFocus type="text"
                        yrdFocus [isFocused]="isFocused" [element]="element"
                               value=""/>`
    })

    class TestFocusComponent {

        isFocused = true;
        @ViewChild('inputFocus') element: ElementRef;

        constructor() {}
    }

    beforeEach(() => {

        fixture = TestBed.configureTestingModule({
            declarations: [
                FocusDirective,
                TestFocusComponent
            ],
            imports: [
                ReactiveFormsModule,
                TestModule
            ]
        }).createComponent(TestFocusComponent);

        inputEl = fixture.debugElement.query(By.css('input'));
        fixture.detectChanges();
    });

    it('should create an instance', () => {
        const directive = new FocusDirective();
        expect(directive).toBeTruthy();
    });

    it('should create an html input element with directive', () => {
        expect(inputEl.nativeElement.hasAttribute('yrdfocus')).toBeTruthy();
    });

    it('should call focus on element', () => {
        jasmine.clock().install();

        spyOn(inputEl.nativeElement, 'focus');
        const directive = new FocusDirective();
        directive.element = inputEl;
        directive.isFocused = true;

        directive.ngOnInit();

        jasmine.clock().tick(500);
        expect(inputEl.nativeElement.focus).toHaveBeenCalled();
        jasmine.clock().uninstall();
    });
});
