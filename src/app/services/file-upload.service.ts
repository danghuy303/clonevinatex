import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API } from './host';

const host = API.imgURL;
const uploadUrl: string = `${host}/uploader/Post`;

@Injectable({
  providedIn: 'root'
})

export class FileUploadService {

  constructor(
    private http: HttpClient,
  ) { }

  postFile(files: FileList): Observable<HttpEvent<Object>> {
    const formData: FormData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i], files[i].name);
    }
    return this.http.post(`${uploadUrl}`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

}
