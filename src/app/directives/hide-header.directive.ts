import { Directive, Input, Renderer2 } from '@angular/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective {
  @Input('header') header: any;
  private lastY: number = 0;

  constructor(
    private renderer: Renderer2,
    private domtrl: DomController
  ) { }

  ngOnInit() {
    this.header = this.header;

    this.domtrl.write(() => {
      this.renderer.setStyle(this.header, 'transition', 'margin-top 400ms');
    });
    console.log(this.header);
    
  }

  onContentScroll(event: any) {
    console.log(event);
    if (event.detail.scrollTop > this.lastY) {
      this.domtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', `-44px`);
      });
    } else {
      this.domtrl.write(() => {
        this.renderer.setStyle(this.header, 'margin-top', '0');
      });
    }
    this.lastY = event.detail.scrollTop;
  }
}
