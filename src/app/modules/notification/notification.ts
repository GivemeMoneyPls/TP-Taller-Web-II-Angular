import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, NotificationMessage } from '../../api/services/notification/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  imports: [CommonModule], 
  templateUrl: './notification.html',
  styleUrl: './notification.css',
})
export class NotificationComponent {

  notificationService = inject(NotificationService);
  currentNotification$: Observable<NotificationMessage | null>;

  constructor() {
    this.currentNotification$ = this.notificationService.notification$;
  }

  getNotificationClass(type: string | undefined): string {
    switch (type) {
      case 'success':
        return 'bg-success-dark'; 
      case 'error':
        return 'bg-error-dark';   
      case 'info':
      default:
        return 'bg-info-dark';    
    }
  }
}