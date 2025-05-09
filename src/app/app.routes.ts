import { Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard, OnlyUnauthorizedGuard } from './routes.guard';

export const routes: Routes = [
    {
        path: 'app',
        component: TodoListComponent,
        title: 'Todo App',
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: RegisterComponent,
        title: 'Register',
        canActivate: [OnlyUnauthorizedGuard]    
    },
    {
        path: '',
        component: WelcomeComponent,
        title: 'Welcome',
        canActivate: [OnlyUnauthorizedGuard]
    },
    {   
        path: '**',
        component: PageNotFoundComponent
    }

];
