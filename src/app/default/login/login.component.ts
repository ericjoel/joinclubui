import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from '../../shared/utils/form-validator';
import { CustomValidators } from '../../shared/utils/custom-validator';
import { User } from '../../shared/models/User';
import { JoinclubAuthService } from '../../joinclub-auth.service';
import { ITokenResponse } from '../../shared/models/interfaces/ITokenResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormValidator implements OnInit {
  
  user: User;
  isLoadingLogin: boolean;
  passwordErrorMessage: string;
  
  formErrors = {
    'username': '',
    'passwordControl': ''
  };

  validationMessages = {
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
      ]
    });

    this.form.valueChanges.subscribe(
      data => { this.onValueChanged(data); }
    );
  }

  ngOnInit() {
  }

  login(e: Event) {
    e.preventDefault();
    this.form.updateValueAndValidity();

    if (this.form.invalid) {
      
      return;
    }
    
    this.isLoadingLogin = true;
    this.user = this.form.value;
    this.user.password = this.form.controls['passwordControl'].value;

    this._joinclubAuthService.loginPasswordService(this.user).subscribe(
      (token: ITokenResponse) => {
        this.isLoadingLogin = false;
        this._joinclubAuthService.saveToken(token);
        this._joinclubAuthService.redirectUrlAfterLogin();
      },
      (error) => {
        this.isLoadingLogin = false;
        this.form.controls['username'].setErrors({ 'incorrect': true });
        this.form.controls['passwordControl'].setErrors({ 'incorrect': true });
        this.passwordErrorMessage = error.error.message;
      }
    );

  }
}
