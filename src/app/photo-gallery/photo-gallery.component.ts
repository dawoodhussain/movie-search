import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { map } from 'rxjs/operators';
import { TmdbService } from '../shared/services/tmdb.service';

@Component({
  selector: 'app-photo-gallery',
  templateUrl: './photo-gallery.component.html',
  styleUrls: ['./photo-gallery.component.css']
})
export class PhotoGalleryComponent implements OnInit {
  imgArray: any[];
  movieId: string;

  constructor(private tmdbService: TmdbService, private route: ActivatedRoute) {
    this.imgArray = [];
  }

  ngOnInit(): void {
    this.route.params
      .subscribe((
          params: Params) => {
          this.movieId = params['movieId'];
        });


    this.tmdbService.getMovieImages(this.movieId)
    .subscribe(respData => {
      for(const key in respData) {
        this.saveImages(respData[key]['file_path']);
      }
    })
  }

  saveImages(imgpath: string) {
    const newImgPath = "https://image.tmdb.org/t/p/original"+imgpath;
    this.imgArray.push(newImgPath);
  }

}
