import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends AppBaseComponent{


  /*
  Formulario reactivo de login
  */
  public loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) { 
    super();
    this.loginForm = this.fb.group({
        email: ['',[Validators.required,Validators.email] ],
        password: ['',Validators.required ]
    });
  }

  public signIn(): void {
    //Evitar usar el any , debemos usar Modelos
    let dtoLogin = {};

    if (this.loginForm.valid){
      alert("Me presionaron");
      let email = this.loginForm.get('email').value;
      let password = this.loginForm.get('password').value;
      dtoLogin = {
          email,password
      }
      //Añadir un nuevo valor a la estructura del objeto dtoLogin
      /*dtoLogin = {
        ...dtoLogin,
        "nuevoValor" : "nuevo"
      }*/

      console.log(dtoLogin);
      
    }else{
      alert("Hay errores en el formulario");
    console.log(this.getAllErrorsForm(this.loginForm));
    }
    
  }
  /*
    public signUp(): void{
      this.router.navigateByUrl("autenticacion/registro");
    }
    NAVEGACION MEDIANTE LA CLASE ROUTER
    */

    public getErrorForm(field: string): string{
      let message;

      if (this.isTouchedField(this.loginForm, field)){
        if(this.loginForm.get(field).hasError('required')){
          message = 'El campo es requerido';
        }else if(this.loginForm.get(field).hasError('email')){
          message = 'Requiere el formato de email';
        }
      }


      return message;
    }

  ngOnInit(): void {
  }

}
