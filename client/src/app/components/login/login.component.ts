import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  errorMessage: string = ''
  constructor(private userService : UserService, private router : Router){}
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  onSubmit(){
    if(this.loginForm.invalid){
      console.log("Form is invalid");
    }
    console.log("Form is valid");
    let loginData = this.loginForm.value
    console.log(loginData)

    this.userService.loginUser(loginData).subscribe(
      (res: any) => {
        console.log(res)
        if(res.success){
          this.router.navigate(['/homepage'])
        }
      },
      (err : any) => {
        console.error(err)
        this.errorMessage = "Invalid username or password. Please try again.";
      }
    )


  }
}
