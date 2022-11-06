import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components

import { MenuComponent } from './components/menu/menu.component';
import { ProblemaMochilaComponent } from './components/problema-mochila/problema-mochila.component';
import { shortestPathComponent } from './components/rutas-cortas/shortestPath.component';
import { EquipmentReplacementComponent } from './components/equipment-replacement/equipment-replacement.component';
import { SeriesDeportivasComponent } from './components/series-deportivas/series-deportivas.component';

const routes: Routes = [
  { path: '', component: MenuComponent },
  { path: 'problema-mochila', component: ProblemaMochilaComponent },
  { path: 'shortestPath', component: shortestPathComponent },
  { path: 'equipmentReplacement', component: EquipmentReplacementComponent },
  { path: 'series-deportivas', component: SeriesDeportivasComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
