import { YoutubeVideoModel } from '../../model/youtube-api.model';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class YoutubeApiService {
  private API_KEY: string = 'AIzaSyA32CSf9Wu6cotEeqfOxcd3VsDYnLQIYAM';

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
