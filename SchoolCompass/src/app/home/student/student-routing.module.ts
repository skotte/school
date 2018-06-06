import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent
    // children: [
    //   { path: 'health', loadChildren: 'app/member/health/health.module#HealthModule' }
    // ]
  },
  {
    path: ':id',
    component: StudentComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class StudentRoutingModule { }
