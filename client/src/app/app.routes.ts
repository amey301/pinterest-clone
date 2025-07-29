import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { authGuard } from './guards/auth.guard';
import { CreatePostComponent } from './components/create-post/create-post.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent,
        title: 'Pinterest Login'  // Recommended: Add page title fir SEO
    },
     {
        path: 'register',
        component: RegisterComponent,
        title: 'Register'  // Recommended: Add page title fir SEO
    },
         {
        path: 'homepage',
        component: HomepageComponent,
        title: 'Homepage'  // Recommended: Add page title fir SEO
    },
      {
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile',  // Recommended: Add page title fir SEO
        canActivate: [authGuard]
    },
       {
        path: 'navbar',
        component: NavbarComponent,
        title: 'Navbar'  // Recommended: Add page title fir SEO
    },
      {
        path: 'create-post',
        component: CreatePostComponent,
        title: 'Create Post',  // Recommended: Add page title fir SEO
        canActivate: [authGuard]
    },
    {
        path: '',       // Recommended: Add default route
        redirectTo: 'homepage',
        pathMatch: 'full'
    },
    {
        path: '**',     // Recommended: Add wildcard route for 404
        redirectTo: 'homepage'
    }
];