import { AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';

export const CustomValidators = {
  matchPasswordValidator: (
    passwordKey: string,
    confirmKey: string
  ): ValidatorFn => {
    return (group: FormGroup): { [key: string]: any } | null => {
      const password = group.controls[passwordKey];
      const confirm = group.controls[confirmKey];

      if (password.value !== confirm.value) {
        return { passwordMismatch: true };
      }

      return null;
    };
  },
};
