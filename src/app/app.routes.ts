import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard, OnlyUnauthorizedGuard } from './routes.guard';
import { PlaygroundComponent } from './playground/playground.component';
import { TodoAppComponent } from './todo-app/todo-app.component';

export const routes: Routes = [
    {
        path: 'app',
        component: TodoAppComponent,
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
        path: 'playground',
        component: PlaygroundComponent,
        title: 'Playground'
    },
    {
        path: '',
        component: WelcomeComponent,
        title: 'Welcome',
        canActivate: []
    },
    {   
        path: '**',
        component: PageNotFoundComponent
    }

];
