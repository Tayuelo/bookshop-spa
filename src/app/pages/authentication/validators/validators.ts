import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function matchPasswordValidator(
  passwordControlName: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.parent?.get(passwordControlName)?.value;
    const confirmedPassword = control.value;
    return password === confirmedPassword
      ? null
      : { passwordDontMatch: { value: control.value } };
  };
}
