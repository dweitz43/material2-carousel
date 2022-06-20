/**
 * @fileoverview added by tsickle
 * Generated from: lib/carousel.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { animate, style, AnimationBuilder } from '@angular/animations';
import { ListKeyManager } from '@angular/cdk/a11y';
import { isPlatformBrowser } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, PLATFORM_ID, QueryList, Renderer2, ViewChild } from '@angular/core';
import { interval, BehaviorSubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { MatCarouselSlideComponent } from './carousel-slide/carousel-slide.component';
/** @enum {number} */
const Direction = {
    Left: 0,
    Right: 1,
    Index: 2,
};
Direction[Direction.Left] = 'Left';
Direction[Direction.Right] = 'Right';
Direction[Direction.Index] = 'Index';
export class MatCarouselComponent {
    /**
     * @param {?} animationBuilder
     * @param {?} renderer
     * @param {?} platformId
     */
    constructor(animationBuilder, renderer, platformId) {
        this.animationBuilder = animationBuilder;
        this.renderer = renderer;
        this.platformId = platformId;
        this.timings = '250ms ease-in';
        this.hideArrows = true;
        this.hideIndicators = true;
        this.pauseOnHover = true;
        this.color = 'accent';
        this.maintainAspectRatio = true;
        this.proportion = 25;
        this.slideHeight = '100%';
        this.useKeyboard = false;
        this.useMouseWheel = false;
        this.animationStart = new EventEmitter();
        this.change = new EventEmitter();
        this._autoplay = true;
        this.autoplay$ = new Subject();
        this.interval$ = new BehaviorSubject(5000);
        this.slides$ = new BehaviorSubject(null);
        this._maxWidth = 'auto';
        this.maxWidth$ = new Subject();
        this._loop = true;
        this.loop$ = new Subject();
        this._orientation = 'ltr';
        this.orientation$ = new Subject();
        this.timerStop$ = new Subject();
        this.destroy$ = new Subject();
        this.playing = false;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set autoplay(value) {
        this.autoplay$.next(value);
        this._autoplay = value;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set interval(value) {
        this.interval$.next(value);
    }
    /**
     * @return {?}
     */
    get loop() {
        return this._loop;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set loop(value) {
        this.loop$.next(value);
        this._loop = value;
    }
    /**
     * @return {?}
     */
    get maxWidth() {
        return this._maxWidth;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set maxWidth(value) {
        this._maxWidth = value;
        this.maxWidth$.next();
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set slides(value) {
        this.slides$.next(value);
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set orientation(value) {
        this.orientation$.next(value);
        this._orientation = value;
    }
    /**
     * @return {?}
     */
    get currentIndex() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItemIndex;
        }
        return 0;
    }
    /**
     * @return {?}
     */
    get currentSlide() {
        if (this.listKeyManager) {
            return this.listKeyManager.activeItem;
        }
        return null;
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this.listKeyManager = new ListKeyManager(this.slidesList)
            .withVerticalOrientation(false)
            .withHorizontalOrientation(this._orientation)
            .withWrap(this._loop);
        this.listKeyManager.updateActiveItem(0);
        this.listKeyManager.change
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.playAnimation()));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.autoplay$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.stopTimer();
            this.startTimer(value);
        }));
        this.interval$.pipe(takeUntil(this.destroy$)).subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => {
            this.stopTimer();
            this.resetTimer(value);
            this.startTimer(this._autoplay);
        }));
        this.maxWidth$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        () => this.slideTo(0)));
        this.loop$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.listKeyManager.withWrap(value)));
        this.orientation$
            .pipe(takeUntil(this.destroy$))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.listKeyManager.withHorizontalOrientation(value)));
        this.slides$
            .pipe(takeUntil(this.destroy$), filter((/**
         * @param {?} value
         * @return {?}
         */
        value => value && value < this.slidesList.length)))
            .subscribe((/**
         * @param {?} value
         * @return {?}
         */
        value => this.resetSlides(value)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
    /**
     * @return {?}
     */
    next() {
        this.goto(Direction.Right);
    }
    /**
     * @return {?}
     */
    previous() {
        this.goto(Direction.Left);
    }
    /**
     * @param {?} index
     * @return {?}
     */
    slideTo(index) {
        this.goto(Direction.Index, index);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onKeyUp(event) {
        if (this.useKeyboard && !this.playing) {
            this.listKeyManager.onKeydown(event);
        }
    }
    /**
     * @return {?}
     */
    onMouseEnter() {
        if (this.pauseOnHover) {
            this.stopTimer();
        }
    }
    /**
     * @return {?}
     */
    onMouseLeave() {
        if (this.pauseOnHover) {
            this.startTimer(this._autoplay);
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        if (this.useMouseWheel) {
            event.preventDefault(); // prevent window to scroll
            // prevent window to scroll
            /** @type {?} */
            const Δ = Math.sign(event.deltaY);
            if (Δ > 0) {
                this.next();
            }
            else if (Δ < 0) {
                this.previous();
            }
        }
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        // Reset carousel when window is resized
        // in order to avoid major glitches.
        this.slideTo(0);
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPan(event, slideElem) {
        // https://github.com/angular/angular/issues/10541#issuecomment-346539242
        // if y velocity is greater, it's a panup/pandown, so ignore.
        if (Math.abs(event.velocityY) > Math.abs(event.velocityX)) {
            return;
        }
        /** @type {?} */
        let Δx = event.deltaX;
        if (this.isOutOfBounds()) {
            Δx *= 0.2; // decelerate movement;
        }
        this.renderer.setStyle(slideElem, 'cursor', 'grabbing');
        this.renderer.setStyle(this.carouselList.nativeElement, 'transform', this.getTranslation(this.getOffset() + Δx));
    }
    /**
     * @param {?} event
     * @param {?} slideElem
     * @return {?}
     */
    onPanEnd(event, slideElem) {
        this.renderer.removeStyle(slideElem, 'cursor');
        if (!this.isOutOfBounds() &&
            Math.abs(event.deltaX) > this.getWidth() * 0.25) {
            if (event.deltaX <= 0) {
                this.next();
                return;
            }
            this.previous();
            return;
        }
        this.playAnimation(); // slide back, don't change current index
    }
    /**
     * @private
     * @return {?}
     */
    isOutOfBounds() {
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? -1 : 1;
        /** @type {?} */
        const left = sign *
            (this.carouselList.nativeElement.getBoundingClientRect().left -
                this.carouselList.nativeElement.offsetParent.getBoundingClientRect()
                    .left);
        /** @type {?} */
        const lastIndex = this.slidesList.length - 1;
        /** @type {?} */
        const width = -this.getWidth() * lastIndex;
        return ((this.listKeyManager.activeItemIndex === 0 && left >= 0) ||
            (this.listKeyManager.activeItemIndex === lastIndex && left <= width));
    }
    /**
     * @private
     * @return {?}
     */
    isVisible() {
        if (!isPlatformBrowser(this.platformId)) {
            return false;
        }
        /** @type {?} */
        const elem = this.carouselContainer.nativeElement;
        /** @type {?} */
        const docViewTop = window.pageYOffset;
        /** @type {?} */
        const docViewBottom = docViewTop + window.innerHeight;
        /** @type {?} */
        const elemOffset = elem.getBoundingClientRect();
        /** @type {?} */
        const elemTop = docViewTop + elemOffset.top;
        /** @type {?} */
        const elemBottom = elemTop + elemOffset.height;
        return elemBottom <= docViewBottom || elemTop >= docViewTop;
    }
    /**
     * @private
     * @return {?}
     */
    getOffset() {
        /** @type {?} */
        const offset = this.listKeyManager.activeItemIndex * this.getWidth();
        /** @type {?} */
        const sign = this.orientation === 'rtl' ? 1 : -1;
        return sign * offset;
    }
    /**
     * @private
     * @param {?} offset
     * @return {?}
     */
    getTranslation(offset) {
        return `translateX(${offset}px)`;
    }
    /**
     * @private
     * @return {?}
     */
    getWidth() {
        return this.carouselContainer.nativeElement.clientWidth;
    }
    /**
     * @private
     * @param {?} direction
     * @param {?=} index
     * @return {?}
     */
    goto(direction, index) {
        if (!this.playing) {
            /** @type {?} */
            const rtl = this.orientation === 'rtl';
            switch (direction) {
                case Direction.Left:
                    return rtl
                        ? this.listKeyManager.setNextItemActive()
                        : this.listKeyManager.setPreviousItemActive();
                case Direction.Right:
                    return rtl
                        ? this.listKeyManager.setPreviousItemActive()
                        : this.listKeyManager.setNextItemActive();
                case Direction.Index:
                    return this.listKeyManager.setActiveItem(index);
            }
        }
    }
    /**
     * @private
     * @return {?}
     */
    playAnimation() {
        /** @type {?} */
        const translation = this.getTranslation(this.getOffset());
        /** @type {?} */
        const factory = this.animationBuilder.build(animate(this.timings, style({ transform: translation })));
        /** @type {?} */
        const animation = factory.create(this.carouselList.nativeElement);
        animation.onStart((/**
         * @return {?}
         */
        () => {
            this.playing = true;
            this.animationStart.emit(this.currentIndex);
        }));
        animation.onDone((/**
         * @return {?}
         */
        () => {
            this.change.emit(this.currentIndex);
            this.playing = false;
            this.renderer.setStyle(this.carouselList.nativeElement, 'transform', translation);
            animation.destroy();
        }));
        animation.play();
    }
    /**
     * @private
     * @param {?} slides
     * @return {?}
     */
    resetSlides(slides) {
        this.slidesList.reset(this.slidesList.toArray().slice(0, slides));
    }
    /**
     * @private
     * @param {?} value
     * @return {?}
     */
    resetTimer(value) {
        this.timer$ = interval(value);
    }
    /**
     * @private
     * @param {?} autoplay
     * @return {?}
     */
    startTimer(autoplay) {
        if (!autoplay) {
            return;
        }
        this.timer$
            .pipe(takeUntil(this.timerStop$), takeUntil(this.destroy$), filter((/**
         * @return {?}
         */
        () => this.isVisible())))
            .subscribe((/**
         * @return {?}
         */
        () => {
            this.listKeyManager.withWrap(true).setNextItemActive();
            this.listKeyManager.withWrap(this.loop);
        }));
    }
    /**
     * @private
     * @return {?}
     */
    stopTimer() {
        this.timerStop$.next();
    }
}
MatCarouselComponent.decorators = [
    { type: Component, args: [{
                selector: 'mat-carousel',
                template: "<div\n  #carouselContainer\n  class=\"carousel\"\n  tabindex=\"0\"\n  [style.max-width]=\"maxWidth\"\n  [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n>\n  <ul\n    #carouselList\n    class=\"carousel-list\"\n    role=\"listbox\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n    [style.height]=\"!maintainAspectRatio ? '100%' : 'auto'\"\n  >\n    <li\n      #carouselSlide\n      *ngFor=\"let slide of slidesList\"\n      class=\"carousel-slide\"\n      role=\"option\"\n      [style.padding-bottom]=\"maintainAspectRatio && proportion ? proportion + '%': '0px'\"\n      [style.height]=\"!maintainAspectRatio && slideHeight ? slideHeight : '0px'\"\n      (panleft)=\"onPan($event, carouselSlide)\"\n      (panright)=\"onPan($event, carouselSlide)\"\n      (panend)=\"onPanEnd($event, carouselSlide)\"\n      (pancancel)=\"onPanEnd($event, carouselSlide)\"\n    >\n      <ng-container [ngTemplateOutlet]=\"slide.templateRef\"></ng-container>\n    </li>\n  </ul>\n\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == 0\"\n    (click)=\"previous()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowBack; else: defaultArrowBack\"\n      [svgIcon]=\"svgIconOverrides.arrowBack\"\n    ></mat-icon>\n    <ng-template #defaultArrowBack>\n      <mat-icon>arrow_back</mat-icon>\n    </ng-template>\n  </button>\n  <button\n    *ngIf=\"!hideArrows\"\n    mat-icon-button\n    type=\"button\"\n    tabindex=\"-1\"\n    [color]=\"color\"\n    [disabled]=\"!loop && currentIndex == slidesList.length - 1\"\n    (click)=\"next()\"\n  >\n    <mat-icon\n      *ngIf=\"svgIconOverrides?.arrowForward; else: defaultArrowForward\"\n      [svgIcon]=\"svgIconOverrides.arrowForward\"\n    ></mat-icon>\n    <ng-template #defaultArrowForward>\n      <mat-icon>arrow_forward</mat-icon>\n    </ng-template>\n  </button>\n\n  <div\n    *ngIf=\"!hideIndicators\"\n    class=\"carousel-indicators\"\n    tabindex=\"-1\"\n    [style.flex-direction]=\"orientation === 'rtl' ? 'row-reverse' : 'row'\"\n  >\n    <button\n      *ngFor=\"let slide of slidesList; let i = index\"\n      type=\"button\"\n      tabindex=\"-1\"\n      mat-mini-fab\n      [color]=\"color\"\n      [disabled]=\"i == currentIndex\"\n      (click)=\"slideTo(i)\"\n      (focus)=\"carouselContainer.focus()\"\n    ></button>\n  </div>\n</div>\n",
                styles: [".carousel{outline:none;overflow:hidden;position:relative;width:100%}.carousel>button{position:absolute;top:50%;transform:translateY(-50%);z-index:1}.carousel>button:first-of-type{left:30px}.carousel>button:last-of-type{right:30px}.carousel-list{list-style:none;margin:0;padding:0}.carousel-list,.carousel-slide{display:flex;position:relative;width:100%}.carousel-slide{flex-shrink:0;height:0}.carousel-slide:hover{cursor:-webkit-grab;cursor:grab}.carousel-indicators{bottom:15px;display:flex;left:50%;outline:none;position:absolute;transform:translateX(-50%);z-index:1}.carousel-indicators>button{height:10px;margin:7.5px;width:10px}"]
            }] }
];
/** @nocollapse */
MatCarouselComponent.ctorParameters = () => [
    { type: AnimationBuilder },
    { type: Renderer2 },
    { type: undefined, decorators: [{ type: Inject, args: [PLATFORM_ID,] }] }
];
MatCarouselComponent.propDecorators = {
    timings: [{ type: Input }],
    svgIconOverrides: [{ type: Input }],
    autoplay: [{ type: Input }],
    interval: [{ type: Input }],
    loop: [{ type: Input }],
    hideArrows: [{ type: Input }],
    hideIndicators: [{ type: Input }],
    pauseOnHover: [{ type: Input }],
    color: [{ type: Input }],
    maxWidth: [{ type: Input }],
    maintainAspectRatio: [{ type: Input }],
    proportion: [{ type: Input }],
    slideHeight: [{ type: Input }],
    slides: [{ type: Input }],
    useKeyboard: [{ type: Input }],
    useMouseWheel: [{ type: Input }],
    orientation: [{ type: Input }],
    animationStart: [{ type: Output }],
    change: [{ type: Output }],
    slidesList: [{ type: ContentChildren, args: [MatCarouselSlideComponent,] }],
    carouselContainer: [{ type: ViewChild, args: ['carouselContainer',] }],
    carouselList: [{ type: ViewChild, args: ['carouselList',] }],
    onKeyUp: [{ type: HostListener, args: ['keyup', ['$event'],] }],
    onMouseEnter: [{ type: HostListener, args: ['mouseenter',] }],
    onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }],
    onMouseWheel: [{ type: HostListener, args: ['mousewheel', ['$event'],] }],
    onResize: [{ type: HostListener, args: ['window:resize', ['$event'],] }]
};
if (false) {
    /** @type {?} */
    MatCarouselComponent.prototype.timings;
    /** @type {?} */
    MatCarouselComponent.prototype.svgIconOverrides;
    /** @type {?} */
    MatCarouselComponent.prototype.hideArrows;
    /** @type {?} */
    MatCarouselComponent.prototype.hideIndicators;
    /** @type {?} */
    MatCarouselComponent.prototype.pauseOnHover;
    /** @type {?} */
    MatCarouselComponent.prototype.color;
    /** @type {?} */
    MatCarouselComponent.prototype.maintainAspectRatio;
    /** @type {?} */
    MatCarouselComponent.prototype.proportion;
    /** @type {?} */
    MatCarouselComponent.prototype.slideHeight;
    /** @type {?} */
    MatCarouselComponent.prototype.useKeyboard;
    /** @type {?} */
    MatCarouselComponent.prototype.useMouseWheel;
    /** @type {?} */
    MatCarouselComponent.prototype.animationStart;
    /** @type {?} */
    MatCarouselComponent.prototype.change;
    /** @type {?} */
    MatCarouselComponent.prototype.slidesList;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselContainer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.carouselList;
    /** @type {?} */
    MatCarouselComponent.prototype.listKeyManager;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._autoplay;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.autoplay$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.interval$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.slides$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._maxWidth;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.maxWidth$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._loop;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.loop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.orientation$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timer$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.timerStop$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.destroy$;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.playing;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.animationBuilder;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    MatCarouselComponent.prototype.platformId;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2Fyb3VzZWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY2Fyb3VzZWwvc3JjL2xpYi9jYXJvdXNlbC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ3ZFLE9BQU8sRUFBRSxjQUFjLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNuRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNwRCxPQUFPLEVBR0wsU0FBUyxFQUNULGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUVMLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFFLFFBQVEsRUFBRSxlQUFlLEVBQWMsT0FBTyxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHbkQsT0FBTyxFQUFFLHlCQUF5QixFQUFFLE1BQU0sMkNBQTJDLENBQUM7O0FBRXRGLE1BQUssU0FBUztJQUNaLElBQUksR0FBQTtJQUNKLEtBQUssR0FBQTtJQUNMLEtBQUssR0FBQTtFQUNOOzs7O0FBT0QsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7O0lBK0cvQixZQUNVLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNFLFVBQVU7UUFGL0IscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ0UsZUFBVSxHQUFWLFVBQVUsQ0FBQTtRQWhIekIsWUFBTyxHQUFHLGVBQWUsQ0FBQztRQXVCMUIsZUFBVSxHQUFHLElBQUksQ0FBQztRQUNsQixtQkFBYyxHQUFHLElBQUksQ0FBQztRQUN0QixpQkFBWSxHQUFHLElBQUksQ0FBQztRQUNwQixVQUFLLEdBQWlCLFFBQVEsQ0FBQztRQVcvQix3QkFBbUIsR0FBRyxJQUFJLENBQUM7UUFDM0IsZUFBVSxHQUFHLEVBQUUsQ0FBQztRQUNoQixnQkFBVyxHQUFHLE1BQU0sQ0FBQztRQU9yQixnQkFBVyxHQUFHLEtBQUssQ0FBQztRQUNwQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQVkvQixtQkFBYyxHQUF5QixJQUFJLFlBQVksRUFBVSxDQUFDO1FBR2xFLFdBQU0sR0FBeUIsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQTBCekQsY0FBUyxHQUFHLElBQUksQ0FBQztRQUNqQixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVcsQ0FBQztRQUVuQyxjQUFTLEdBQUcsSUFBSSxlQUFlLENBQVMsSUFBSSxDQUFDLENBQUM7UUFDOUMsWUFBTyxHQUFHLElBQUksZUFBZSxDQUFTLElBQUksQ0FBQyxDQUFDO1FBRTVDLGNBQVMsR0FBRyxNQUFNLENBQUM7UUFDbkIsY0FBUyxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFFakMsVUFBSyxHQUFHLElBQUksQ0FBQztRQUNiLFVBQUssR0FBRyxJQUFJLE9BQU8sRUFBVyxDQUFDO1FBRS9CLGlCQUFZLEdBQWdCLEtBQUssQ0FBQztRQUNsQyxpQkFBWSxHQUFHLElBQUksT0FBTyxFQUFlLENBQUM7UUFHMUMsZUFBVSxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFFbEMsYUFBUSxHQUFHLElBQUksT0FBTyxFQUFTLENBQUM7UUFDaEMsWUFBTyxHQUFHLEtBQUssQ0FBQztJQU1yQixDQUFDOzs7OztJQTlHSixJQUNXLFFBQVEsQ0FBQyxLQUFjO1FBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzNCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLENBQUM7Ozs7O0lBRUQsSUFDVyxRQUFRLENBQUMsS0FBYTtRQUMvQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM3QixDQUFDOzs7O0lBRUQsSUFBVyxJQUFJO1FBQ2IsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7O0lBQ0QsSUFDVyxJQUFJLENBQUMsS0FBYztRQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDOzs7O0lBT0QsSUFBVyxRQUFRO1FBQ2pCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDOzs7OztJQUNELElBQ1csUUFBUSxDQUFDLEtBQWE7UUFDL0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDdkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7OztJQU1ELElBQ1csTUFBTSxDQUFDLEtBQWE7UUFDN0IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7OztJQUtELElBQVcsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDM0IsQ0FBQzs7Ozs7SUFDRCxJQUNXLFdBQVcsQ0FBQyxLQUFrQjtRQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUM1QixDQUFDOzs7O0lBUUQsSUFBVyxZQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO1NBQzVDO1FBRUQsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDOzs7O0lBQ0QsSUFBVyxZQUFZO1FBQ3JCLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsVUFBVSxDQUFDO1NBQ3ZDO1FBRUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDOzs7O0lBc0NNLGtCQUFrQjtRQUN2QixJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksY0FBYyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDdEQsdUJBQXVCLENBQUMsS0FBSyxDQUFDO2FBQzlCLHlCQUF5QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDNUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUV4QixJQUFJLENBQUMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTTthQUN2QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQzthQUM5QixTQUFTOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLEVBQUMsQ0FBQztJQUMzQyxDQUFDOzs7O0lBRU0sZUFBZTtRQUNwQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFO1lBQzlELElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNqQixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3pCLENBQUMsRUFBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRTtZQUM5RCxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDLEVBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxTQUFTO2FBQ1gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO1FBRXBDLElBQUksQ0FBQyxLQUFLO2FBQ1AsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7YUFDOUIsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUUzRCxJQUFJLENBQUMsWUFBWTthQUNkLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQzlCLFNBQVM7Ozs7UUFBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMseUJBQXlCLENBQUMsS0FBSyxDQUFDLEVBQUMsQ0FBQztRQUU1RSxJQUFJLENBQUMsT0FBTzthQUNULElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QixNQUFNOzs7O1FBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFDLENBQ3pEO2FBQ0EsU0FBUzs7OztRQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBQyxDQUFDO0lBQ2pELENBQUM7Ozs7SUFFTSxXQUFXO1FBQ2hCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUMzQixDQUFDOzs7O0lBRU0sSUFBSTtRQUNULElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzdCLENBQUM7Ozs7SUFFTSxRQUFRO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQzs7Ozs7SUFFTSxPQUFPLENBQUMsS0FBYTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFHTSxPQUFPLENBQUMsS0FBb0I7UUFDakMsSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUN0QztJQUNILENBQUM7Ozs7SUFHTSxZQUFZO1FBQ2pCLElBQUcsSUFBSSxDQUFDLFlBQVksRUFBQztZQUNuQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDbEI7SUFDSCxDQUFDOzs7O0lBR00sWUFBWTtRQUNqQixJQUFHLElBQUksQ0FBQyxZQUFZLEVBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDakM7SUFDSCxDQUFDOzs7OztJQUdNLFlBQVksQ0FBQyxLQUFpQjtRQUNuQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsMkJBQTJCOzs7a0JBQzdDLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFFakMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNULElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQzthQUNiO2lCQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1NBQ0Y7SUFDSCxDQUFDOzs7OztJQUdNLFFBQVEsQ0FBQyxLQUFZO1FBQzFCLHdDQUF3QztRQUN4QyxvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDOzs7Ozs7SUFFTSxLQUFLLENBQUMsS0FBVSxFQUFFLFNBQXNCO1FBQzdDLHlFQUF5RTtRQUN6RSw2REFBNkQ7UUFDN0QsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUN6RCxPQUFPO1NBQ1I7O1lBQ0csRUFBRSxHQUFHLEtBQUssQ0FBQyxNQUFNO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRSxFQUFFO1lBQ3hCLEVBQUUsSUFBSSxHQUFHLENBQUMsQ0FBQyx1QkFBdUI7U0FDbkM7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUNwQixJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFDL0IsV0FBVyxFQUNYLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUMzQyxDQUFDO0lBQ0osQ0FBQzs7Ozs7O0lBRU0sUUFBUSxDQUFDLEtBQVUsRUFBRSxTQUFzQjtRQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFL0MsSUFDRSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLElBQUksRUFDL0M7WUFDQSxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO2dCQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ1osT0FBTzthQUNSO1lBQ0QsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2hCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLHlDQUF5QztJQUNqRSxDQUFDOzs7OztJQUVPLGFBQWE7O2NBQ2IsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Y0FDMUMsSUFBSSxHQUNSLElBQUk7WUFDSixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSTtnQkFDM0QsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLHFCQUFxQixFQUFFO3FCQUNqRSxJQUFJLENBQUM7O2NBQ04sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLENBQUM7O2NBQ3RDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxTQUFTO1FBRTFDLE9BQU8sQ0FDTCxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxLQUFLLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ3hELENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxlQUFlLEtBQUssU0FBUyxJQUFJLElBQUksSUFBSSxLQUFLLENBQUMsQ0FDckUsQ0FBQztJQUNKLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkMsT0FBTyxLQUFLLENBQUM7U0FDZDs7Y0FFSyxJQUFJLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLGFBQWE7O2NBQzNDLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVzs7Y0FDL0IsYUFBYSxHQUFHLFVBQVUsR0FBRyxNQUFNLENBQUMsV0FBVzs7Y0FDL0MsVUFBVSxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRTs7Y0FDekMsT0FBTyxHQUFHLFVBQVUsR0FBRyxVQUFVLENBQUMsR0FBRzs7Y0FDckMsVUFBVSxHQUFHLE9BQU8sR0FBRyxVQUFVLENBQUMsTUFBTTtRQUU5QyxPQUFPLFVBQVUsSUFBSSxhQUFhLElBQUksT0FBTyxJQUFJLFVBQVUsQ0FBQztJQUM5RCxDQUFDOzs7OztJQUVPLFNBQVM7O2NBQ1QsTUFBTSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7O2NBQzlELElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEQsT0FBTyxJQUFJLEdBQUcsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Ozs7OztJQUVPLGNBQWMsQ0FBQyxNQUFjO1FBQ25DLE9BQU8sY0FBYyxNQUFNLEtBQUssQ0FBQztJQUNuQyxDQUFDOzs7OztJQUVPLFFBQVE7UUFDZCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0lBQzFELENBQUM7Ozs7Ozs7SUFFTyxJQUFJLENBQUMsU0FBb0IsRUFBRSxLQUFjO1FBQy9DLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFOztrQkFDWCxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsS0FBSyxLQUFLO1lBRXRDLFFBQVEsU0FBUyxFQUFFO2dCQUNqQixLQUFLLFNBQVMsQ0FBQyxJQUFJO29CQUNqQixPQUFPLEdBQUc7d0JBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUU7d0JBQ3pDLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLHFCQUFxQixFQUFFLENBQUM7Z0JBQ2xELEtBQUssU0FBUyxDQUFDLEtBQUs7b0JBQ2xCLE9BQU8sR0FBRzt3QkFDUixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxxQkFBcUIsRUFBRTt3QkFDN0MsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDOUMsS0FBSyxTQUFTLENBQUMsS0FBSztvQkFDbEIsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNuRDtTQUNGO0lBQ0gsQ0FBQzs7Ozs7SUFFTyxhQUFhOztjQUNiLFdBQVcsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7Y0FDbkQsT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQ3pEOztjQUNLLFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBRWpFLFNBQVMsQ0FBQyxPQUFPOzs7UUFBQyxHQUFHLEVBQUU7WUFDckIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2hELENBQUMsRUFBQyxDQUFDO1FBQ0QsU0FBUyxDQUFDLE1BQU07OztRQUFDLEdBQUcsRUFBRTtZQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQ3BCLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxFQUMvQixXQUFXLEVBQ1gsV0FBVyxDQUNaLENBQUM7WUFDRixTQUFTLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsQ0FBQyxFQUFDLENBQUM7UUFDSCxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDbkIsQ0FBQzs7Ozs7O0lBRU8sV0FBVyxDQUFDLE1BQWM7UUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDcEUsQ0FBQzs7Ozs7O0lBRU8sVUFBVSxDQUFDLEtBQWE7UUFDOUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEMsQ0FBQzs7Ozs7O0lBRU8sVUFBVSxDQUFDLFFBQWlCO1FBQ2xDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDYixPQUFPO1NBQ1I7UUFFRCxJQUFJLENBQUMsTUFBTTthQUNSLElBQUksQ0FDSCxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUMxQixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUN4QixNQUFNOzs7UUFBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUMsQ0FDL0I7YUFDQSxTQUFTOzs7UUFBQyxHQUFHLEVBQUU7WUFDZCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDLEVBQUMsQ0FBQztJQUNQLENBQUM7Ozs7O0lBRU8sU0FBUztRQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQzs7O1lBeFhGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsY0FBYztnQkFDeEIscTZFQUF3Qzs7YUFFekM7Ozs7WUFyQ3dCLGdCQUFnQjtZQWlCdkMsU0FBUzs0Q0F1SU4sTUFBTSxTQUFDLFdBQVc7OztzQkFoSHBCLEtBQUs7K0JBQ0wsS0FBSzt1QkFFTCxLQUFLO3VCQU1MLEtBQUs7bUJBUUwsS0FBSzt5QkFNTCxLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSztvQkFDTCxLQUFLO3VCQUtMLEtBQUs7a0NBTUwsS0FBSzt5QkFDTCxLQUFLOzBCQUNMLEtBQUs7cUJBRUwsS0FBSzswQkFLTCxLQUFLOzRCQUNMLEtBQUs7MEJBS0wsS0FBSzs2QkFNTCxNQUFNO3FCQUdOLE1BQU07eUJBa0JOLGVBQWUsU0FBQyx5QkFBeUI7Z0NBR3pDLFNBQVMsU0FBQyxtQkFBbUI7MkJBRzdCLFNBQVMsU0FBQyxjQUFjO3NCQTJGeEIsWUFBWSxTQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsQ0FBQzsyQkFPaEMsWUFBWSxTQUFDLFlBQVk7MkJBT3pCLFlBQVksU0FBQyxZQUFZOzJCQU96QixZQUFZLFNBQUMsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDO3VCQWNyQyxZQUFZLFNBQUMsZUFBZSxFQUFFLENBQUMsUUFBUSxDQUFDOzs7O0lBbk56Qyx1Q0FBMEM7O0lBQzFDLGdEQUFtRDs7SUFzQm5ELDBDQUFrQzs7SUFDbEMsOENBQXNDOztJQUN0Qyw0Q0FBb0M7O0lBQ3BDLHFDQUErQzs7SUFXL0MsbURBQTJDOztJQUMzQywwQ0FBZ0M7O0lBQ2hDLDJDQUFxQzs7SUFPckMsMkNBQW9DOztJQUNwQyw2Q0FBc0M7O0lBV3RDLDhDQUN5RTs7SUFFekUsc0NBQ2lFOztJQWlCakUsMENBRUU7Ozs7O0lBQ0YsaURBRUU7Ozs7O0lBQ0YsNENBQXlFOztJQUN6RSw4Q0FBaUU7Ozs7O0lBRWpFLHlDQUF5Qjs7Ozs7SUFDekIseUNBQTJDOzs7OztJQUUzQyx5Q0FBc0Q7Ozs7O0lBQ3RELHVDQUFvRDs7Ozs7SUFFcEQseUNBQTJCOzs7OztJQUMzQix5Q0FBeUM7Ozs7O0lBRXpDLHFDQUFxQjs7Ozs7SUFDckIscUNBQXVDOzs7OztJQUV2Qyw0Q0FBMEM7Ozs7O0lBQzFDLDRDQUFrRDs7Ozs7SUFFbEQsc0NBQW1DOzs7OztJQUNuQywwQ0FBMEM7Ozs7O0lBRTFDLHdDQUF3Qzs7Ozs7SUFDeEMsdUNBQXdCOzs7OztJQUd0QixnREFBMEM7Ozs7O0lBQzFDLHdDQUEyQjs7Ozs7SUFDM0IsMENBQXVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgc3R5bGUsIEFuaW1hdGlvbkJ1aWxkZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IExpc3RLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSG9zdExpc3RlbmVyLFxuICBJbmplY3QsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUExBVEZPUk1fSUQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUaGVtZVBhbGV0dGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9jb3JlJztcbmltcG9ydCB7IGludGVydmFsLCBCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YmplY3QgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBNYXRDYXJvdXNlbCwgT3JpZW50YXRpb24sIFN2Z0ljb25PdmVycmlkZXMgfSBmcm9tICcuL2Nhcm91c2VsJztcbmltcG9ydCB7IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQgfSBmcm9tICcuL2Nhcm91c2VsLXNsaWRlL2Nhcm91c2VsLXNsaWRlLmNvbXBvbmVudCc7XG5cbmVudW0gRGlyZWN0aW9uIHtcbiAgTGVmdCxcbiAgUmlnaHQsXG4gIEluZGV4XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ21hdC1jYXJvdXNlbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jYXJvdXNlbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2Nhcm91c2VsLmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTWF0Q2Fyb3VzZWxDb21wb25lbnRcbiAgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBBZnRlclZpZXdJbml0LCBNYXRDYXJvdXNlbCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgcHVibGljIHRpbWluZ3MgPSAnMjUwbXMgZWFzZS1pbic7XG4gIEBJbnB1dCgpIHB1YmxpYyBzdmdJY29uT3ZlcnJpZGVzOiBTdmdJY29uT3ZlcnJpZGVzO1xuXG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgYXV0b3BsYXkodmFsdWU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9hdXRvcGxheSA9IHZhbHVlO1xuICB9XG5cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBpbnRlcnZhbCh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5pbnRlcnZhbCQubmV4dCh2YWx1ZSk7XG4gIH1cblxuICBwdWJsaWMgZ2V0IGxvb3AoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2xvb3A7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBsb29wKHZhbHVlOiBib29sZWFuKSB7XG4gICAgdGhpcy5sb29wJC5uZXh0KHZhbHVlKTtcbiAgICB0aGlzLl9sb29wID0gdmFsdWU7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgaGlkZUFycm93cyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBoaWRlSW5kaWNhdG9ycyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwYXVzZU9uSG92ZXIgPSB0cnVlO1xuICBASW5wdXQoKSBwdWJsaWMgY29sb3I6IFRoZW1lUGFsZXR0ZSA9ICdhY2NlbnQnO1xuXG4gIHB1YmxpYyBnZXQgbWF4V2lkdGgoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4V2lkdGg7XG4gIH1cbiAgQElucHV0KClcbiAgcHVibGljIHNldCBtYXhXaWR0aCh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fbWF4V2lkdGggPSB2YWx1ZTtcbiAgICB0aGlzLm1heFdpZHRoJC5uZXh0KCk7XG4gIH1cblxuICBASW5wdXQoKSBwdWJsaWMgbWFpbnRhaW5Bc3BlY3RSYXRpbyA9IHRydWU7XG4gIEBJbnB1dCgpIHB1YmxpYyBwcm9wb3J0aW9uID0gMjU7XG4gIEBJbnB1dCgpIHB1YmxpYyBzbGlkZUhlaWdodCA9ICcxMDAlJztcblxuICBASW5wdXQoKVxuICBwdWJsaWMgc2V0IHNsaWRlcyh2YWx1ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5zbGlkZXMkLm5leHQodmFsdWUpO1xuICB9XG5cbiAgQElucHV0KCkgcHVibGljIHVzZUtleWJvYXJkID0gZmFsc2U7XG4gIEBJbnB1dCgpIHB1YmxpYyB1c2VNb3VzZVdoZWVsID0gZmFsc2U7XG5cbiAgcHVibGljIGdldCBvcmllbnRhdGlvbigpOiBPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHB1YmxpYyBzZXQgb3JpZW50YXRpb24odmFsdWU6IE9yaWVudGF0aW9uKSB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiQubmV4dCh2YWx1ZSk7XG4gICAgdGhpcy5fb3JpZW50YXRpb24gPSB2YWx1ZTtcbiAgfVxuXG4gIEBPdXRwdXQoKVxuICBwdWJsaWMgYW5pbWF0aW9uU3RhcnQ6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgQE91dHB1dCgpXG4gIHB1YmxpYyBjaGFuZ2U6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcHVibGljIGdldCBjdXJyZW50SW5kZXgoKTogbnVtYmVyIHtcbiAgICBpZiAodGhpcy5saXN0S2V5TWFuYWdlcikge1xuICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4O1xuICAgIH1cblxuICAgIHJldHVybiAwO1xuICB9XG4gIHB1YmxpYyBnZXQgY3VycmVudFNsaWRlKCk6IE1hdENhcm91c2VsU2xpZGVDb21wb25lbnQge1xuICAgIGlmICh0aGlzLmxpc3RLZXlNYW5hZ2VyKSB7XG4gICAgICByZXR1cm4gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgQENvbnRlbnRDaGlsZHJlbihNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50KSBwdWJsaWMgc2xpZGVzTGlzdDogUXVlcnlMaXN0PFxuICAgIE1hdENhcm91c2VsU2xpZGVDb21wb25lbnRcbiAgPjtcbiAgQFZpZXdDaGlsZCgnY2Fyb3VzZWxDb250YWluZXInKSBwcml2YXRlIGNhcm91c2VsQ29udGFpbmVyOiBFbGVtZW50UmVmPFxuICAgIEhUTUxEaXZFbGVtZW50XG4gID47XG4gIEBWaWV3Q2hpbGQoJ2Nhcm91c2VsTGlzdCcpIHByaXZhdGUgY2Fyb3VzZWxMaXN0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcbiAgcHVibGljIGxpc3RLZXlNYW5hZ2VyOiBMaXN0S2V5TWFuYWdlcjxNYXRDYXJvdXNlbFNsaWRlQ29tcG9uZW50PjtcblxuICBwcml2YXRlIF9hdXRvcGxheSA9IHRydWU7XG4gIHByaXZhdGUgYXV0b3BsYXkkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIGludGVydmFsJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPig1MDAwKTtcbiAgcHJpdmF0ZSBzbGlkZXMkID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KG51bGwpO1xuXG4gIHByaXZhdGUgX21heFdpZHRoID0gJ2F1dG8nO1xuICBwcml2YXRlIG1heFdpZHRoJCA9IG5ldyBTdWJqZWN0PG5ldmVyPigpO1xuXG4gIHByaXZhdGUgX2xvb3AgPSB0cnVlO1xuICBwcml2YXRlIGxvb3AkID0gbmV3IFN1YmplY3Q8Ym9vbGVhbj4oKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogT3JpZW50YXRpb24gPSAnbHRyJztcbiAgcHJpdmF0ZSBvcmllbnRhdGlvbiQgPSBuZXcgU3ViamVjdDxPcmllbnRhdGlvbj4oKTtcblxuICBwcml2YXRlIHRpbWVyJDogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICBwcml2YXRlIHRpbWVyU3RvcCQgPSBuZXcgU3ViamVjdDxuZXZlcj4oKTtcblxuICBwcml2YXRlIGRlc3Ryb3kkID0gbmV3IFN1YmplY3Q8bmV2ZXI+KCk7XG4gIHByaXZhdGUgcGxheWluZyA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkXG4gICkge31cblxuICBwdWJsaWMgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMubGlzdEtleU1hbmFnZXIgPSBuZXcgTGlzdEtleU1hbmFnZXIodGhpcy5zbGlkZXNMaXN0KVxuICAgICAgLndpdGhWZXJ0aWNhbE9yaWVudGF0aW9uKGZhbHNlKVxuICAgICAgLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odGhpcy5fb3JpZW50YXRpb24pXG4gICAgICAud2l0aFdyYXAodGhpcy5fbG9vcCk7XG5cbiAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLnVwZGF0ZUFjdGl2ZUl0ZW0oMCk7XG4gICAgdGhpcy5saXN0S2V5TWFuYWdlci5jaGFuZ2VcbiAgICAgIC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5wbGF5QW5pbWF0aW9uKCkpO1xuICB9XG5cbiAgcHVibGljIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLmF1dG9wbGF5JC5waXBlKHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSkuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgIHRoaXMuc3RvcFRpbWVyKCk7XG4gICAgICB0aGlzLnN0YXJ0VGltZXIodmFsdWUpO1xuICAgIH0pO1xuXG4gICAgdGhpcy5pbnRlcnZhbCQucGlwZSh0YWtlVW50aWwodGhpcy5kZXN0cm95JCkpLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgICAgdGhpcy5yZXNldFRpbWVyKHZhbHVlKTtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gICAgfSk7XG5cbiAgICB0aGlzLm1heFdpZHRoJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNsaWRlVG8oMCkpO1xuXG4gICAgdGhpcy5sb29wJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHZhbHVlKSk7XG5cbiAgICB0aGlzLm9yaWVudGF0aW9uJFxuICAgICAgLnBpcGUodGFrZVVudGlsKHRoaXMuZGVzdHJveSQpKVxuICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhIb3Jpem9udGFsT3JpZW50YXRpb24odmFsdWUpKTtcblxuICAgIHRoaXMuc2xpZGVzJFxuICAgICAgLnBpcGUoXG4gICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3kkKSxcbiAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICYmIHZhbHVlIDwgdGhpcy5zbGlkZXNMaXN0Lmxlbmd0aClcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5yZXNldFNsaWRlcyh2YWx1ZSkpO1xuICB9XG5cbiAgcHVibGljIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZGVzdHJveSQubmV4dCgpO1xuICAgIHRoaXMuZGVzdHJveSQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHB1YmxpYyBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uUmlnaHQpO1xuICB9XG5cbiAgcHVibGljIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMuZ290byhEaXJlY3Rpb24uTGVmdCk7XG4gIH1cblxuICBwdWJsaWMgc2xpZGVUbyhpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5nb3RvKERpcmVjdGlvbi5JbmRleCwgaW5kZXgpO1xuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcigna2V5dXAnLCBbJyRldmVudCddKVxuICBwdWJsaWMgb25LZXlVcChldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnVzZUtleWJvYXJkICYmICF0aGlzLnBsYXlpbmcpIHtcbiAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG4gIH1cblxuICBASG9zdExpc3RlbmVyKCdtb3VzZWVudGVyJylcbiAgcHVibGljIG9uTW91c2VFbnRlcigpOiB2b2lkIHtcbiAgICBpZih0aGlzLnBhdXNlT25Ib3Zlcil7XG4gICAgICB0aGlzLnN0b3BUaW1lcigpO1xuICAgIH1cbiAgfVxuXG4gIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICBwdWJsaWMgb25Nb3VzZUxlYXZlKCk6IHZvaWQge1xuICAgIGlmKHRoaXMucGF1c2VPbkhvdmVyKXtcbiAgICAgIHRoaXMuc3RhcnRUaW1lcih0aGlzLl9hdXRvcGxheSk7XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignbW91c2V3aGVlbCcsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvbk1vdXNlV2hlZWwoZXZlbnQ6IFdoZWVsRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAodGhpcy51c2VNb3VzZVdoZWVsKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpOyAvLyBwcmV2ZW50IHdpbmRvdyB0byBzY3JvbGxcbiAgICAgIGNvbnN0IM6UID0gTWF0aC5zaWduKGV2ZW50LmRlbHRhWSk7XG5cbiAgICAgIGlmICjOlCA+IDApIHtcbiAgICAgICAgdGhpcy5uZXh0KCk7XG4gICAgICB9IGVsc2UgaWYgKM6UIDwgMCkge1xuICAgICAgICB0aGlzLnByZXZpb3VzKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgQEhvc3RMaXN0ZW5lcignd2luZG93OnJlc2l6ZScsIFsnJGV2ZW50J10pXG4gIHB1YmxpYyBvblJlc2l6ZShldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICAvLyBSZXNldCBjYXJvdXNlbCB3aGVuIHdpbmRvdyBpcyByZXNpemVkXG4gICAgLy8gaW4gb3JkZXIgdG8gYXZvaWQgbWFqb3IgZ2xpdGNoZXMuXG4gICAgdGhpcy5zbGlkZVRvKDApO1xuICB9XG5cbiAgcHVibGljIG9uUGFuKGV2ZW50OiBhbnksIHNsaWRlRWxlbTogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vYW5ndWxhci9hbmd1bGFyL2lzc3Vlcy8xMDU0MSNpc3N1ZWNvbW1lbnQtMzQ2NTM5MjQyXG4gICAgLy8gaWYgeSB2ZWxvY2l0eSBpcyBncmVhdGVyLCBpdCdzIGEgcGFudXAvcGFuZG93biwgc28gaWdub3JlLlxuICAgIGlmIChNYXRoLmFicyhldmVudC52ZWxvY2l0eVkpID4gTWF0aC5hYnMoZXZlbnQudmVsb2NpdHlYKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgzpR4ID0gZXZlbnQuZGVsdGFYO1xuICAgIGlmICh0aGlzLmlzT3V0T2ZCb3VuZHMoKSkge1xuICAgICAgzpR4ICo9IDAuMjsgLy8gZGVjZWxlcmF0ZSBtb3ZlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHNsaWRlRWxlbSwgJ2N1cnNvcicsICdncmFiYmluZycpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LFxuICAgICAgJ3RyYW5zZm9ybScsXG4gICAgICB0aGlzLmdldFRyYW5zbGF0aW9uKHRoaXMuZ2V0T2Zmc2V0KCkgKyDOlHgpXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvblBhbkVuZChldmVudDogYW55LCBzbGlkZUVsZW06IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVTdHlsZShzbGlkZUVsZW0sICdjdXJzb3InKTtcblxuICAgIGlmIChcbiAgICAgICF0aGlzLmlzT3V0T2ZCb3VuZHMoKSAmJlxuICAgICAgTWF0aC5hYnMoZXZlbnQuZGVsdGFYKSA+IHRoaXMuZ2V0V2lkdGgoKSAqIDAuMjVcbiAgICApIHtcbiAgICAgIGlmIChldmVudC5kZWx0YVggPD0gMCkge1xuICAgICAgICB0aGlzLm5leHQoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcmV2aW91cygpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnBsYXlBbmltYXRpb24oKTsgLy8gc2xpZGUgYmFjaywgZG9uJ3QgY2hhbmdlIGN1cnJlbnQgaW5kZXhcbiAgfVxuXG4gIHByaXZhdGUgaXNPdXRPZkJvdW5kcygpOiBib29sZWFuIHtcbiAgICBjb25zdCBzaWduID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCcgPyAtMSA6IDE7XG4gICAgY29uc3QgbGVmdCA9XG4gICAgICBzaWduICpcbiAgICAgICh0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLVxuICAgICAgICB0aGlzLmNhcm91c2VsTGlzdC5uYXRpdmVFbGVtZW50Lm9mZnNldFBhcmVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgIC5sZWZ0KTtcbiAgICBjb25zdCBsYXN0SW5kZXggPSB0aGlzLnNsaWRlc0xpc3QubGVuZ3RoIC0gMTtcbiAgICBjb25zdCB3aWR0aCA9IC10aGlzLmdldFdpZHRoKCkgKiBsYXN0SW5kZXg7XG5cbiAgICByZXR1cm4gKFxuICAgICAgKHRoaXMubGlzdEtleU1hbmFnZXIuYWN0aXZlSXRlbUluZGV4ID09PSAwICYmIGxlZnQgPj0gMCkgfHxcbiAgICAgICh0aGlzLmxpc3RLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gbGFzdEluZGV4ICYmIGxlZnQgPD0gd2lkdGgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGVsZW0gPSB0aGlzLmNhcm91c2VsQ29udGFpbmVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZG9jVmlld1RvcCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBkb2NWaWV3Qm90dG9tID0gZG9jVmlld1RvcCArIHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCBlbGVtT2Zmc2V0ID0gZWxlbS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBlbGVtVG9wID0gZG9jVmlld1RvcCArIGVsZW1PZmZzZXQudG9wO1xuICAgIGNvbnN0IGVsZW1Cb3R0b20gPSBlbGVtVG9wICsgZWxlbU9mZnNldC5oZWlnaHQ7XG5cbiAgICByZXR1cm4gZWxlbUJvdHRvbSA8PSBkb2NWaWV3Qm90dG9tIHx8IGVsZW1Ub3AgPj0gZG9jVmlld1RvcDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0T2Zmc2V0KCk6IG51bWJlciB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5saXN0S2V5TWFuYWdlci5hY3RpdmVJdGVtSW5kZXggKiB0aGlzLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgc2lnbiA9IHRoaXMub3JpZW50YXRpb24gPT09ICdydGwnID8gMSA6IC0xO1xuICAgIHJldHVybiBzaWduICogb2Zmc2V0O1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUcmFuc2xhdGlvbihvZmZzZXQ6IG51bWJlcik6IHN0cmluZyB7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGVYKCR7b2Zmc2V0fXB4KWA7XG4gIH1cblxuICBwcml2YXRlIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY2Fyb3VzZWxDb250YWluZXIubmF0aXZlRWxlbWVudC5jbGllbnRXaWR0aDtcbiAgfVxuXG4gIHByaXZhdGUgZ290byhkaXJlY3Rpb246IERpcmVjdGlvbiwgaW5kZXg/OiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGxheWluZykge1xuICAgICAgY29uc3QgcnRsID0gdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3J0bCc7XG5cbiAgICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICAgIGNhc2UgRGlyZWN0aW9uLkxlZnQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldE5leHRJdGVtQWN0aXZlKClcbiAgICAgICAgICAgIDogdGhpcy5saXN0S2V5TWFuYWdlci5zZXRQcmV2aW91c0l0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uUmlnaHQ6XG4gICAgICAgICAgcmV0dXJuIHJ0bFxuICAgICAgICAgICAgPyB0aGlzLmxpc3RLZXlNYW5hZ2VyLnNldFByZXZpb3VzSXRlbUFjdGl2ZSgpXG4gICAgICAgICAgICA6IHRoaXMubGlzdEtleU1hbmFnZXIuc2V0TmV4dEl0ZW1BY3RpdmUoKTtcbiAgICAgICAgY2FzZSBEaXJlY3Rpb24uSW5kZXg6XG4gICAgICAgICAgcmV0dXJuIHRoaXMubGlzdEtleU1hbmFnZXIuc2V0QWN0aXZlSXRlbShpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBwbGF5QW5pbWF0aW9uKCk6IHZvaWQge1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5nZXRUcmFuc2xhdGlvbih0aGlzLmdldE9mZnNldCgpKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5hbmltYXRpb25CdWlsZGVyLmJ1aWxkKFxuICAgICAgYW5pbWF0ZSh0aGlzLnRpbWluZ3MsIHN0eWxlKHsgdHJhbnNmb3JtOiB0cmFuc2xhdGlvbiB9KSlcbiAgICApO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQpO1xuXG4gICAgYW5pbWF0aW9uLm9uU3RhcnQoKCkgPT4ge1xuICAgICAgdGhpcy5wbGF5aW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuYW5pbWF0aW9uU3RhcnQuZW1pdCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gIH0pO1xuICAgIGFuaW1hdGlvbi5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFuZ2UuZW1pdCh0aGlzLmN1cnJlbnRJbmRleCk7XG4gICAgICB0aGlzLnBsYXlpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHRoaXMuY2Fyb3VzZWxMaXN0Lm5hdGl2ZUVsZW1lbnQsXG4gICAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgICB0cmFuc2xhdGlvblxuICAgICAgKTtcbiAgICAgIGFuaW1hdGlvbi5kZXN0cm95KCk7XG4gICAgfSk7XG4gICAgYW5pbWF0aW9uLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRTbGlkZXMoc2xpZGVzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnNsaWRlc0xpc3QucmVzZXQodGhpcy5zbGlkZXNMaXN0LnRvQXJyYXkoKS5zbGljZSgwLCBzbGlkZXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVzZXRUaW1lcih2YWx1ZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lciQgPSBpbnRlcnZhbCh2YWx1ZSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0VGltZXIoYXV0b3BsYXk6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIWF1dG9wbGF5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy50aW1lciRcbiAgICAgIC5waXBlKFxuICAgICAgICB0YWtlVW50aWwodGhpcy50aW1lclN0b3AkKSxcbiAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveSQpLFxuICAgICAgICBmaWx0ZXIoKCkgPT4gdGhpcy5pc1Zpc2libGUoKSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLmxpc3RLZXlNYW5hZ2VyLndpdGhXcmFwKHRydWUpLnNldE5leHRJdGVtQWN0aXZlKCk7XG4gICAgICAgIHRoaXMubGlzdEtleU1hbmFnZXIud2l0aFdyYXAodGhpcy5sb29wKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdG9wVGltZXIoKTogdm9pZCB7XG4gICAgdGhpcy50aW1lclN0b3AkLm5leHQoKTtcbiAgfVxufVxuIl19