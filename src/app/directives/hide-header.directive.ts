import { AfterViewInit, Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { DomController, IonToolbar } from '@ionic/angular';
import { ScrollDetail } from '@ionic/core';

@Directive({
  selector: '[appHideHeader]',
  // host: {
  //   '(ionScroll)': 'onContentScroll($event)'
  // }
})
export class HideHeaderDirective implements OnInit {

  @Input("appHideHeader") scrollArea;

  private hidden: boolean = false;
  private triggerDistance: number = 60;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private domCtrl: DomController
  ) { }

  ngOnInit() {
    this.initStyles();

    // this.scrollArea.ionScroll.subscribe(scrollEvent => {
    //   let delta = scrollEvent.detail.deltaY;
    //   console.log(delta);


    //   if (scrollEvent.detail.currentY === 0 && this.hidden) {
    //     this.show();
    //   } else if (!this.hidden && delta > this.triggerDistance) {
    //     this.hide();
    //   } else if (this.hidden && delta < -this.triggerDistance) {
    //     this.show();
    //   }
    // });
    this.scrollArea.ionScroll.subscribe(scrollEvent => {
      

      let scrollTop = scrollEvent.detail.scrollTop;
      console.log(scrollTop);
      if (scrollEvent.detail.currentY === 0 && this.hidden) {
        this.show();
      } else if (!this.hidden && scrollTop > this.triggerDistance) {
        this.hide();
      } else if (this.hidden && scrollTop < this.triggerDistance) {
        this.show();
      }
    })
    // console.log($event);
    // const scrollTop = $event.detail.scrollTop;
    // console.log(scrollTop);

    // if(scrollTop >= 60){
    //   this.renderer.setStyle(this.toolbarHtmlElement, 'top', `-25px`);
    //   this.renderer.setStyle(this.toolbarHtmlElement, 'opacity', 0.5);
    // }


    // let newPosition: number = -(scrollTop / 5);
    // console.log(newPosition, this.toolbarHeight);

    // if (newPosition < -this.toolbarHeight) {
    //   newPosition = -this.toolbarHeight;
    // }
    // let newOpacity: number = 1 - (newPosition / -this.toolbarHeight);

    // this.domCtrl.write(() => {
    //   this.renderer.setStyle(this.toolbarHtmlElement, 'top', `${newPosition}px`);
    //   this.renderer.setStyle(this.toolbarHtmlElement, 'opacity', newOpacity);
    //    console.log(this.toolbarHtmlElement);

    // });
  }

  initStyles() {
    this.domCtrl.write(() => {
      this.renderer.setStyle(
        this.element.nativeElement,
        "transition",
        "0.2s linear"
      );
      //this.renderer.setStyle(this.element.nativeElement, "height", "44px");
    });
  }

  hide() {
    this.domCtrl.write(() => {
      //this.renderer.setStyle(this.element.nativeElement, "min-height", "0px");
      //this.renderer.setStyle(this.element.nativeElement, "height", "0px");
      this.renderer.setStyle(this.element.nativeElement, "opacity", "0");
      this.renderer.setStyle(this.element.nativeElement, "visibility", "hidden");
      //this.renderer.setStyle(this.element.nativeElement, "padding", "0");
    });

    this.hidden = true;
  }

  show() {
    this.domCtrl.write(() => {
      //this.renderer.setStyle(this.element.nativeElement, "height", "55px");
      this.renderer.removeStyle(this.element.nativeElement, "opacity");
      this.renderer.setStyle(this.element.nativeElement, "visibility", "visible");
      //this.renderer.removeStyle(this.element.nativeElement, "min-height");
      //this.renderer.removeStyle(this.element.nativeElement, "padding");
    });

    this.hidden = false;
  }

  // @Input('appHideHeader') toolbar: IonToolbar;
  // private toolbarHeight = 44;
  // //toolbarHtmlElement: HTMLElement;

  // toolbarHtmlElement: HTMLElement = document.getElementsByClassName('header')[0] as HTMLElement;


  // constructor(private renderer: Renderer2, private domCtrl: DomController) {
  // }

  // ngAfterViewInit() {
  //   console.log(this.toolbarHtmlElement.clientHeight);

  //   setTimeout(() => {
  //     console.log(this.toolbar);

  //     //this.toolbarHtmlElement = (this.toolbar as any).el; //el is a protected property
  //     console.log(this.toolbarHtmlElement);

  //     this.domCtrl.read(() => {
  //       //console.log(this.handle);

  //       this.toolbarHeight = this.toolbarHtmlElement.clientHeight;
  //       console.log('toolbarHeight: ', this.toolbarHeight)
  //     });
  //   }, 500); //some timeout is needed to guarantee that toolbar height isn't 0
  // }
  // @HostListener('ionScroll', ['$event']) onContentScroll($event: CustomEvent<ScrollDetail>) {
  //   //console.log($event);
  //   const scrollTop = $event.detail.scrollTop;
  //   console.log(scrollTop);

  //   if(scrollTop >= 60){
  //     this.renderer.setStyle(this.toolbarHtmlElement, 'top', `-25px`);
  //     this.renderer.setStyle(this.toolbarHtmlElement, 'opacity', 0.5);
  //   }


  //   // let newPosition: number = -(scrollTop / 5);
  //   // console.log(newPosition, this.toolbarHeight);

  //   // if (newPosition < -this.toolbarHeight) {
  //   //   newPosition = -this.toolbarHeight;
  //   // }
  //   // let newOpacity: number = 1 - (newPosition / -this.toolbarHeight);

  //   // this.domCtrl.write(() => {
  //   //   this.renderer.setStyle(this.toolbarHtmlElement, 'top', `${newPosition}px`);
  //   //   this.renderer.setStyle(this.toolbarHtmlElement, 'opacity', newOpacity);
  //      console.log(this.toolbarHtmlElement);

  //   // });

  // }
}
