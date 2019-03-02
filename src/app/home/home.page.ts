import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ScrollDetail } from '@ionic/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  constructor(public router: Router) {

  }

  openReceita() {
    //this.receita.presentModal();
    this.router.navigate(['/tabs/receita']);
  }
  openDespesa() {
    this.router.navigate(['/tabs/despesa']);
  }
 
}
