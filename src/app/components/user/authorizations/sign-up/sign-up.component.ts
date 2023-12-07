import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public formSignUpDataReq: any;
  public submitted: boolean;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.submitted = false;
    this.formSignUpDataReq = this.formBuilder.group({
      email: ['', Validators.required],
      phone: ['', Validators.required],
      fullname: ['', Validators.required],
      birthday: ['2001-01-01', Validators.required],
      gender: [true, Validators.required],
      address: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signUp() {
    this.submitted = true;
  }

  public onSubmit(): void {
    if (this.formSignUpDataReq.valid) {
      console.log('Form Data: ', this.formSignUpDataReq.value);
    } else {
      console.log('Invalid form');
    }
  }
}
