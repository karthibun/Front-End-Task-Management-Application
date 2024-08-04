import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';
import { List } from '../../models/list.model';
import { Task } from '../../models/task.model';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-taskview',
  standalone: true,
  imports: [CommonModule,RouterModule,HttpClientModule],
  templateUrl: './taskview.component.html',
  styleUrl: './taskview.component.scss',
  providers: [TaskService]
})
export class TaskviewComponent {
  lists: List[] = [];
  tasks: Task[] = [];

  selectedListId: string = '';

  constructor(private taskService: TaskService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        if (params['listId']) {
          this.selectedListId = params['listId'];
          this.taskService.getTasks(params['listId']).subscribe((tasks: any) => {
            this.tasks = tasks;
          })
        } else {
          this.tasks = [];
        }
      }
    )
    this.taskService.getLists().subscribe((lists: any) => {
      console.log("lists",lists);
      this.lists = lists;
    })
    
  }

  onTaskClick(task: Task) {
    // we want to set the task to completed
    this.taskService.complete(task).subscribe(() => {
      // the task has been set to completed successfully
      console.log("Completed successully!");
      task.completed = !task.completed;
    })
  }

  onDeleteListClick() {
    this.taskService.deleteList(this.selectedListId).subscribe((res: any) => {
      this.router.navigate(['/lists']);
      console.log(res);
    })
  }

  onDeleteTaskClick(id: string) {
    this.taskService.deleteTask(this.selectedListId, id).subscribe((res: any) => {
      this.tasks = this.tasks.filter(val => val._id !== id);
      console.log(res);
    })
  }

}

