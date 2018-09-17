import {Component,ViewChild} from "@angular/core";
import {NavController, AlertController, ToastController, MenuController} from "ionic-angular";
import {NavParams} from 'ionic-angular';

import {HomePage} from "../home/home";
import {RegisterPage} from "../register/register";
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'

})
export class LoginPage {
   user_data:any;
   user_count:number;
   @ViewChild('user_id') user_id;
   @ViewChild('password') password;

  constructor(public nav: NavController, public navParams: NavParams, public forgotCtrl: AlertController, public menu: MenuController, public toastCtrl: ToastController,public http: HttpClient ) {
    this.menu.swipeEnable(false);

  }

  // go to register page
  register() {
    this.nav.setRoot(RegisterPage);
  }

  // login and go to home page
 /*
  login() {
    this.nav.setRoot(HomePage);
  }
*/

login() : void
   {

    console.dir("user id:"+this.user_id.value);
     console.dir("password:"+this.password.value);

      this.http
      .get('http://localhost:80/api/login.php?user_id='+this.user_id.value+'&password='+this.password.value)
      .subscribe((data : any) =>
      {
         
        this.user_data=data;
         console.dir(data);
        // this.user_id=JSON.parse(this.user_data).results;
        this.user_count=JSON.parse(this.user_data[0]['ct']); // this is the error
        console.log(this.user_count);

       //  this.user_count = data;
        // console.dir(this.user_count);
         if(this.user_count>0)  
         {
         
         //  localStorage.setItem('user_id',this.user_id.value);
           this.nav.setRoot(HomePage);

         }else{
           console.log("wrong user id or password");
         }
         
      },
      (error : any) =>
      {
         console.dir(error);
      });
   }


  forgotPass() {
    let forgot = this.forgotCtrl.create({
      title: 'Forgot Password?',
      message: "Enter you email address to send a reset link password.",
      inputs: [
        {
          name: 'email',
          placeholder: 'Email',
          type: 'email'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Send',
          handler: data => {
            console.log('Send clicked');
            let toast = this.toastCtrl.create({
              message: 'Email was sended successfully',
              duration: 3000,
              position: 'top',
              cssClass: 'dark-trans',
              closeButtonText: 'OK',
              showCloseButton: true
            });
            toast.present();
          }
        }
      ]
    });
    forgot.present();
  }

}
