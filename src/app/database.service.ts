import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ToDo } from "./todo/list/list.model";

@Injectable({providedIn: 'root'})
export class dataBaseService {

  constructor(private http: HttpClient) { }


  sendToDo(todo: ToDo[]) {
    this.http.put('https://todo-list-a1acd-default-rtdb.firebaseio.com/todo.json', todo).subscribe()
  }

  getToDo() {
    return this.http.get<ToDo[]>('https://todo-list-a1acd-default-rtdb.firebaseio.com/todo.json')
  }

  sendArchive(archiveToDo: ToDo[]) {
    this.http.put('https://todo-list-a1acd-default-rtdb.firebaseio.com/archive.json', archiveToDo).subscribe()
  }
  
  getArchive() {
    return this.http.get<ToDo[]>('https://todo-list-a1acd-default-rtdb.firebaseio.com/archive.json')
  }
}

