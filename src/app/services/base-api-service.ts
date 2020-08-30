import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';

interface IRequestOptions {
  url: string;
  parameters?: any;
  headers?: {[header: string]: string | string[]};
  formdata?: any;
  prependBaseUrl?: boolean;
  options?: any;
}

interface ServiceRequest {
  get(options: IRequestOptions): Observable<Object>;
  post(options: IRequestOptions): Observable<Object>;
  put(options: IRequestOptions): Observable<Object>;
  delete(options: IRequestOptions): Observable<Object>;
}

@Injectable({providedIn: "root"})
export class BaseAPIService {
    constructor(public http: HttpClient) {}
    private baseURL = environment.baseUrl;
    private defautHeaders = { 'Content-Type': 'application/json' };

    setHttpHeader(httpheaders: { [header: string]: string | string[]; } = {} ) {
      let headers = new HttpHeaders({...this.defautHeaders, ...httpheaders});
      if(httpheaders['Content-Type'] == 'multipart/form-data'){
        headers = headers.delete('Content-Type'); //removing content type while on uploading files
      }
      if(this.getCookie('access_token'))
      headers =  headers.set('Authorization', `Bearer ${this.getCookie('access_token').replace(/"/g, "")}`);
      
      return headers;
    }

    public get({url, parameters, headers, prependBaseUrl = true, options = {}}: IRequestOptions): Observable<Object> {
      const httpheaders = this.setHttpHeader(headers);
      let params = new HttpParams();
      if (parameters) {
        parameters.forEach(( value: string, key: string)=>{
          params = params.set(key, value);
        });
      }
      if (prependBaseUrl) {
        url = `${this.baseURL}${url}`;
      }
      
      return this.http.get(url, {
        headers: httpheaders,
        ...options,
        params: params
      });
    }

    public post({url, parameters, headers, prependBaseUrl = true, options = {}}: IRequestOptions): Observable<Object> {
      const httpheaders = this.setHttpHeader(headers);
      
      if(prependBaseUrl) url = `${this.baseURL}${url}`;
      return this.http.post(url, parameters, {
        headers: httpheaders,
        ...options
      });
    }

    protected upload({url, formdata, headers, options = {}}: IRequestOptions): Observable<Object> {
      const httpheaders = headers || new HttpHeaders();
      
      url = `${this.baseURL}${url}`;
      return this.http.post(url, formdata, {
        headers: httpheaders,
        ...options
      });
    }

    protected put({url, parameters, headers, prependBaseUrl=true, options = {}}: IRequestOptions): Observable<Object> {
      const httpheaders = this.setHttpHeader(headers);
      
      if(prependBaseUrl) url = `${this.baseURL}${url}`;
      return this.http.put(url, parameters, {
        headers: httpheaders,
        ...options
      });
    }

    protected delete({url, headers, options = {}}: IRequestOptions): Observable<Object> {
      const httpheaders = this.setHttpHeader(headers);
      
      url = `${this.baseURL}${url}`;
      return this.http.delete(url, {
        headers: httpheaders,
        ...options
      });
    }


    //Added here to avoid circular dependency error
    getCookie(name) {
      const cokkieArray = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
      return cokkieArray ? cokkieArray[2] : null;
    }
}

