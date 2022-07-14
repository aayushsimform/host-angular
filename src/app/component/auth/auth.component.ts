import { Component} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent{
  isLoginmode = true;
  isLoading = false;
  err = null;
  constructor(private authService:AuthService, private router:Router) { }


  onSwitchMode(){
    this.isLoginmode = !this.isLoginmode;
  }
  onSubmit(form:NgForm){
    //console.log(form);
    //   const email = form.value.email;
    // const password = form.value.password;
    // console.log(email,password);
     
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if(this.isLoginmode){
      //...
     authObs = this.authService.login(email,password);
    }
    else{
      authObs = this.authService.signup(email,password);
    }
    authObs.subscribe(
      resData =>{

        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipe'])
        
      },
      ErrorMsg =>{

        console.log(ErrorMsg);
        this.err = ErrorMsg;
        this.isLoading = false;
        
      }
    )
    form.reset();
  }

  onHandleError(){
    this.err = null;
    
  }

}
