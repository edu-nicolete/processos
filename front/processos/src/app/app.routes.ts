import { Routes } from '@angular/router';
import { ProcessosComponent } from './views/components/processos/processos.component'

export const routes: Routes = [
    {
        path: '',
        component: ProcessosComponent
    },
    {
        path: 'processos',
        component: ProcessosComponent
    }
];
