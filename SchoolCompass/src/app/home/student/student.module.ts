import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentComponent } from './student.component';
import { StudentService } from './shared/student.service';

@NgModule({
  imports: [
    CommonModule,
    StudentRoutingModule
  ],
  providers: [ StudentService ],
  declarations: [StudentComponent]
})
export class StudentModule { }
