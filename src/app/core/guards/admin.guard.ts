import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../api/services/auth/auth.service';
import { NotificationService } from '../../api/services/notification/notification.service';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (!authService.isLoggedIn()) {
    router.navigate(['/signin']);
    return false;
  }

  if (authService.isAdmin()) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }
};