## Safe to eat shows

A web site where you can check if a movie/series is not to gross to watch while you eat. This website was build using Flask Api for backend, and reactjs + tailwind for frontend.

App hosted [here](https://safe2eat.netlify.app/)

We had some problems deploying the python api to a hosting with ssl, so we used a nextjs proxy that forwards the requests to the htpp python api. ( we received that mixed content between netlify https and our server http ).

## List of team members

[@LMC23](https://twitter.com/CristinaLapusn2)
[@mihaiandrei97](https://twitter.com/MihaiAdrianAnd1)

## Supabase Features

- used supabase-js v2 for user authentication
- used supabase db to store data (for the movies/series, comments, votes)
- user supabase-py to interact with the database

## App Features

- Visitors can search for movies/series and see the rating ( safe to eat / not safe to ea / not yet rated).
- Visitors can find information about a specific movie/series like score/description/release date/credits.
- Visitors can go to the Safe2Eat tab, where they can see every movie rated by the other users.
- Logged user:
  - Can vote if a movie/series is safe to eat / not safe to eat;
  - Can add comments;
  - Can change their nickname.

# Screenshoots

### User can search for movies/series.

![Search Movie or Series](/screenshots/search-movie-or-series.PNG "search movie or series")

### User can see movie/series details and vote.

![Movie details](/screenshots/movie-details.PNG "movie details")

### In this screenshot, you can see how it looks after a user voted and left a comment..

![Add comments](/screenshots/comments-section.PNG "add comments")

### Users can login using email/password.

![Login](/screenshots/login.PNG "login")

### Logged users can specify an username to be used for comments.

![Contact](/screenshots/profile.PNG "contact")
