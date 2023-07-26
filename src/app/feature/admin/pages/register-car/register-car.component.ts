import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarDto } from 'src/app/core/dto/carDto';
import Swal from 'sweetalert2'
import { CustomValidators } from 'src/app/core/utils/CustomValidators';
import { AppBaseComponent } from 'src/app/core/utils/AppBaseComponent';
import { CarService } from 'src/app/core/services/car.service';

@Component({
  selector: 'app-register-car',
  templateUrl: './register-car.component.html',
  styleUrls: ['./register-car.component.css']
})
export class RegisterCarComponent extends AppBaseComponent {

  public registerCarForm: FormGroup;

  constructor(private fb:FormBuilder,private carService: CarService) {
    super();

    this.registerCarForm = this.fb.group({
        infoBasicForm: this.fb.group({
          brandCar:['',Validators.required],
          reference:['',Validators.required],
          price:['',Validators.required],
          modelYear:['',[Validators.required, CustomValidators.numberDateFuture]],
          category:['',Validators.required]
        }),
        infoMechForm:this.fb.group({
          horsePower:['',Validators.required],
          engineDisplacement:['',Validators.required],
          transmission:['',Validators.required],
          fuelType:['',Validators.required],
          traction:['',Validators.required],
          steering:['',Validators.required]
        }),
        infoAestheticForm:this.fb.group({
          color:['',Validators.required],
          numberDoor:['',Validators.required],
          numberSeats:['',Validators.required],
          imagePath:['',Validators.required]
        })

    });
   }

   public async registerCar():Promise<void>{

    if(!this.registerCarForm.valid){
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario, reviselo por favor'
      });
      console.log(this.getAllErrorsForm(this.registerCarForm));
      this.registerCarForm.markAllAsTouched();
      return
    }
      let formData = this.registerCarForm.value;

      let formBasic = formData["infoBasicForm"];
      
      let formMech = formData["infoMechForm"];
      
      let formAesthetic = formData["infoAestheticForm"];

      let dtoRegisterCar: CarDto = {
        ...formBasic,
        ...formMech,
        ...formAesthetic
      }

      console.log("envio" ,dtoRegisterCar)

      this.carService.registerCar(dtoRegisterCar).subscribe({
        next: value =>{
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Se registro correctamente'
          });
          console.log("carro guardado",value)
        },
        error: err =>{
          Swal.fire({
            icon: 'error',
            title: 'Upsss',
            text: 'Hubo un problema al guardar'
          });
          console.log(err)
        }
      })
   }

  ngOnInit(): void {
  }

}
