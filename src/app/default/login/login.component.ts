import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormValidator } from '../../shared/utils/form-validator';
import { CustomValidators } from '../../shared/utils/custom-validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends FormValidator implements OnInit {

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

  constructor(_fb: FormBuilder) { 
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
    
  }
}
