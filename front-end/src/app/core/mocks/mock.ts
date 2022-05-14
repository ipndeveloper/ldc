import { Component } from '@angular/core';

export module Mock {
    export function Of(selector: string, T: any): any {

        @Component({
            selector: selector,
            template: '<p>Mock Component</p>'
        })
        class MockComponent extends T { }

        return MockComponent;
    }
}
