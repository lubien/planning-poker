<h1 align="center">
  <br>
  <a href="http://www.amitmerchant.com/electron-markdownify">
    <img src="http://i.imgur.com/zEc6PeF.png" alt="Spider Poker">
  </a>
  <br>
  Spider Poker
  <br>
</h1>

<h4 align="center">Self hosted <a href="https://en.wikipedia.org/wiki/Planning_poker" target="_blank">Planning Poker</a> WebApp</h4>

Basic feature list:

  * See **live updates** between your team members while you make changes **to your backlog**
  * Live **chat** with your team members and **you can retreive the log** later
  * **Import** your backlog from tools like [Trello](https://trello.com/) and [Redmine](http://www.redmine.org/)

## Development

We rely heavily on [docker](https://docs.docker.com/engine/installation/#cloud) during development so I'll assume you have `docker-compose`.

**First time** only:

```sh
docker-compose run api mix ecto.setup # create and migrate database
```

Start the development server:

```sh
docker-compose up
```

With this single command you'll have all servers running without having to install anything manually.

Go to [`localhost:8000`](http://localhost:8000) to see the application running.

## Testing

Docker on rescue again but now you have to manually pass a `MIX_ENV=test` so our `docker-compose.yml` uses a testing database.

```sh
MIX_ENV=test docker-compose run api mix test
```

And if you want to lint the code:

```sh
docker-compose run api mix credo --strict
```

<div>
  <h2>
    Team<a href="http://spider.ufpa.br/"><img src="http://i.imgur.com/ojl8970.png" alt="Projeto Spider logo" align="right" height="96"/></a>
  </h2>
</div>

![Lubien](https://avatars.githubusercontent.com/u/9121359?s=130) | ![leochrisis](https://avatars.githubusercontent.com/u/24917387?s=130)
---|---
[Lubien](http://lubien.me) | [Leonardo Christian](https://github.com/leochrisis)

## Learn more

  * Projeto Spider official website (in portuguese): http://spider.ufpa.br/
  * Planning Poker: https://en.wikipedia.org/wiki/Planning_poker
  * Phoenix framework used in our back-end: http://phoenixframework.org/docs/overview
  * Quasar framework used in our front-end: http://quasar-framework.org/
