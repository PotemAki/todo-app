import { Injectable } from "@angular/core";
import { ToDo } from "../todo/list/list.model";
import { dataBaseService } from "../database.service";


@Injectable({providedIn: 'root'})
export class ArchiveService {

  private archiveTodo: ToDo[] = [
    //new ToDo (1, 'name', 'date')
   ];

  timestamp = new Date();

  constructor (private database: dataBaseService) { 
      this.databaseFetch()
    }
   getTodo() {
    return this.archiveTodo;
  }
   addToArchive(todo :ToDo) {
    if (!this.archiveTodo) {
      this.archiveTodo = [];
    }
    todo.done = new Date();
    this.archiveTodo.push(todo)
    this.database.sendArchive(this.archiveTodo)

  }
   removeToDo(index: number) {
    this.archiveTodo.splice(index, 1)
    this.database.sendArchive(this.archiveTodo)
   }

   databaseFetch() {
    this.database.getArchive().subscribe(
      data => {
        this.archiveTodo = data
      }
    )
  }
}