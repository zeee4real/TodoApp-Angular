import { Component, OnInit } from '@angular/core';
import { TodoService } from '../shared/todo.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private service:TodoService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.resetForm();
    this.service.refershList();
  }
  
  resetForm(form?:NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      ID : null,
      Title : '',
      Notes : '',
      Created:'',
      CurrStatus:false 
    }
  }
  onSubmit(form: NgForm){
    this.insertRecord(form);
    
  }

  insertRecord(form: NgForm){
      this.service.postTodo(form.value).subscribe(res =>{
      this.service.refershList();
      this.toastr.success("Insertion success",'TODO. Register');
      this.resetForm(form );
      
    })
  }
}
