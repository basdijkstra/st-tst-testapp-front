import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoaderInterceptor } from './shared/interceptor/loader.interceptor';
import { LoaderComponent } from './shared/loader/loader.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartComponent } from './pages/start/start.component';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { EditComponent } from './pages/edit/edit.component';
import { UserEditComponent } from './pages/edit/user-edit/user-edit.component';
import { ListComponent } from './pages/list/list.component';
import { NewComponent } from './pages/new/new.component';
import { BadRequestComponent } from './shared/pages/bad-request/bad-request.component';
import { PageNotFoundComponent } from './shared/pages/page-not-found/page-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    StartComponent,
    LoaderComponent,
    ListComponent,
    NewComponent,
    EditComponent,
    UserEditComponent,
    PageNotFoundComponent,
    BadRequestComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
