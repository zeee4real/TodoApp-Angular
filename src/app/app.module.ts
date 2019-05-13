import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from "@angular/forms";
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';

import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todo/todos/todos.component';
import { TodoListComponent } from './todo/todo-list/todo-list.component';
import { TodoService } from './shared/todo.service';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodosComponent,
    TodoListComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
