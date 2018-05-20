// Angular
import { Injectable } from '@angular/core';
import { FormControl, FormGroup, AbstractControl } from '@angular/forms';

@Injectable()
export class CustomValidators {

  /**
   * Set a field Incorrect
   *
   * @static
   * @param {FormControl} control // Control Form
   * @returns
   * @memberof CustomValidators
   */
  static incorrect(control: FormControl) {
    return;
  }

  /**
   * Missing number in password
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static includNumber(control: FormControl) {
    const regEx = /(?=.*[0-9])/;
    const valid = regEx.test(control.value);
    return valid ? null : { includNumber: true };
  }

  /**
   * Missing lowercase letter
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static includLowerString(control: FormControl) {
    const regEx = /(?=.*[a-z])/;
    const valid = regEx.test(control.value);
    console.log(valid);
    return valid ? null : { includLowerString: true };
  }

  /**
   * Missing upercase letter
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static includUpperString(control: FormControl) {
    const regEx = /(?=.*[A-Z])/;
    const valid = regEx.test(control.value);
    return valid ? null : { includUpperString: true };
  }

  /**
   * Minimum of characters
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static includMinium(control: FormControl) {
    const regEx = /(?=.{8,})/;
    const valid = regEx.test(control.value);
    return valid ? null : { includMinium: true };
  }

  /**
   * Missing regular expression
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static includRegularExpression(control: FormControl) {
    const regEx = /(?=.*[!@#+.-/¿?¡°!"$()\$%\^&\*])/;
    const valid = regEx.test(control.value);
    return valid ? null : { includRegularExpression: true };
  }

  /**
   * Validate unique chars
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static requiredUniqueChars(control: FormControl) {
    const cycle = 2;
    const character = control.value.split('');
    let valid = false;
    let repeatCharacter = [];
    let k = 0;
    let count = 0;

    // repeat character
    for (let i = 0; i < character.length; i++) {
      for (let j = i + 1; j < character.length; j++) {
        if (character[i] === character[j]) {
          repeatCharacter[k] = character[i];
          k++;
        }
      }
    }

    // delete duplicated of repeat characters
    repeatCharacter = repeatCharacter.filter((elemen, pos) => {
      return repeatCharacter.indexOf(elemen) === pos;
    });

    // count repeat characters
    if (repeatCharacter.length < cycle) {
      count = 0;
      for (let i = 0; i < repeatCharacter.length; i++) {
        for (let j = 0; j < character.length; j++) {
          if (repeatCharacter[i] === character[j]) {
            count++;
          }
        }
      }
    }

    valid = (count === character.length) ? false : true;

    return valid ? null : { requiredUniqueChars: true };
  }

  /**
   * Validator email
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static emailValidator(control: FormControl) {
    const regEx = /^[A-Za-z0-9._%+-]+@([A-Za-z0-9-]+\.)+([A-Za-z0-9]{2,4}|museum)$/;
    const valid = regEx.test(control.value);
    return valid ? null : { emailValidator: true };
  }
  
  /**
   * Validator not spaces in password
   *
   * @static
   * @param {FormControl} control
   * @returns
   * @memberof CustomValidators
   */
  static canNotContainSpace(control: FormControl) {
    if (control.value) {
      if (control.value.indexOf(' ') >= 0) {
        return { canNotContainSpace: true };
      }
    }
    return null;
  }
}
