export function listOfMovieTitles(listMoviesTitles, resRows) {
  let listMovie = [];

  for (let i = 0; i < listMoviesTitles.length; i++) {
    for (let j = 0; j < resRows.moviesPlayedTogether1.length; j++) {
      let movieCheck = resRows.moviesPlayedTogether1[j];
      if (listMoviesTitles[i].ID == movieCheck) {
        listMovie.push(listMoviesTitles[i].Title);
      }
    }
  }
  //console.log(listMovie);
  return listMovie;
}

export function getTopactorsNames(resRows, actors) {
  let topActors = [];

  for (let i = 0; i < actors.length; i++) {
    if (actors[i].ID == resRows.firstActor) {
      topActors.push(actors[i].FullName);
    } else if (+actors[i].ID == resRows.secondActor) {
      topActors.push(actors[[i]].FullName);
    }
  }
  return topActors;
}

export function topActorPair(rows) {
  let firstActorCheck;
  let secondActorCheck;
  let countPairActorsTogether = 0;
  let maxCountPairActorsTogether = 0;
  let firstActorId = firstActorCheck;
  let secondActorId = secondActorCheck;
  let moviesPlayedTogether = [];
  let checkIsEqualToFirst;
  let checkIsEqualToSecond;
  let result = {};

  for (let i = 0; i < rows.length; i++) {
    firstActorCheck = +rows[i].ActorID; // first Actor id
    let firstActorMovieID = +rows[i].MovieID;

    if (moviesPlayedTogether.length == 1) {
      moviesPlayedTogether = [];
      firstActorId = null;
      secondActorId = null;
      maxCountPairActorsTogether = 0;
    }

    for (let j = i + 1; j < rows.length; j++) {
      secondActorCheck = +rows[j].ActorID; // second actor id
      let secondActorMovieID = +rows[j].MovieID;

      if (firstActorMovieID !== secondActorMovieID) {
        break;
      }

      countPairActorsTogether = 0;
      for (let l = 0; l < rows.length - 1; l++) {
        for (let p = l + 1; p < rows.length; p++) {
          checkIsEqualToFirst = +rows[l].ActorID; // first
          checkIsEqualToSecond = +rows[p].ActorID;
          let checkMovieIDFirst = +rows[l].MovieID;
          let checkMovieIDSecond = +rows[p].MovieID;

          if (checkMovieIDFirst !== checkMovieIDSecond) {
            break;
          }

          if (
            firstActorCheck == checkIsEqualToFirst &&
            secondActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[p].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          } else if (
            secondActorCheck == checkIsEqualToFirst &&
            firstActorCheck == checkIsEqualToSecond &&
            rows[l].MovieID == rows[l + 1].MovieID
          ) {
            countPairActorsTogether++;
            if (countPairActorsTogether > maxCountPairActorsTogether) {
              maxCountPairActorsTogether = countPairActorsTogether;
              firstActorId = +rows[l].ActorID;
              secondActorId = +rows[l + 1].ActorID;
              moviesPlayedTogether.push(+rows[l].MovieID);
            }
          }
        }
      }
    }
  }
  result.firstActor = firstActorId;
  result.secondActor = secondActorId;
  result.moviesPlayedTogether1 = moviesPlayedTogether;
  result.maxCountPairActorsTogether1 = maxCountPairActorsTogether;
  return result;
}

export function actorAllMoviePrayed(rows, id) {
  let actorAllMoviesAndRoles = [];
  let actorMovieRoles = {};

  for (let i = 0; i < rows.length; i++) {
    if (rows[i].ActorID == id) {
      actorMovieRoles.movieId = rows[i].MovieID;
      actorMovieRoles.roleName = rows[i].RoleName;
      actorAllMoviesAndRoles.push(actorMovieRoles);
    }
    actorMovieRoles = {};
  }

  return actorAllMoviesAndRoles;
}

export function getMoviesInActorDetails(movies, resultActorDetailsRoles) {
  let moviesActorActedAndRoles = [];
  let actorMoviesAndRoles = {};

  for (let i = 0; i < movies.length; i++) {
    for (let j = 0; j < resultActorDetailsRoles.length; j++) {
      if (+movies[i].ID == resultActorDetailsRoles[j].movieId) {
        actorMoviesAndRoles.ID = movies[i].ID;
        actorMoviesAndRoles.Title = movies[i].Title;
        actorMoviesAndRoles.Role = resultActorDetailsRoles[j].roleName;
        moviesActorActedAndRoles.push(actorMoviesAndRoles);
      }
      actorMoviesAndRoles = {};
    }
  }
  return moviesActorActedAndRoles;
}

export function detailsForMovie(rows, id) {
  let movieDetails = {};

  for (let i = 0; i < rows.length; i++) {
    if (+rows[i].ID == id) {
      movieDetails.Id = rows[i].Id;
      movieDetails.Title = rows[i].Title;
      movieDetails.ReleaseDate = rows[i].ReleaseDate;
    }
  }
  return movieDetails;
}

export function movieAllActors(movieActors, id) {
  let allMovieActorsAndRoles = {};
  let allMovieActorsAndRolesArr = [];

  for (let i = 0; i < movieActors.length; i++) {
    if (movieActors[i].MovieID == id) {
      allMovieActorsAndRoles.actorId = movieActors[i].ActorID;
      allMovieActorsAndRoles.role = movieActors[i].RoleName;
      allMovieActorsAndRolesArr.push(allMovieActorsAndRoles);
    }
    allMovieActorsAndRoles = {};
  }

  return allMovieActorsAndRolesArr;
}

export function takeActorsNames(movieActorsNames, resultActorsAndRoles) {
  for (let i = 0; i < movieActorsNames.length; i++) {
    for (let j = 0; j < resultActorsAndRoles.length; j++) {
      if (resultActorsAndRoles[j].actorId == movieActorsNames[i].ID) {
        resultActorsAndRoles[j].actorName = movieActorsNames[i].FullName;
      }
    }
  }
  return resultActorsAndRoles;
}
