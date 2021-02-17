import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Global } from './global';

@Injectable()
export class PersonaService
{
	private url: string;

	constructor(
		private _http: HttpClient
	){
		this.url = Global.url;
	}

	list(id = null): Observable<any>
	{
		let url = this.url;
		if(id != null)
			url = url + '?persona=' + id;
		
		return this._http.get(url);
	}

	create(persona): Observable<any>
	{
		let json = JSON.stringify(persona);
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.post(this.url, params, { headers: headers });
	}

	update(persona): Observable<any>
	{
		let json = JSON.stringify(persona);
		let params = "json=" + json;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.put(this.url, params, { headers: headers });
	}

	delete(id): Observable<any>
	{
		let url = this.url + "?persona=" + id;
		let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
		return this._http.delete(url, { headers: headers });
	}
}