import { YoutubeVideoModel } from '../../model/youtube-api.model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Apikeys } from "../apiconfig";

@Injectable({providedIn: 'root'})
export class YoutubeApiService {
  private API_KEY: string = Apikeys.YOUTUBE_API_KEY;

  constructor(private http: HttpClient) {}

  getMovieTrailer(name: string) {
    return this.http.get<YoutubeVideoModel>('https://youtube.googleapis.com/youtube/v3/search?part=snippet', {
      params: new HttpParams().set('maxResults', '1').set('q', name + ' Trailer').set('key', this.API_KEY)
    })
    .pipe(map(respData => {
      console.log(respData);

      return respData.items;
    }));
  }

}
