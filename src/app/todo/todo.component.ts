import { Component, DoCheck, OnInit, ViewChild } from '@angular/core';
import { ToDo } from './list/list.model';
import { TodoService } from './todo.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements DoCheck{
  todo: ToDo[] = [];
  @ViewChild('todoNameInput') nameInput: any;
  @ViewChild('todoDateInput') dateInput: any;
  changeSaved = false;
  isIncorrect = false;
  isEmptyMessage: any;

  constructor(private todoService: TodoService,
              private route: ActivatedRoute) {
              
  }
  ngOnInit(): void {
    this.todo = this.todoService.getTodo();
    this.route.params.subscribe(
      (params: Params) => {
        this.todo = this.todoService.getTodo();
      }
    )
  }
  ngDoCheck(): void {
    this.todo = this.todoService.getTodo();
    this.todoService.changesSaved.subscribe(
      didActivate => {
        this.changeSaved = didActivate;
        setTimeout(() => {
          this.changeSaved = false;
        }, 1000);
      }
    )
    
  }
  onAdd(todoNameInput: { value: string; }, todoDateInput: { value: string; }) {
    if (todoNameInput.value === '') {
      this.isIncorrect = true;
      clearTimeout(this.isEmptyMessage)
      this.isEmptyMessage = setTimeout(() => {
        this.isIncorrect = false;
      }, 1000);
      return
    }
    this.todoService.addToList(todoNameInput.value, todoDateInput.value)
    this.nameInput.nativeElement.value = '';
    this.dateInput.nativeElement.value = '';
  }
  onClear() {
    this.nameInput.nativeElement.value = '';
    this.dateInput.nativeElement.value = '';
  }
}