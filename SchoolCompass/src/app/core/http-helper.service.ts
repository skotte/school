import { Injectable } from '@angular/core';
import { Http, RequestOptionsArgs, Response, ResponseContentType } from '@angular/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpHelperService {

    public baseUrl = 'http://localhost:54753';
    // tslint:disable-next-line:member-ordering
    static readonly contentFilenamePattern: RegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

    constructor(
        private http: Http,
        private router: Router
    ) { }
    public catchBadResponse: (errorResponse: any) => Observable<any> = (errorResponse: any) => {

        const res = <Response>errorResponse;

        if ((res.status === 401) &&
            (!this.router.isActive('/login', false))) {
            // this.toastsManager.error('Session Expired');
            console.log('Session Expired');
            const url = this.router.url;
            this.router.navigate(['/login'], { queryParams: { returnUrl: url } });
        } else {
            try {
                const err = res.json();
                let emsg = err
                    ? (err.Message ? err.Message : JSON.stringify(err))
                    : (res.statusText || 'unknown error');

                if (err && err.ExceptionMessage) {
                    emsg += `\r\n${err.ExceptionMessage}`;
                }
                console.log(`Error - ${emsg}`);
                return (err && err.Model) ? Observable.of(err.Model) : Observable.of(null); // should be a throw?
            } catch (err) {
                const errMsg = `Error ${res.status}: ${res.statusText}`;
                console.log(`Error - ${errMsg}`);
                return Observable.throw(new Error(errMsg));
            }
        }
    }


    public delete(url: string) {
        const urlString = this.getExtUrl(url);
        return this.http
            .delete(urlString, { withCredentials: true })
            .map(resp => {
                const data = this.extractData(resp);
                return data;
            })
            .catch(this.catchBadResponse);
    }

    public download(url: string, body?: any) {
        const urlString = this.getExtUrl(url);

        const options: RequestOptionsArgs = { responseType: ResponseContentType.Blob, withCredentials: true };

        let request$ = null;
        if (body) {
            request$ = this.http.post(urlString, body, options);
        } else {
            request$ = this.http.get(urlString, options);
        }

        return request$.catch(this.catchBadResponse);
    }

    public extractData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error('Bad response status: ' + res.status);
        }
        const body = res.json ? res.json() : null;
        return (body || {});
    }

    public get(url: string) {
        const urlString = this.getExtUrl(url);

        return this.http
            .get(urlString, { withCredentials: true })
            .map(resp => {
                const data = this.extractData(resp);
                return data;
            })
            .catch(this.catchBadResponse);
    }

    public getFilename(contentDisposition: string) {
        contentDisposition = contentDisposition || '';
        const matchArray = HttpHelperService.contentFilenamePattern.exec(contentDisposition);
        const returnValue = (matchArray.length <= 2) ? null
            : matchArray[1].replace(/"/g, '');
        return returnValue;
    }

    public getExtUrl(url: string) {
        return url.startsWith('/') ? url.substring(1) : url;
    }

    public getUrl(url: string) {
        return this.baseUrl + url;
    }

    public post(url: string, body: any, extractData?: boolean) {
        const urlString = this.getExtUrl(url);
        // tslint:disable-next-line:curly
        if ((typeof extractData === 'undefined') || (extractData == null)) extractData = true;
        return this.http
            .post(urlString, body, { withCredentials: true })
            .map(resp => {
                return (extractData) ? this.extractData(resp) : resp;
            })
            .catch(this.catchBadResponse);
    }

    public getSiteConfigurationByKey(key) {
        return this.http
            .get(this.getExtUrl(`/api/lookup/config/${key}`), { withCredentials: true })
            .map(res => {
                // get the data
                const extractedData = this.extractData(res);
                // return sorted data
                return extractedData;
            })
            .catch(this.catchBadResponse);
    }

}
