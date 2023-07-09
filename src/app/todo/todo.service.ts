import { EventEmitter, Injectable, Output } from "@angular/core";
import { ToDo } from "./list/list.model";
import { ArchiveService } from "../archive/archive.service";
import { Subject } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { dataBaseService } from "../database.service";

@Injectable({providedIn: 'root'})
export class TodoService {

  changesSaved = new Subject<boolean>
  isEditingOn = false;
  error = '';
  private todo: ToDo[] = [
    //new ToDo ('name', 'date', new Date)
   ];

  constructor (private archiveService: ArchiveService,
    private router: Router,
    private route: ActivatedRoute,
    private database: dataBaseService) { 
      this.databaseFetch()
  
    }

  getTodo() {
    return this.todo;
  }
  getToEdit(id: number) {
    return this.todo[id]
  }
  addToList(todoNameInput: string, todoDateInput: string) { 
    if (!this.todo) {
      this.todo = [];
    }
    let date = new Date(0)
    let newTodo = new ToDo(todoNameInput, todoDateInput, date);
    this.todo.push(newTodo)
    this.databaseUpdate()
    
  }
  onUpdateList(id: number, name: string, date: string) {
    this.todo[id].name = name
    this.todo[id].date = date
    this.changesSaved.next(true)
    this.databaseUpdate()
  }
  toArchive(todo: ToDo, index: number) {
    if (this.isEditingOn === true) {
      return
    }
    this.archiveService.addToArchive(todo)
    this.todo.splice(index, 1)
    if (this.todo.length === 0) {
      this.router.navigate(['/todo'], { relativeTo: this.route})
    }
    this.databaseUpdate()
  }
  private databaseUpdate() {
    this.database.sendToDo(this.todo)
  }
  databaseFetch() {
    this.database.getToDo().subscribe(
      data => {
        this.todo = data
      }, error =>{
        this.error = error.message;
      }
    )
  }
  getError() {
    return this.error
  }
}

