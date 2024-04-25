import { Component } from '@angular/core';
import { HeadComponent } from "./head/head.component";
import { CentreContentComponent } from "./centre-content/centre-content.component";
import { ContactUsComponent } from "./contact-us/contact-us.component";
import { CourseDisplayComponent } from './course-display/course-display.component';
import { SessionService } from '../../services/session.service';
@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeadComponent,CentreContentComponent, ContactUsComponent, CourseDisplayComponent]
})
export class HomeComponent {
    constructor(private sessionService: SessionService) {}
    
}
