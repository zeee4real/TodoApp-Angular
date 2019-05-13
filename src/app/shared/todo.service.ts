import { Injectable } from '@angular/core';
import { Todo } from './todo.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  formData: Todo;
  list :Todo[];
  readonly rootUrl = "http://localhost:58804/api";
  list$ = new Subject();

  constructor(private http:HttpClient) { }

  postTodo(formData :Todo){
    return this.http.post(this.rootUrl+'/Todo',formData);

  }

  refershList() {
    this.http.get(this.rootUrl+'/Todo').subscribe(res => {
      this.list$.next(res);
    });
  }

  deleteTodo(id:number){
    return this.http.delete(this.rootUrl+'/Todo/'+id);
  }
}
