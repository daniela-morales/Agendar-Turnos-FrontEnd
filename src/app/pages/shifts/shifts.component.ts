import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ShiftsService } from '../../services/shifts.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ShiftDto } from '../../interfaces/shift.interface';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shifts',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    CommonModule, 
    FormsModule
  ],
  templateUrl: './shifts.component.html',
  styleUrl: './shifts.component.css'
})
export class ShiftsComponent implements OnInit {
  availableShifts: ShiftDto[] = [];
  userShifts: ShiftDto[] = [];
  userId: number = 0;

  constructor(private shiftService: ShiftsService, private cdr: ChangeDetectorRef, private route: ActivatedRoute) {
    this.userId = this.route.snapshot.queryParams['userId'];
    console.log(this.userId);
  }

  ngOnInit(): void {
    this.loadAvailableShifts();
    this.loadUserShifts();
  }

  // Cargar turnos disponibles
  loadAvailableShifts(): void {
    this.shiftService.getAvailableShifts().subscribe(
      (shifts: ShiftDto[]) => {
        this.availableShifts = shifts;
      }
    );
  }

  // Cargar turnos del usuario
  loadUserShifts(): void {
    this.shiftService.getShiftsByUser(this.userId).subscribe(
      (shifts: ShiftDto[]) => {
        this.userShifts = shifts;
      }
    );
  }

  // Asignar un usuario a un turno
  assignUserToShift(idShift: number): void {
    this.shiftService.assignUserToShift(idShift, this.userId).subscribe(
      response => {
        this.loadAvailableShifts(); 
        this.loadUserShifts();
        this.cdr.detectChanges();
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
      }
    );
  }

  // Actualizar turno (activar)
  activateShift(shift: ShiftDto): void {
    shift.isActive = true;
    this.shiftService.updateShift(shift).subscribe(
      response => {
        this.loadUserShifts(); 
      },
      (err: HttpErrorResponse) => {
        alert(err.error);
      }
    );
  }
}