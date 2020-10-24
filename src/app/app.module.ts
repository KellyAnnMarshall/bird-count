import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BirdListComponent } from './bird-list/bird-list.component';
import { BirdService } from './bird.service';

@NgModule({
  declarations: [
    AppComponent,
    BirdListComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    NgbModule,
    HttpClientModule,
  ],
  providers: [BirdService],
  bootstrap: [AppComponent]
})
export class AppModule { }
