import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.route';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { UsercrudComponent } from './usercrud/usercrud.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './material.module';

import { CreateUserDialog } from './usercrud/usercrud.component';
import { EditUserDialog } from './usercrud/usercrud.component';
import { DeleteUserDialog } from './usercrud/usercrud.component';


import {  NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    UsercrudComponent,
    CreateUserDialog,
    EditUserDialog,
    DeleteUserDialog
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(rootRouterConfig , { useHash: true }),
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    // Including the ReactiveFormsModule in our application
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [CreateUserDialog, EditUserDialog,DeleteUserDialog ],
  schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
