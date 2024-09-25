import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { OrderComponent } from './components/order/order.component';
import { OrderConfirmComponent } from './components/order-confirm/order-confirm.component';
import { AuthGaurd, AuthGuardFn } from './guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';
import { AdminGuardFn } from './guards/admin.guard';
import { OrdersComponent } from './components/admin/orders/orders.component';

export const routes: Routes = [
    {
        path: '', 
        component: HomeComponent,
        canActivate: [AuthGuardFn]
    },
    {
        path: 'login', 
        component: LoginComponent
    },
    {
        path: 'register', 
        component: RegisterComponent
    },
    {
        path: 'products/:id', 
        component: DetailProductComponent
    },
    {
        path: 'orders', 
        component: OrderComponent,
        canActivate: [AuthGuardFn]
    },
    {
        path: 'orders/:id', 
        component: OrderConfirmComponent
    },
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuardFn]
    },
    {
        path: 'admin/orders',
        component: OrdersComponent,
        canActivate: [AdminGuardFn]
    },
    {
        path: 'admin/categories',
        component: AdminComponent,
        canActivate: [AdminGuardFn]
    },
    {
        path: 'admin/products',
        component: AdminComponent,
        canActivate: [AdminGuardFn]
    },
    {
        path: 'admin/dashboard',
        component: AdminComponent,
        canActivate: [AdminGuardFn]
    },
];
