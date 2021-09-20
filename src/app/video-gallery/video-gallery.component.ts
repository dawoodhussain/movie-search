import { Component, OnInit, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { TmdbService } from '../shared/services/tmdb.service';

@Component({
  selector: 'app-video-gallery',
  templateUrl: './video-gallery.component.html',
  styleUrls: ['./video-gallery.component.css']
})
export class VideoGalleryComponent implements OnInit {
  videoArray: any[];
  movieId: string;

  constructor(
    private tmdbService: TmdbService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer) {
    this.videoArray = [];
   }

  ngOnInit(): void {
    this.route.params
      .subscribe((
          params: Params) => {
          this.movieId = params['movieId'];
        });

    this.tmdbService.getMovieVideoClips(this.movieId)
    .subscribe(respData => {
      for(const key in respData) {
        this.saveVideoPaths(respData[key]['key']);
      }
    })

    console.log(this.videoArray);

  }

  saveVideoPaths(videoId: string) {
    const newVideoPath = this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/"+videoId);
    this.videoArray.push(newVideoPath);
  }


}
