import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Phase_1Page} from '../phase-1/phase-1';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	phase_1 = Phase_1Page;
	userlocal:string;

  constructor(public navCtrl: NavController) {
  	this.userlocal=localStorage.getItem("user_id");
  	console.log(this.userlocal);
  }


phaseselect(phase_no: number) {
    console.log("Selected Item", phase_no);
  // this.navCtrl.setRoot(Phase_1Page);
   this.navCtrl.push(Phase_1Page,{data: phase_no});
  }  

}
