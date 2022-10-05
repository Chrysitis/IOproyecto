import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { shortestPathComponent } from './components/rutas-cortas/shortestPath.component';
import { ProblemaMochilaComponent } from './components/problema-mochila/problema-mochila.component';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from './header/header.component';
import { shortestPathService } from './components/rutas-cortas/shortestPath.service';

@NgModule({
  declarations: [
    AppComponent,
    shortestPathComponent,
    ProblemaMochilaComponent,
    MenuComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    shortestPathService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
