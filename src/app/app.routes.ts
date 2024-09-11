import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { ShiftsComponent } from './pages/shifts/shifts.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent, pathMatch: "full" },
    { path: 'Shifts', component: ShiftsComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login', pathMatch: "full" }
];

export const routing = RouterModule.forRoot(routes);