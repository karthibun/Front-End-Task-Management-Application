import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-editlist',
  standalone: true,
  imports: [],
  templateUrl: './editlist.component.html',
  styleUrl: './editlist.component.scss'
})
export class EditlistComponent {
  constructor(private route: ActivatedRoute, private taskService: TaskService, private router: Router) { }

  listId: string = '';

  
  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.listId = params['listId'];
        console.log(params['listId']);
      }
    )
  }

  updateList(title: string) {
    this.taskService.updateList(this.listId, title).subscribe(() => {
      this.router.navigate(['/lists', this.listId]);
    })
  }
}
