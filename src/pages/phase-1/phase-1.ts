import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { HttpClient } from '@angular/common/http';
import { DetailsPage } from '../details/details';
/**
 * Generated class for the Phase_1Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-phase-1',
  templateUrl: 'phase-1.html',
})
export class Phase_1Page {
	home=HomePage;
	items;
	items2;
	phase_no : number;

  constructor(public navCtrl: NavController, public navParams: NavParams,public http: HttpClient ) {
  	this.phase_no = navParams.get('data');
  	//this.initializeItems();
  	this.load(this.phase_no);
  	

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Phase_1Page');
  }

  goBack() {
    //this.navCtrl.pop();
     this.navCtrl.setRoot(HomePage);
  }
//============== database load==============
 ionViewWillEnter() : void
   {
     // this.load();
   }


load(phase_no) : void
   {
      this.http
      .get('http://localhost:80/api/retrieve-data.php?phase_no='+phase_no)
      .subscribe((data : any) =>
      {
         console.dir(data);
         this.items = data;
         this.items2=data;
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }
//============== database load end ==============


initializeItems() {
  /*  this.items = [
      'Amsterdam US',
      'Bogota',
      'Buenos Aires',
      'Cairo',
      'Dhaka Bangladesh',
      'Edinburgh',
      'Geneva',
      'Genoa',
      'Glasglow',
      'Hanoi',
      'Hong Kong',
      'Islamabad',
      'Istanbul',
      'Jakarta',
      'Kiel',
      'Kyoto',
      'Le Havre',
      'Lebanon',
      'Lhasa',
      'Lima',
      'London',
      'Los Angeles',
      'Madrid',
      'Manila',
      'New York',
      'Olympia',
      'Oslo',
      'Panama City',
      'Peking',
      'Philadelphia',
      'San Francisco',
      'Seoul',
      'Taipeh',
      'Tel Aviv',
      'Tokio',
      'Uelzen',
      'Washington'
    ];
    
	this.load();
    */


  }

  getItems(ev: any) {
    // Reset items back to all of the items
   // this.initializeItems();
   // this.load();
   this.items=this.items2;

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((arr) => {
        return (arr.cust_name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

itemSelected(ben_cd: string) {
    console.log("Selected Item", ben_cd);

   //this.navCtrl.setRoot(PhdetailsPage);
   this.navCtrl.push(DetailsPage,{data: ben_cd});
  }

}
