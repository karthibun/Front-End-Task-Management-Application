import { Component } from '@angular/core';
import { TaskService } from '../../task.service';
import { Router } from '@angular/router';
import { List } from '../../models/list.model';

@Component({
  selector: 'app-newlist',
  standalone: true,
  imports: [],
  templateUrl: './newlist.component.html',
  styleUrl: './newlist.component.scss'
})
export class NewlistComponent {
  constructor(private taskService: TaskService, private router: Router) { }

  ngOnInit() {
  }

  createList(title: string) {
    this.taskService.createList(title).subscribe((list: any) => {
      console.log(list);
      // Now we navigate to /lists/task._id
      this.router.navigate([ '/lists', list._id ]); 
    });
  }
}
