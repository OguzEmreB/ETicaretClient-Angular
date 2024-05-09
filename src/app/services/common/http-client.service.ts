import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient: HttpClient, @Inject("baseUrl") private baseUrl: string) { } // app.module.ts de baseUrl olarak bildirildi. baseurl çağırılınca oradaki içerik gelir.

  private url(requestParameter: Partial<RequestParameters>): string {
    return `${requestParameter.baseUrl ? requestParameter.baseUrl : this.baseUrl}/${requestParameter.controller}${requestParameter.action ?`/${requestParameter.action}`:""}`;
  }
  get<T>(requestParameter: Partial<RequestParameters>,Id?:string):Observable<T> {
    let url: string = "";
if(requestParameter.fullEndPoint)
  url=requestParameter.fullEndPoint;
  else
  url = `${this.url(requestParameter)}${Id? `/${Id}`: ""}${requestParameter.queryString ?`?${requestParameter.queryString}` : ""}`; // backtick  AltGr + , ile koyulur.
 
    return this.httpClient.get<T>(url,{headers:requestParameter.headers});
    
  }
  post<T>(requestParameter:Partial<RequestParameters>,body:Partial<T>):Observable<T> {
    let url: string ="";
    if(requestParameter.fullEndPoint)
      url=requestParameter.fullEndPoint;
    else
    url=`${this.url(requestParameter)}${requestParameter.queryString ?`?${requestParameter.queryString}`:""}`;

  return this.httpClient.post<T>(url,body,{headers:requestParameter.headers})
  }
  put<T>(requestParameter:Partial<RequestParameters>,body:Partial<T>):Observable<T> {
let url:string="";
if(requestParameter.fullEndPoint)
  url=requestParameter.fullEndPoint
else
url = `${this.url(requestParameter)}${requestParameter.queryString ?`?${requestParameter.queryString}`:""}`;
  return this.httpClient.put<T>(url,body,{headers:requestParameter.headers})
}
delete<T>(requestParameter:Partial<RequestParameters>,Id:string):Observable<T> {
let url:string="";
  
  if(requestParameter.fullEndPoint)
    url=requestParameter.fullEndPoint;
  else
  url = `${this.url(requestParameter)}/${Id}${requestParameter.queryString ?`?${requestParameter.queryString}`:""}`;

  return this.httpClient.delete<T>(url,{headers:requestParameter.headers});
}
}
export class RequestParameters {
  controller?: string;
  action?: string;
  queryString?:string;
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}