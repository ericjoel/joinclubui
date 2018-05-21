import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from '../../shared/utils/form-validator';
import { CustomValidators } from '../../shared/utils/custom-validator';
import { User } from '../../shared/models/User';
import { JoinclubAuthService } from '../../joinclub-auth.service';
import { ITokenResponse } from '../../shared/models/interfaces/ITokenResponse';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends FormValidator implements OnInit {
  
  isLoadingRegister: boolean;
  user: User;
  usernameErrorMessage: string;
  generalErrorMessage: string;

  formErrors = {
    'name': '',
    'username': '',
    'passwordControl': ''
  };

  validationMessages = {
    'name': {
      'required': 'required field',
      'maxlength': 'overlong'
    },
    'username': {
      'required': 'required field',
      'emailValidator': 'check if is written correctly',
      'maxlength': 'overlong',
      'canNotContainSpace': 'no spaces'
    },
    'passwordControl': {
      'required': 'required field',
      'minlength': 'must be at least 8 characters.',
      'includNumber': 'must have at least one digit ',
      'maxlength': 'overlong',
      'canNotContainSpace': 'no spaces'
    }    
  };

  constructor(_fb: FormBuilder,
    private _joinclubAuthService: JoinclubAuthService) { 
    super();

    this.form = _fb.group({
      username: [
        null,
        Validators.compose([
          CustomValidators.emailValidator,
          Validators.required,
          CustomValidators.canNotContainSpace,
          Validators.maxLength(50)
        ]),
      ],
      passwordControl: [
        null,
        Validators.compose([
          CustomValidators.includNumber,
          Validators.minLength(8),
          Validators.maxLength(50),
          CustomValidators.canNotContainSpace,
          Validators.required
        ]),        
      ],
      name: [
        null,
        Validators.compose([
          Validators.maxLength(50),
          Validators.required
        ]),
      ]
    });

    this.form.valueChanges.subscribe(
      data => { this.onValueChanged(data); }
    );
  }

  ngOnInit() {
  }

  register(e: Event) {
    e.preventDefault();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {      
      return;
    }

    this.isLoadingRegister = true;
    this.user = this.form.value;
    this.user.password = this.form.controls['passwordControl'].value;
    this.user.name = this.form.controls['name'].value;
    this.user.email = this.form.controls['username'].value;
    this._joinclubAuthService.registerService(this.user)
    .subscribe(
      (data: any) => {
        this.isLoadingRegister = false;
        this.login();
      },
      (error) => {
        this.isLoadingRegister = false;
        
        if (error.status === 422){
          this.form.controls['username'].setErrors({ 'incorrect': true });
          this.usernameErrorMessage = error.error.errors.email[0];        
        }
        else {
          this.generalErrorMessage = error.error.message;
        }   
      }
    );
  }

  login() {
    this._joinclubAuthService.loginPasswordService(this.user).subscribe(
      (token: ITokenResponse) => {
        this.isLoadingRegister = false;
        this._joinclubAuthService.saveToken(token);
        this._joinclubAuthService.redirectUrlAfterLogin();
      },
      (error) => {
        this.isLoadingRegister = false;
      }
    );

  }

}
