import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/users/user.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {

  constructor(private userService : UserService, private router: Router){}

  registerForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      // Validators.pattern('^(?!\\.)(?!.*\\.\\.)[a-z0-9_\\.]{3,20}(?<!\\.)$'),
      Validators.pattern('^(?![@_])(?!.*[@_]{2})([a-z0-9@_]{3,20})(?<![@_])$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{8,}$'
      ),
    ]),
  });

  // username pattern = Only letters, numbers, underscores, Cannot start or end with a dot, Cannot contain two or more consecutive dots

  toLowercase(controlName: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const lowerCaseValue = input.value.toLowerCase();
    this.registerForm
      .get(controlName)
      ?.setValue(lowerCaseValue, { emitEvent: false });
  }

  // The event.target is the DOM element that triggered the event — the <input> box in this case.
  // We're telling TypeScript: "Trust me, this is an HTMLInputElement."
  // ✅ This allows us to safely access .value on the input.
  // registerForm.get(controlName) gets the form control (username, in this case).
  // .setValue(lower) updates the form control with the lowercase value.
  // { emitEvent: false } means:
  // Don't trigger valueChanges or validators again (which would happen by default).
  // This avoids unnecessary performance hits or infinite loops if you're listening to changes.

  onSubmit() {
    if (this.registerForm.invalid) {
      console.log(`Form is invalid`);
      this.registerForm.markAllAsTouched();
    }
    console.log(`Form is valid`);
    // console.log(this.registerForm.value);
    let registerData = this.registerForm.value;
    console.log(registerData)

    this.userService.registerUser(registerData).subscribe(
      (res : any) => {
        console.log(res)
        if(res.success){
          this.router.navigate(['/homepage'])
        }
       },
      (err : any) => { 
        console.error(err)
      }
    )

}


}
