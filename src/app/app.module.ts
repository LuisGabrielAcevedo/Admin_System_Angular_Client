import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServiceModule } from './services/http.service.module';
import { AppRoutingModule } from './app.routing.module';
import { AppStoreModule } from './store/store.module';
import { AdminSystemInterceptor } from './configurations/http.interceptor';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'https://adminsystemsocketsserver.herokuapp.com', options: {} };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ServiceModule,
    AppRoutingModule,
    AppStoreModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AdminSystemInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
