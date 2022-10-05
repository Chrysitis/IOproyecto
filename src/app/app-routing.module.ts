import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components

import {MenuComponent} from './components/menu/menu.component';
import { ProblemaMochilaComponent } from './components/problema-mochila/problema-mochila.component';
import { shortestPathComponent } from './components/rutas-cortas/shortestPath.component';

const routes: Routes = [
  {path: '', component: MenuComponent},
  {path: 'problema-mochila', component: ProblemaMochilaComponent},
  {path: 'shortestPath', component: shortestPathComponent},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
