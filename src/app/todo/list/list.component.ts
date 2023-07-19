import { Component, Input, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToDo } from './list.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  @Input()
  todo!: ToDo;
  @Input()
  index!: number;
  id: number | undefined;
  allowEdit = false

  constructor(private todoService: TodoService,
      private router: Router,
      private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id']
      }
    )
    this.route.queryParams.subscribe(
      (queryParams: Params) => {
        
        this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
      })
  }
 
  onEdit() {
    this.router.navigate([this.index, 'edit'], {queryParams: {allowEdit: '1'} , relativeTo: this.route})
  }

  onMoveToArchive() {
    if (this.allowEdit) {
      return
    }
    this.todoService.toArchive(this.todo, this.index)
  }
}
