import { NgModule, Provider, HostBinding } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { ElementRef } from '@angular/core';
import { Directive, Input } from '@angular/core';
import { Iwe7IcssService } from 'iwe7-icss';

export abstract class HairLineBuilder {
  left: HairLineRef;
  right: HairLineRef;
  top: HairLineRef;
  bottom: HairLineRef;
  all: HairLineRef;
  none: HairLineRef;
  abstract getLine(name: string): HairLineRef;
}

export class HairLineBuilderDefault extends HairLineBuilder {
  constructor(
    public left: HairLineRef,
    public right: HairLineRef,
    public top: HairLineRef,
    public bottom: HairLineRef,
    public all: HairLineRef,
    public none: HairLineNone
  ) {
    super();
  }
  getLine(name: string): HairLineRef {
    return this[name] ? this[name] : this.top;
  }
}

export abstract class HairLineRef {
  color: string;
  top: string;
  right: string;
  left: string;
  bottom: string;
  width: string;
  height: string;
  originX: string;
  originY: string;
  scaleX: string;
  scaleY: string;
  display: string;
}

export class HairLineNone extends HairLineRef {
  display: string = 'none';
  color: string = '#efefef';
  top: string = '0px';
  right: string = 'auto';
  left: string = '0px';
  bottom: string = 'auto';
  width: string = '100%';
  height: string = '1px';
  originX: string = '50%';
  originY: string = '50%';
  scaleX: string = '1';
  scaleY: string = '0.5';
}

export class HairLineTop extends HairLineRef {
  display: string = 'block';
  color: string = '#efefef';
  top: string = '0px';
  right: string = 'auto';
  left: string = '0px';
  bottom: string = 'auto';
  width: string = '100%';
  height: string = '1px';
  originX: string = '50%';
  originY: string = '50%';
  scaleX: string = '1';
  scaleY: string = '0.5';
}

export class HairLineRight extends HairLineRef {
  display: string = 'block';
  color: string = '#efefef';
  top: string = '0px';
  right: string = '0px';
  bottom: string = 'auto';
  left: string = 'auto';
  width: string = '1px';
  height: string = '100%';
  originX: string = '100%';
  originY: string = '50%';
  scaleX: string = '0.5';
  scaleY: string = '1';
}

export class HairLineBottom extends HairLineRef {
  display: string = 'block';
  color: string = '#efefef';
  top: string = 'auto';
  right: string = 'auto';
  bottom: string = '0px';
  left: string = 'opx';
  width: string = '100%';
  height: string = '1px';
  originX: string = '50%';
  originY: string = '100%';
  scaleX: string = '1';
  scaleY: string = '0.5';
}

export class HairLineLeft extends HairLineRef {
  display: string = 'block';
  color: string = '#efefef';
  top: string = '0px';
  right: string = 'auto';
  bottom: string = 'auto';
  left: string = '0px';
  width: string = '1px';
  height: string = '100%';
  originX: string = '100%';
  originY: string = '50%';
  scaleX: string = '0.5';
  scaleY: string = '1';
}

export class HairLineAll extends HairLineRef {
  display: string = 'block';
  color: string = 'none';
  top: string = '0px';
  right: string = 'auto';
  bottom: string = 'auto';
  left: string = '0px';
  width: string = '200%';
  height: string = '200%';
  originX: string = '0';
  originY: string = '0';
  scaleX: string = '0.5';
  scaleY: string = '0.5';
  borderRadius: string = '0px';
  border: string = '1px solid #efefef';
}

export const HairLineProvider: Provider[] = [
  HairLineLeft, HairLineRight, HairLineTop, HairLineBottom, HairLineAll, HairLineNone, {
    provide: HairLineBuilder,
    useClass: HairLineBuilderDefault,
    deps: [HairLineLeft, HairLineRight, HairLineTop, HairLineBottom, HairLineAll, HairLineNone]
  }];

export type HairlineType = 'top' | 'right' | 'bottom' | 'left' | 'all' | 'none';
@Directive({ selector: '[hairline],[hairlineColor]', providers: [HairLineProvider] })
export class HairlineDirective extends BehaviorSubject<any> {
  @HostBinding('class.hairline') hairlineClass: boolean = true;
  _color: string = '#efefef';
  @Input()
  set hairlineColor(val: string) {
    this.next({
      color: val
    });
    this._color = val;
  }
  get hairlineColor() {
    return this._color;
  }
  @Input()
  set hairline(val: HairlineType) {
    if (val === 'all') {
      this.next({
        ...this.hairlineBuilder.getLine(val),
        ...{
          border: '1px solid ' + this.hairlineColor
        }
      });
    } else {
      this.next({
        ...this.hairlineBuilder.getLine(val),
        ...{
          color: this.hairlineColor
        }
      });
    }
  }
  constructor(
    public icss: Iwe7IcssService,
    public ele: ElementRef,
    public hairlineBuilder: HairLineBuilder
  ) {
    super({});
    this.icss.init(this, this.ele).subscribe(res => console.log(res));
  }
}

@NgModule({
  imports: [],
  declarations: [HairlineDirective],
  exports: [HairlineDirective]
})
export class Iwe7HairlineModule { }
