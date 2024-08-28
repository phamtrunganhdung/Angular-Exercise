import { AsyncPipe, CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Observable } from 'rxjs';

import { Movie } from '../interface';
import { MoviesStore } from './movies.store';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [AsyncPipe, CommonModule, FormsModule],
  templateUrl: './movies.component.html',
  providers: [MoviesStore],
})
export class MoviesComponent {
  movies$!: Observable<Movie[]>;
  userPreferredMovies$!: Observable<Movie[]>;
  inputVal!: string;
  constructor(private readonly moviesStore: MoviesStore) {
    this.movies$! = this.moviesStore.movies$;
  }

  ngOnInit() {
    this.moviesStore.setState({
      movies: [
        {
          id: 'phim1',
          name: 'phim1',
        },
        {
          id: 'phim2',
          name: 'phim2',
        },
        {
          id: 'phim3',
          name: 'phim3',
        },
        {
          id: 'phim4',
          name: 'phim4',
        },
        {
          id: 'phim5',
          name: 'phim5',
        },
      ],
      userPreferredMoviesIds: ['phim1', 'phim2', 'phim3', 'phim5'],
    });
  }

  addMovie() {
    this.moviesStore.setState((state) => {
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: this.inputVal,
            name: this.inputVal,
          },
        ],
      };
    });
    this.inputVal = '';
  }
}
