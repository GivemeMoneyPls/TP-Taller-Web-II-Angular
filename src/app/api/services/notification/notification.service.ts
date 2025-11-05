import { Injectable } from '@angular/core';
import { Subject, Observable, timer } from 'rxjs';

export interface NotificationMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notificationSubject = new Subject<NotificationMessage | null>();
  private timerSubscription: any;

  notification$ = this.notificationSubject.asObservable();

  show(type: NotificationMessage['type'], text: string, duration = 3000) {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.notificationSubject.next({ type, text });

    this.timerSubscription = timer(duration).subscribe(() => {
      this.hide();
    });
  }

  hide() {
    this.notificationSubject.next(null);
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }
}