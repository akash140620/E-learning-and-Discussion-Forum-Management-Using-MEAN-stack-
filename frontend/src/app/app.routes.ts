import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DiscussionForumComponent } from './discussion-forum/discussion-forum.component';
import { ContentPageComponent } from './content-page/content-page.component';
//import { LessonFormComponent } from './lesson-form/lesson-form.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'discussion-forum', component: DiscussionForumComponent },
    {path: 'content-page', component: ContentPageComponent },
];