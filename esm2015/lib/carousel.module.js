/**
 * @fileoverview added by tsickle
 * Generated from: lib/carousel.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselComponent } from './carousel.component';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
// https://github.com/angular/angular/issues/10541#issuecomment-300761387
export class MatCarouselHammerConfig extends HammerGestureConfig {
    constructor() {
        super(...arguments);
        this.overrides = {
            pinch: { enable: false },
            rotate: { enable: false }
        };
    }
}
MatCarouselHammerConfig.decorators = [
    { type: Injectable }
];
if (false) {
    /** @type {?} */
    MatCarouselHammerConfig.prototype.overrides;
}
export class MatCarouselModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: MatCarouselModule,
            providers: [
                { provide: HAMMER_GESTURE_CONFIG, useClass: MatCarouselHammerConfig }
            ]
        };
    }
}
MatCarouselModule.decorators = [
    { type: NgModule, args: [{
                declarations: [MatCarouselComponent, MatCarouselSlideComponent],
                imports: [CommonModule, MatButtonModule, MatIconModule, HammerModule],
                exports: [MatCarouselComponent, MatCarouselSlideComponent]
            },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2Fyb3VzZWwvc3JjL2xpYi9jYXJvdXNlbC5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUMzRCxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFdkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDNUQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7QUFDdEYsT0FBTyxFQUNMLG1CQUFtQixFQUNuQixxQkFBcUIsRUFDckIsWUFBWSxFQUNiLE1BQU0sMkJBQTJCLENBQUM7O0FBSW5DLE1BQU0sT0FBTyx1QkFBd0IsU0FBUSxtQkFBbUI7SUFEaEU7O1FBRUUsY0FBUyxHQUFHO1lBQ1YsS0FBSyxFQUFFLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRTtZQUN4QixNQUFNLEVBQUUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFO1NBQzFCLENBQUM7SUFDSixDQUFDOzs7WUFOQSxVQUFVOzs7O0lBRVQsNENBR0U7O0FBT0osTUFBTSxPQUFPLGlCQUFpQjs7OztJQUM1QixNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFNBQVMsRUFBRTtnQkFDVCxFQUFFLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxRQUFRLEVBQUUsdUJBQXVCLEVBQUU7YUFDdEU7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBYkYsUUFBUSxTQUFDO2dCQUNSLFlBQVksRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDO2dCQUMvRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsZUFBZSxFQUFFLGFBQWEsRUFBRSxZQUFZLENBQUM7Z0JBQ3JFLE9BQU8sRUFBRSxDQUFDLG9CQUFvQixFQUFFLHlCQUF5QixDQUFDO2FBQzNEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIEluamVjdGFibGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SWNvbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL2ljb24nO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbENvbXBvbmVudCB9IGZyb20gJy4vY2Fyb3VzZWwuY29tcG9uZW50JztcbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBIYW1tZXJHZXN0dXJlQ29uZmlnLFxuICBIQU1NRVJfR0VTVFVSRV9DT05GSUcsXG4gIEhhbW1lck1vZHVsZVxufSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvYW5ndWxhci9pc3N1ZXMvMTA1NDEjaXNzdWVjb21tZW50LTMwMDc2MTM4N1xuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIGV4dGVuZHMgSGFtbWVyR2VzdHVyZUNvbmZpZyB7XG4gIG92ZXJyaWRlcyA9IHtcbiAgICBwaW5jaDogeyBlbmFibGU6IGZhbHNlIH0sXG4gICAgcm90YXRlOiB7IGVuYWJsZTogZmFsc2UgfVxuICB9O1xufVxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbTWF0Q2Fyb3VzZWxDb21wb25lbnQsIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRdLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBNYXRCdXR0b25Nb2R1bGUsIE1hdEljb25Nb2R1bGUsIEhhbW1lck1vZHVsZV0sXG4gIGV4cG9ydHM6IFtNYXRDYXJvdXNlbENvbXBvbmVudCwgTWF0Q2Fyb3VzZWxTbGlkZUNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPE1hdENhcm91c2VsTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBNYXRDYXJvdXNlbE1vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICB7IHByb3ZpZGU6IEhBTU1FUl9HRVNUVVJFX0NPTkZJRywgdXNlQ2xhc3M6IE1hdENhcm91c2VsSGFtbWVyQ29uZmlnIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=