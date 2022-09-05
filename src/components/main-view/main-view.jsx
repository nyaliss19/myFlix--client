import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: "The Manchurian Candidate",
          Description: "Desc1...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 2,
          Title: "The Chronicles of Riddick",
          Description: "Desc2...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 3,
          Title: "Dune Part One",
          Description: "Desc3...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 4,
          Title: "Arrival",
          Description: "Desc4...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 5,
          Title: "Riddick",
          Description: "Desc5...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 6,
          Title: "Ex Machina",
          Description: "Desc6...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 7,
          Title: "Annihilation",
          Description: "Desc7...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 8,
          Title: "Awakenings",
          Description: "Desc8...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 9,
          Title: "40 Year Old Virgin",
          Description: "Desc9...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
        {
          _id: 10,
          Title: "Silence of the Lambs",
          Description: "Desc10...",
          Genre: "genre",
          Director: "director",
          ImagePath: "...",
          Featured: "true",
        },
      ],
      selectedMovie: null,
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}

export default MainView;
