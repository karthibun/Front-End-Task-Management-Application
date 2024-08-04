import { RouterModule, Routes } from '@angular/router';
import { NewlistComponent } from './pages/newlist/newlist.component';
import { NgModule } from '@angular/core';
import { LoginpageComponent } from './pages/loginpage/loginpage.component';
import { TaskviewComponent } from './pages/taskview/taskview.component';
import { NewtaskComponent } from './pages/newtask/newtask.component';
import { SignuppageComponent } from './pages/signuppage/signuppage.component';
import { EditlistComponent } from './pages/editlist/editlist.component';
import { EdittaskComponent } from './pages/edittask/edittask.component';

export const routes: Routes = [
    { path: '', redirectTo: '/lists', pathMatch: 'full' },
    { path: 'new-list', component: NewlistComponent },
    { path: 'edit-list/:listId', component: EditlistComponent },
    { path: 'login', component: LoginpageComponent },
    { path: 'signup', component: SignuppageComponent },
    { path: 'lists', component: TaskviewComponent },
    { path: 'lists/:listId', component: TaskviewComponent },
    { path: 'lists/:listId/new-task', component: NewtaskComponent },
    { path: 'lists/:listId/edit-task/:taskId', component: EdittaskComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  