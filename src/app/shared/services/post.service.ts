import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost, responsepost } from '../module/posts';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  baseUrl: string = environment.basepostUrl;
  postUrl = `${this.baseUrl}/posts.json`;


  private datasubject = new BehaviorSubject<any>(null);
  private data$: Observable<any> = this.datasubject.asObservable();
  private cachedData: any


  constructor(private _http: HttpClient) { }




  getAllposts(): Observable<Ipost[]> {
    return this._http.get<responsepost>(this.postUrl)
      .pipe(
        map(res => {
          const postArray = []
          for (const key in res) {
            console.log(res[ key ])
            let obj = {
              ...res[ key ],
              id: key
            }
            console.log(obj)
            postArray.push(obj)
            console.log(postArray)
          }
          return postArray;
        })
      )
  }



  getsinglepost(id: string): Observable<Ipost> {
    let postUrl = `${this.baseUrl}/posts/${id}.json`
    return this._http.get<Ipost>(postUrl)
  }



  updatepost(post: Ipost): Observable<Ipost> {
    let updateurl = `${this.baseUrl}/posts/${post.id}.json`
    return this._http.patch<Ipost>(updateurl, post)
  }


  createpost(obj: Ipost): Observable<Ipost> {
    return this._http.post<Ipost>(this.postUrl, obj)
  }



  deletepost(id: string): Observable<Ipost> {
    let deleteUrl = `${this.baseUrl}/posts/${id}.json`
    return this._http.delete<Ipost>(deleteUrl)
  }



}
