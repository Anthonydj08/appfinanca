import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';
import { mixinColor } from '@angular/material/core';
import { DomController } from '@ionic/angular';

@Directive({
  selector: '[appHideHeader]',
  host: {
    '(ionScroll)': 'onContentScroll($event)'
  }
})
export class HideHeaderDirective implements OnInit{
  @Input('appHideHeader') toolbar: any;
  private toolbarHeight = 44;
  private lastY: number = 0;

  constructor(
    private renderer: Renderer2,
    private domtrl: DomController,
    private elmRef: ElementRef
  ) { }

  ngOnInit() {
    console.log(this.toolbar);
    //console.log(this.toolbar.getColor);
    this.toolbar = this.toolbar.el;
    this.domtrl.read(() =>{
      this.toolbarHeight = this.toolbar.clientHeight;
    });
    console.log("asdas", this.toolbar);
    
  }

  @HostListener('ionScroll', ['$event']) onContentScroll($event){
    const scrollTop = $event.detail.scrollTop;
    console.log(scrollTop);
    let newPosition = - (scrollTop / 5);
    if(newPosition < -this.toolbarHeight){
      newPosition = -this.toolbarHeight
    }
    console.log(this.toolbar);//vindo vazio
    // this.domtrl.write(()=>{
    //   this.renderer.setStyle(this.toolbar, 'top', `${newPosition}px`)
    // });
    
    
    // this.domtrl.write(()=>{
      
    // })
    
    
  }


  // onContentScroll(event: any) {
  //   //console.log(event);
  //   if (event.detail.scrollTop > 70) {
  //     console.log("Esconde");
  //       this.renderer.setStyle(this.elmRef.nativeElement.querySelector('ion-header'), 'margin-top', '-20px' );
  //       //this.renderer.setStyle(this.header, 'margin-top', '-20px');//`hidden`);
     
  //   } else {//70
  //     console.log("Mostra");
  //     this.renderer.setStyle(this.elmRef.nativeElement.querySelector('ion-header'), 'margin-top', '-30px' );
  //       //this.renderer.setStyle(this.header, 'margin-top', '-30px');
     
  //   }
  //   this.lastY = event.detail.scrollTop;
  // }
}
