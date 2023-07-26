import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {  AuthWithoutGuard } from '../core/guards/auth-without.guard';
import { AuthWithGuard } from '../core/guards/auth-with.guard';
import { GuardPruebaService } from '../core/services/guard-prueba.service';

const routes: Routes = [
  {
    path: "autenticacion",
    canActivate: [() => inject(GuardPruebaService).canActiveWithAuth()],
    loadChildren: () => import("./auth/auth.module").then(a => a.AuthModule)
  },
  {
    path: "portafolio",
    canActivate: [() => inject(GuardPruebaService).canActiveWithoutAuth()],
    loadChildren: () => import("./home/home.module").then(a => a.HomeModule)
  },
  {
    path:"admin",
    canActivate: [() => inject(GuardPruebaService).canActiveWithRoleAdmin()],
    loadChildren: () => import("./admin/admin.module").then(a => a.AdminModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeatureRoutingModule { }
