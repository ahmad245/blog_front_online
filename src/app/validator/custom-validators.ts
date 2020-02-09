import { AbstractControl, ValidatorFn, FormArray } from "@angular/forms";

export class CustomValidators{
    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('password').value; // get password from our password form control
        const confirmPassword: string = control.get('confirmPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('confirmPassword').setErrors({ NoPassswordMatch: true });
        }
      }
      static passwordMatchValidatorRest(control: AbstractControl) {
        const password: string = control.get('newPassword').value; // get password from our password form control
        const confirmPassword: string = control.get('newRetypedPassword').value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
          // if they don't match, set an error in our confirmPassword form control
          control.get('newRetypedPassword').setErrors({ NoPassswordMatch: true });
        }
      }
      static minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
          const totalSelected = formArray.controls
            // get a list of checkbox values (boolean)
            .map(control => { 
             return control.value.examSection})
            // total up the number of checked checkboxes
            .reduce((prev, next) => next ? prev + next : prev, 0);
      
          // if the total is not greater than the minimum, return the error message
          return totalSelected >= min ? null : { required: true };
        };
      
        return validator;
      }
}