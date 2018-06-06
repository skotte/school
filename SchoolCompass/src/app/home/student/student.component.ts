import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from './shared/student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  public id: string;
  public student: any;
  constructor(
    private route: ActivatedRoute,
    private _studentService: StudentService
  ) { }

  ngOnInit() {
    this.getForm();
  }

  private getForm() {
    this.id = this.route.snapshot.params['id'];
     this._studentService.getStudentById(this.id).subscribe(res => {
       this.student = res;
    });
  }

}
