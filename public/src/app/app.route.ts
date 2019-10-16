import { Routes } from '@angular/router';
import { UsercrudComponent } from './usercrud/usercrud.component';


export const rootRouterConfig: Routes = [
    { path: '', redirectTo: 'usercrud', pathMatch: 'full' },
  { path: 'usercrud', component: UsercrudComponent,  },

];

