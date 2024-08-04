  import { Component } from '@angular/core';
  import { TaskService } from '../../task.service';
  import { ActivatedRoute, Params, Router } from '@angular/router';
  import { Task } from '../../models/task.model';

  @Component({
    selector: 'app-newtask',
    standalone: true,
    imports: [],
    templateUrl: './newtask.component.html',
    styleUrl: './newtask.component.scss'
  })
  export class NewtaskComponent {

    constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

    listId!: string;
    
    ngOnInit() {
      this.route.params.subscribe(
        (params: Params) => {
          this.listId = params['listId'];
        }
      )
    }

    createTask(title: string) {
      this.taskService.createTask(title, this.listId).subscribe((newTask: any) => {
        this.router.navigate(['../'], { relativeTo: this.route });
      })
    }
  }
