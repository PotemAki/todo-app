import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { ToDo } from '../list/list.model';

import { Observable } from 'rxjs';
import { CanComponentDeactivate } from './can-deactivate.guard.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, CanComponentDeactivate{
  todo!: ToDo;
  id = 0
  todoName = '';
  todoDate = '';
  allowEdit = false;
  changesSaved = false;
  isEmpty = false;
  isEmptyMessage: any;

  constructor(private todoService: TodoService,
    private router: Router,
    private route: ActivatedRoute,) {

  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
        this.todo = this.todoService.getToEdit(this.id)
        this.todoName = this.todo.name
        this.todoDate = this.todo.date
      }
    )
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      })
    
  }
  onUpdateButton() {
    if (this.todoName === '') {
      this.isEmpty = true;
      clearTimeout(this.isEmptyMessage)
      this.isEmptyMessage = setTimeout(() => {
        this.isEmpty = false;
      }, 1000);
      return
    }
    this.todoService.onUpdateList(this.id, this.todoName, this.todoDate)
    this.changesSaved = true;
    this.router.navigate(['/todo'], { relativeTo: this.route})
  }
  onCancelButton() {
    this.router.navigate(['/todo'], { relativeTo: this.route})
  }

  canDeactivate(): boolean | Observable<boolean> | Promise<boolean> {
   if (!this.allowEdit) {
    return true
  }
  if ((this.todoName !== this.todo.name || this.todoDate !== this.todo.date) && !this.changesSaved) {
    return confirm('Discard the changes?')
  } else {
    return true
  }
}}
