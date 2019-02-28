import { Component} from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { NavController, ModalController, AlertController, ToastController } from '@ionic/angular';
import { Receita } from '../model/receita';
import { map } from 'rxjs/operators';
import { CadastroReceitaPage } from '../cadastro-receita/cadastro-receita.page';

@Component({
  selector: 'app-receita',
  templateUrl: './receita.page.html',
  styleUrls: ['./receita.page.scss'],
})
export class ReceitaPage {
  
  receitaDB: AngularFireList<Receita>;
  receita: Observable<Receita[]>;

  constructor(public db: AngularFireDatabase,
    public navCtrl: NavController,
    public modalController: ModalController,
    public alertController: AlertController,
    public toast: ToastController, ) {

    this.receitaDB = db.list<Receita>('receita');
    this.receita = this.receitaDB.valueChanges();
    //Deletar dado
    this.receita = this.receitaDB.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
    //listar por data
   
  }
  //testes
  
  totalReceita(receita: Receita) {
    let soma = 0;
    for (let index = 0; index < this.receitaDB.set.length; index++) {
      soma += 0;
    }

    console.log(soma);
    return soma;
  }
  //
  async presentModal() {
    const modal = await this.modalController.create({
      component: CadastroReceitaPage
    });

    modal.onDidDismiss()
      .then(result => {
        if (result.data) {
          this.confirmAdd(result.data);
        }
      });
    return await modal.present();
  }
  private confirmAdd(receita: Receita) {
    this.receitaDB.push(receita)
      .then(result => {
        this.presentToast("Receita adicionada com sucesso.");
      }).catch(error => {
        this.presentToast("Erro ao adicionar a receita.");
        console.log(error);
      });
  }

  async presentToast(mensagem: string) {
    const toast = await this.toast.create({
      message: mensagem,
      duration: 3000,
    });
    toast.present();
  }

  async deleteMensagem(key: string) {
    const alert = await this.alertController.create({
      header: 'Atenção',
      message: 'Deseja apagar a receita? ',
      buttons: [
        {
          text: 'Cancelar',
          cssClass: 'secondary'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.delete(key);
          }
        }
      ]
    });
    await alert.present();
  }
  delete(key: string) {
    this.receitaDB.remove(key)
    .then(result => {
      this.presentToast("Receita removida com sucesso.");
    }).catch(error => {
      this.presentToast("Erro ao remover a receita.");
      console.log(error);
    });
  }
}
