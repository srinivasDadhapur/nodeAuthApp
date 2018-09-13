import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username:string;
  public password:string;

  constructor(
    private authService: AuthService,
    private router: Router,
    private flashmessages:FlashMessagesService
  ) { }

  ngOnInit() {
  }


  onLoginSubmit(){
    const user={
      username: this.username,
      password:this.password
    }

    this.authService.authenticateUser(user).subscribe(data=>{
     if(data.success){
        this.authService.storeUserData(data.token,data.user);
        this.flashmessages.show('Login Success',{cssClass:'alert-success',timeout:1500});
        this.router.navigate(['/dashboard']);
     }else{
       this.flashmessages.show(data.msg,{cssClass:'alert-danger',timeout:1000});
       this.router.navigate(['login']);
     }
      
    });
    
  }

}
