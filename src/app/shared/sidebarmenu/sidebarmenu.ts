import { TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebarmenu',
  imports: [RouterLink, MatListModule, MatIconModule, TitleCasePipe],
  templateUrl: './sidebarmenu.html',
  styleUrl: './sidebarmenu.scss',
})
export class Sidebarmenu {
  fragments = [{ link: 'home', icon: 'home' }, { link: 'alumnos', icon: 'account_circle' }, { link: 'maestros', icon: 'co_present' }, { link: 'calificaciones', icon: 'assignment' }]
  activeLink: string | null = null;
}
