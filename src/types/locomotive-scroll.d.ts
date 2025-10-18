declare module "locomotive-scroll" {
  export type ScrollTarget = HTMLElement | string | number;

  export type ScrollEventCallback = (...args: unknown[]) => void;

  export interface LocomotiveScrollOptions {
    el: HTMLElement;
    smooth?: boolean;
    multiplier?: number;
    lerp?: number;
    tablet?: {
      smooth?: boolean;
      breakpoint?: number;
    };
    smartphone?: {
      smooth?: boolean;
    };
    [key: string]: unknown;
  }

  export default class LocomotiveScroll {
    constructor(options?: Partial<LocomotiveScrollOptions>);
    update(): void;
    destroy(): void;
    scrollTo(target: ScrollTarget, options?: Record<string, unknown>): void;
    on(event: string, callback: ScrollEventCallback): void;
    off(event: string, callback: ScrollEventCallback): void;
  }
}
