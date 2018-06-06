import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';
import * as _ from 'lodash';
import { Subject } from 'rxjs/Subject';
import { HttpHelperService } from '../../../core/http-helper.service';

@Injectable()
export class StudentService {

  constructor(
    private http: Http,
    private _httpHelperService: HttpHelperService
  ) { }

  public getStudentById(id: string) {
    return this.http
    .get(this._httpHelperService.getUrl(`/api/Student/${id}`))
    .map(res => {
        const extractedData = this._httpHelperService.extractData(res);
        return extractedData;
    })
    .catch(this._httpHelperService.catchBadResponse)
    .finally(() => {});
  }

  public getStudentData() {
    const xhr = new XMLHttpRequest();
    const url = 'http://localhost:54753/api/Student/24163BAE-6E91-455A-B244-E110208638E9';

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          const data = JSON.parse(xhr.response);
          console.log(data);
        } else {
          console.log(xhr.response);
        }
      }
    };

    xhr.open('GET', url, true);
    xhr.send();

  }
}
