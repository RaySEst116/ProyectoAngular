import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebarmenu } from '../../shared/sidebarmenu/sidebarmenu';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    Sidebarmenu
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})

export class Layout {

  authService = inject(AuthService)
  initials = this.authService.getInitials();
}
