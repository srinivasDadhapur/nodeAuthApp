import { Component, OnInit } from '@angular/core';
import { ValidateService} from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages'; 
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name:string;
  username:string;
  email:string;
  password:string;

  constructor(
    private validateService: ValidateService, 
    private flashmessageService: FlashMessagesService,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
   const user = {
     name : this.name,
     email: this.email,
     username: this.username,
     password: this.password
   }

   if(!this.validateService.validateRegister(user)){
      // console.log('please fill in all the fields');
      this.flashmessageService.show('Please fill all the fields',{cssClass: 'alert-danger',timeout:3000});
      return false;
   }
   if(!this.validateService.validateEmail(user.email)){
    // console.log('Please provide a valid email');
    this.flashmessageService.show('Please provide a valid email',{cssClass: 'alert-danger',timeout:3000});
    return false;
   }

   this.authService.registerUser(user).subscribe(data=>{
     if(data.success){
      this.flashmessageService.show('Registered',{cssClass: 'alert-success',timeout:3000});
      this.router.navigate(['/login']);
     }else{
      this.flashmessageService.show('cannot register',{cssClass: 'alert-danger',timeout:3000});
      this.router.navigate(['/register']);
     }
   },error=>{
     console.log(error);
     
   });


  } 

}
