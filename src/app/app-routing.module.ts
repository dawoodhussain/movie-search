import { WatchlistComponent } from './watchlist/watchlist.component';
import { TrailerComponent } from './trailer/trailer.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';
import { HomeComponent } from './home/home.component';
import { PhotoGalleryComponent } from './photo-gallery/photo-gallery.component';
import { VideoGalleryComponent } from './video-gallery/video-gallery.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'watchlist', component: WatchlistComponent },
  {
    path: 'movietrailer/:movieId',
    component: TrailerComponent,
    runGuardsAndResolvers: 'always',
  },
  { path: 'photogallery/:movieId', component: PhotoGalleryComponent },
  { path: 'videogallery/:movieId', component: VideoGalleryComponent },
  { path: 'not-found', component: ErrorPageComponent },
  { path: '**', redirectTo: '/not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
