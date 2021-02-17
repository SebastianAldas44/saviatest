import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingProviders, routing } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreatePersonaComponent } from './components/persona/create-persona/create-persona.component';
import { ListPersonaComponent } from './components/persona/list-persona/list-persona.component';
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatePersonaComponent,
    ListPersonaComponent,
    EditPersonaComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    routing
  ],
  providers: [
    AppRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
