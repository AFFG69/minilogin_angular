import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
export const routes: Routes = [

{ path: 'register', component: RegisterComponent },
{
    path: '',
    redirectTo:'login',
    pathMatch:'full'

},

{
    path: 'login',
    component:LoginComponent
},

{
    path: '',
    component: LayoutComponent,
    children:[
        {
            path:'dashboard',
            component: DashboardComponent
            
        }
    ]

}
];
