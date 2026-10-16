import { BrowserModule } from '@angular/platform-browser';
import { NgModule, provideZoneChangeDetection } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BirdListComponent } from './bird-list/bird-list.component';

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
  providers: [provideZoneChangeDetection()],
  bootstrap: [AppComponent]
})
export class AppModule {}
