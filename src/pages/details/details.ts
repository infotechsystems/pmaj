import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import {  HttpClient } from '@angular/common/http';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
	ben_cd: string;
	items;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient) {
  	this.ben_cd = navParams.get('data');
  	this.load_trans(this.ben_cd);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

  load_trans(ben_cd) : void
   {
      this.http
      .get('http://localhost:80/api/retrieve-trans.php?ben_cd='+ben_cd)
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
        
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }
    goBack() {
    //this.navCtrl.pop();
     this.navCtrl.setRoot(HomePage);
  }


}
