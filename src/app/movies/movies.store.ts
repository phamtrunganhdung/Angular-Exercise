import { Injectable } from '@angular/core';

import { ComponentStore } from '@ngrx/component-store';

import { MoviesState } from '../interface';

@Injectable()
export class MoviesStore extends ComponentStore<MoviesState> {
  constructor() {
    super({ movies: [], userPreferredMoviesIds: [] });
  }

  readonly movies$ = this.select((state) => state.movies);
  readonly userPreferredMovieIds$ = this.select(
    (state) => state.userPreferredMoviesIds
  );
}
