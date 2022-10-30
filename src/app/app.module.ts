import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { shortestPathComponent } from './components/rutas-cortas/shortestPath.component';
import { ProblemaMochilaComponent } from './components/problema-mochila/problema-mochila.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { shortestPathService } from './components/rutas-cortas/shortestPath.service';
import { EquipmentReplacementComponent } from './components/equipment-replacement/equipment-replacement.component';

@NgModule({
  declarations: [
    AppComponent,
    shortestPathComponent,
    ProblemaMochilaComponent,
    MenuComponent,
    HeaderComponent,
    EquipmentReplacementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    MatTableModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
  ],
  providers: [shortestPathService],
  bootstrap: [AppComponent],
})
export class AppModule {}
