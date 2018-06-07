在style.scss中添加样式即可使用

```scss
.hairline {
  position: relative;
  &:before {
    content: '';
    position: absolute;
    display: var(--display);
    background-color: var(--color);
    z-index: 1;
    top: var(--top);
    right: var(--right);
    bottom: var(--bottom);
    left: var(--left);
    width: var(--width);
    height: var(--height);
    transform-origin: var(--originX) var(--originY);
    transform: scale(var(--scaleX), var(--scaleY));
    box-sizing: border-box;
    pointer-events: none;
    border: var(--border);
    border-radius: var(--borderRadius);
  }
}
```

```html
<div class="h40" [hairline]="hairline" hairlineColor="red">
  变
</div>
```

```ts
hairline: string = 'top';
setInterval(() => {
    if (this.hairline === 'top') {
    this.hairline = 'right';
    } else if (this.hairline === 'right') {
    this.hairline = 'bottom';
    } else if (this.hairline === 'bottom') {
    this.hairline = 'left';
    } else if (this.hairline === 'left') {
    this.hairline = 'all';
    } else if (this.hairline === 'all') {
    this.hairline = 'none';
    } else if (this.hairline === 'none') {
    this.hairline = 'top';
    }
    this._cd.markForCheck();
}, 1000);
```