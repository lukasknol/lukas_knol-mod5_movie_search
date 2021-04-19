const buttons = [...document.getElementsByClassName('buttons__outline')];
const movieMenu = document.getElementById('allmovies__list')
const input = document.getElementById('header__search');

const addEventListeners = () => {
    const handleOnChangeEvent = (event) => {
        const filterMovies = (wordInMovieTitle) => {
            return movies.filter(movie => movie.Title.toLowerCase().includes(wordInMovieTitle));
        }
        const filterLatestMovies = () => movies.filter(movie => movie.Year >= 2014);
        switch (event.target.id) {
            case 'avengers':
            case 'x-men':
            case 'princess':
            case 'batman':
                addMoviesToDom(filterMovies(event.target.id));
                break;
            case 'newest':
                addMoviesToDom(filterLatestMovies());
                break;
            case 'all':
                addMoviesToDom(movies);
                break;
            case 'header__search':
                let inputText = input.value.toLowerCase();
                addMoviesToDom(filterMovies(inputText));
                break;
            default:
                addMoviesToDom(movies);
        }
    }
    input.addEventListener('keyup', handleOnChangeEvent);
    buttons.forEach(button => {
        button.addEventListener('change', handleOnChangeEvent)
    })
}
addEventListeners()

const addMoviesToDom = ((movies) => {
    const clearDom = () => movieMenu.innerHTML = '';
    clearDom();
    const movieList = movies.map((movie) => {
        const movieLi = document.createElement('li');
        movieLi.classList.add('allmovies__list-item');
        const imdbLink = document.createElement('a');
        imdbLink.href = `https://www.imdb.com/title/${movie.imdbID}`;
        imdbLink.target = '_blank';
        const img = document.createElement('img');
        img.src = movie.Poster;
        img.alt = 'movie poster';

        imdbLink.append(img);
        movieLi.append(imdbLink);
        return movieLi;
    })
    movieList.forEach(movieLi => {
        movieMenu.append(movieLi);
    })
})
addMoviesToDom(movies)