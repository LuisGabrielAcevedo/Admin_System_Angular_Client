import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: './components/mainComponents/main-container/main-container.module#MainContainerModule'
    },
    {
        path: 'login',
        loadChildren: './components/mainComponents/login/login.module#LoginModule'
    },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
