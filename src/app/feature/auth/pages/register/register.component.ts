import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { RegisterRequestDto } from 'src/app/core/dto/registerRequestDto';
import { ErrorsForm } from 'src/app/core/enums/ErrorsForm';
import { AuthService } from 'src/app/core/services/auth.service';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CustomValidators } from 'src/app/core/utils/CustomValidators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent extends AppBaseComponent {

  public registerForm: FormGroup;

  public passwordGenerated: string;

  public registered: boolean = false;

  constructor(private router: Router, private fb: FormBuilder,
    private authService: AuthService) {
    super();
    this.registerForm = this.fb.group({
      cardId: ['', Validators.required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
      + "[^-][A-Za-z0-9_-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$")]],
      numberCellphone: ['', [Validators.pattern("^[0-9]*$"), Validators.required]]
    });
  }

  public async register(): Promise<void> {

    let dtoRegister: RegisterRequestDto = this.registerForm.value;

   
      if(this.registerForm.valid){
          await lastValueFrom(this.authService.register(dtoRegister)).then(resp =>{
            this.passwordGenerated =  resp.password;
          })

          this.registered = true;
      }else{
        console.log(this.getAllErrorsForm(this.registerForm));
      }
  }



  public getErrorForm(field: string): string {
    let message;

    const required: Array<String> = ["cardId","fullName","email","numberCellphone"];
    const formatEmail: Array<String> = ["email"];
    const onlyNumber: Array<String> = ["numberCellphone"];
    if (required.includes(field) &&  this.isTouchedField(this.registerForm, field)) {

      if (this.registerForm.get(field).hasError('required')) {
        message = ErrorsForm.REQUIRED;
      } else if (formatEmail.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.EMAIL_FORMAT;
      }else if (onlyNumber.includes(field) && this.registerForm.get(field).hasError('pattern')) {
        message = ErrorsForm.ONLY_NUMBER;
      }
    }
    

    return message;
  }

  ngOnInit(): void {
  }

}
