import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DiscussionForumComponent } from './discussion-forum/discussion-forum.component';
import { ContentPageComponent } from './content-page/content-page.component';
import { AdminComponent } from './admin/admin.component';
import { CourseComponent } from './course/course.component';
import { LessonComponent } from './lesson/lesson.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'discussion-forum', component: DiscussionForumComponent },
    { path: 'content-page', component: ContentPageComponent },
    { path: 'course', component: CourseComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'lesson', component: LessonComponent },
];
