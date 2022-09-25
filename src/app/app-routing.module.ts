import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components

import {MenuComponent} from './components/menu/menu.component';
import { ProblemaMochilaComponent } from './components/problema-mochila/problema-mochila.component';
import { RutasCortasComponent } from './components/rutas-cortas/rutas-cortas.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'problema-mochila', component: ProblemaMochilaComponent},
  {path: 'rutas-cortas', component: RutasCortasComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
