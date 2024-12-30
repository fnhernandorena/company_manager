import { Component, OnInit } from '@angular/core';
import { EmployesService } from './employes.service';
import { CompanyService } from '../company/company.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { InviteService } from '../invite/invite.service';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [ReactiveFormsModule, QRCodeModule],
  templateUrl: './employes.component.html',
  styleUrls: ['./employes.component.css']
})
export class EmployesComponent implements OnInit {
  employes: any[] = [];
  company: any = {};
  inviteLink: string = '';

  inviteForm = new FormGroup({
    role: new FormControl('', [Validators.required]),
  });

  constructor(
    private employesService: EmployesService,
    private companyService: CompanyService,
    private inviteService: InviteService
  ) {}

  ngOnInit() {
    this.getEmployes();
    this.getCompany();
  }

  getEmployes() {
    this.employesService.getUsers().subscribe(
      (data: any) => {
        this.employes = data;
      },
      (error) => {
        console.error('Error al obtener los empleados:', error);
      }
    );
  }

  getCompany() {
    this.companyService.getCompany().subscribe(
      (data: any) => {
        this.company = data;
      },
      (error) => {
        console.error('Error al obtener la compañía:', error);
      }
    );
  }

  
  createInvite() {
    if (this.inviteForm.valid) {
      const role = Number(this.inviteForm.get('role')?.value);

      this.inviteService.createInvite(role).subscribe(
        (response: any) => {
       this.inviteLink = `http://localhost:4200/invite/${response.id}`;
        },
        (error:any) => {
          console.error('Error al crear la invitación:', error);
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }
}
