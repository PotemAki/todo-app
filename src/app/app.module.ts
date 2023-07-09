import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { ArchiveComponent } from './archive/archive.component';
import { HeaderComponent } from './header/header.component';
import { ListComponent } from './todo/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './todo/edit/edit.component';
import { FormsModule } from '@angular/forms';
import { ArchiveListComponent } from './archive/archive-list/archive-list.component';
import { CanDeactivateGuard } from './todo/edit/can-deactivate.guard.service';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HttpClientModule } from '@angular/common/http';
;

const appRoutes: Routes = [
  { path: '', redirectTo: '/todo', pathMatch: 'full' },
  { path: 'todo', component: TodoComponent, children: [
    { path: ':id', component: TodoComponent },
    { path: ':id/edit', component: EditComponent, canDeactivate: [CanDeactivateGuard] }]},
  { path: 'archive', component: ArchiveComponent},
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: 'not-found' }
]

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    ArchiveComponent,
    HeaderComponent,
    ListComponent,
    EditComponent,
    ArchiveListComponent,
    ErrorPageComponent,
    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
