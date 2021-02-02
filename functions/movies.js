const { url } = require('url');
const  fetch  = require('node-fetch');
const movies = require('../data/movies.json');

exports.handler = async () => {
  const api = new URL('https://www.omdbapi.com')
   // add the secret API key to the qurey string
   api.searchParams.set('apikey',process.env.OMDB_API_KEY)


  const promises  = movies.map((movie) => {  
    api.searchParams.set('i', movie.id)
    return fetch(api)
      .then((response) => response.json())
      .then((data) => {
        const scores = data.Ratings;
        console.log(`title: ${movie.title} Reviews:`,scores)
        return { ...movie, scores}
      })
  })
  const moviesWithRatings = await   Promise.all(promises)
 
  return {
    statusCode: 200,
    body: JSON.stringify(moviesWithRatings)
  };
}