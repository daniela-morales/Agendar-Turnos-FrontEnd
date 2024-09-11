import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule,MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  userId = 0;


  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(response => {
      this.authService.saveToken(response.token);
      this.loadUserShifts();      
    }, error => {
      alert('Credenciales incorrectas');
    });
  }

  loadUserShifts(): void {
    this.authService.getUserByUsername(this.username).subscribe(
      (user: any) => {
        this.userId = user.idUser;
        this.router.navigate(['/Shifts'], {
          queryParams: {
            userId: this.userId
          },
        });
      }
    );
  }
}
