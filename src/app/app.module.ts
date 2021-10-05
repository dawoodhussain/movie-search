import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TrailerComponent } from './trailer/trailer.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { MovieFullDetails } from './model/movie-details.model';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { AboutComponent } from './about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TrailerComponent,
    ErrorPageComponent,
    PhotoGalleryComponent,
    VideoGalleryComponent,
    WatchlistComponent,
    LoadingSpinnerComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AutocompleteLibModule,
    SlickCarouselModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
