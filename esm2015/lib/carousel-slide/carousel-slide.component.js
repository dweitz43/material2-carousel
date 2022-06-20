/**
 * @fileoverview added by tsickle
 * Generated from: lib/carousel-slide/carousel-slide.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export class MatCarouselSlideComponent {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
        this.overlayColor = '#00000040';
        this.hideOverlay = false;
        this.disabled = false; // implements ListKeyManagerOption
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.image) {
            this.image = this.sanitizer.bypassSecurityTrustStyle(`url("${this.image}")`);
        }
    }
}
MatCarouselSlideComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel-slide',
                template: "<ng-template>\n  <div class=\"carousel-slide\" [style.background-image]=\"image\">\n    <div class=\"carousel-slide-content\"><ng-content></ng-content></div>\n    <div\n      *ngIf=\"!hideOverlay\"\n      class=\"carousel-slide-overlay\"\n      [style.background-color]=\"overlayColor\"\n    ></div>\n  </div>\n</ng-template>\n",
                styles: [".carousel-slide{background-position:50%;background-repeat:no-repeat;background-size:cover}.carousel-slide,.carousel-slide-overlay{height:100%;position:absolute;width:100%;z-index:auto}.carousel-slide-content{height:100%;position:absolute;width:100%;z-index:1}"]
            }] }
];
/** @nocollapse */
MatCarouselSlideComponent.ctorParameters = () => [
    { type: DomSanitizer }
];
MatCarouselSlideComponent.propDecorators = {
    image: [{ type: Input }],
    overlayColor: [{ type: Input }],
    hideOverlay: [{ type: Input }],
    disabled: [{ type: Input }],
    templateRef: [{ type: ViewChild, args: [TemplateRef,] }]
};
if (false) {
    /** @type {?} */
    MatCarouselSlideComponent.prototype.image;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.overlayColor;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.hideOverlay;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.disabled;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.templateRef;
    /** @type {?} */
    MatCarouselSlideComponent.prototype.sanitizer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2Fyb3VzZWwvc3JjL2xpYi9jYXJvdXNlbC1zbGlkZS9jYXJvdXNlbC1zbGlkZS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFDQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFFTCxXQUFXLEVBQ1gsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQWEsTUFBTSwyQkFBMkIsQ0FBQztBQVNwRSxNQUFNLE9BQU8seUJBQXlCOzs7O0lBU3BDLFlBQW1CLFNBQXVCO1FBQXZCLGNBQVMsR0FBVCxTQUFTLENBQWM7UUFOMUIsaUJBQVksR0FBRyxXQUFXLENBQUM7UUFDM0IsZ0JBQVcsR0FBRyxLQUFLLENBQUM7UUFDcEIsYUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLGtDQUFrQztJQUtwRSxDQUFDOzs7O0lBRU0sUUFBUTtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxRQUFRLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1NBQzlFO0lBQ0gsQ0FBQzs7O1lBckJGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsb0JBQW9CO2dCQUM5QixtVkFBOEM7O2FBRS9DOzs7O1lBUlEsWUFBWTs7O29CQVdsQixLQUFLOzJCQUNMLEtBQUs7MEJBQ0wsS0FBSzt1QkFDTCxLQUFLOzBCQUVMLFNBQVMsU0FBQyxXQUFXOzs7O0lBTHRCLDBDQUFpQzs7SUFDakMsaURBQTJDOztJQUMzQyxnREFBb0M7O0lBQ3BDLDZDQUFpQzs7SUFFakMsZ0RBQTZEOztJQUVqRCw4Q0FBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBMaXN0S2V5TWFuYWdlck9wdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9hMTF5JztcbmltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgVGVtcGxhdGVSZWYsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGUgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbWF0LWNhcm91c2VsLXNsaWRlJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2Fyb3VzZWwtc2xpZGUuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50XG4gIGltcGxlbWVudHMgTGlzdEtleU1hbmFnZXJPcHRpb24sIE1hdENhcm91c2VsU2xpZGUsIE9uSW5pdCB7XG4gIEBJbnB1dCgpIHB1YmxpYyBpbWFnZTogU2FmZVN0eWxlO1xuICBASW5wdXQoKSBwdWJsaWMgb3ZlcmxheUNvbG9yID0gJyMwMDAwMDA0MCc7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlT3ZlcmxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBwdWJsaWMgZGlzYWJsZWQgPSBmYWxzZTsgLy8gaW1wbGVtZW50cyBMaXN0S2V5TWFuYWdlck9wdGlvblxuXG4gIEBWaWV3Q2hpbGQoVGVtcGxhdGVSZWYpIHB1YmxpYyB0ZW1wbGF0ZVJlZjogVGVtcGxhdGVSZWY8YW55PjtcbiAgICBcbiAgY29uc3RydWN0b3IocHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7XG4gIH1cblxuICBwdWJsaWMgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW1hZ2UpIHtcbiAgICAgIHRoaXMuaW1hZ2UgPSB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYHVybChcIiR7dGhpcy5pbWFnZX1cIilgKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==