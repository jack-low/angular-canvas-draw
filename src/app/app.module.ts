import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {
  MatCommonModule,
  MatNativeDateModule
} from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';

const modules = [ MatCommonModule, MatNativeDateModule, MatCardModule ];

@NgModule({
  imports: [...modules, BrowserModule, FormsModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
