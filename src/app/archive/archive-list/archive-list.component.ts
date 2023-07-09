import { Component, Input } from '@angular/core';
import { ArchiveService } from '../archive.service';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.css']
})
export class ArchiveListComponent {
  @Input() todo: any
  @Input() index!: number;
  constructor (private archiveService: ArchiveService) {
  }

  onDelete() {
    this.archiveService.removeToDo(this.index)
  }
}
