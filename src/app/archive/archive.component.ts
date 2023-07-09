import { Component, OnInit } from '@angular/core';
import { ToDo } from '../todo/list/list.model';
import { ArchiveService } from './archive.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements OnInit {
  todo: ToDo[] = [];

  constructor (private archiveService: ArchiveService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.todo = this.archiveService.getTodo();
    this.route.params.subscribe(
      (params: Params) => {
        this.todo = this.archiveService.getTodo();
      }
    )
  }
  ngDoCheck(): void {
    this.todo = this.archiveService.getTodo();
  }
}
