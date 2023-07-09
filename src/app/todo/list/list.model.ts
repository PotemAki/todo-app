export class ToDo {
  [x: string]: any;
  todoDate: any;
  public name: string;
  public date: string;
  public done: Date;
  
  constructor(name: string, date: string, done: Date) {
    this.name = name;
    this.date = date;
    this.done = done;
  }
}
