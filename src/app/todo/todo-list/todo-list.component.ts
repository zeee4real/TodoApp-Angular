import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/shared/todo.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  data;
  list;

  constructor(private service: TodoService,
    private toastr:ToastrService ) { }

  ngOnInit() {
    this.service.refershList();
    this.data = this.service.list$.subscribe(res => {
      if (res) {
        this.list = res;
      }
    });
  }
  onDelete(id :number){
    if(confirm('Are you sure you want to delete this?')){
    this.service.deleteTodo(id).subscribe(res=>{
      this.service.refershList();
      this.toastr.warning('Deleted Successfully','Todo.Resister');
    })
  }
}
}
