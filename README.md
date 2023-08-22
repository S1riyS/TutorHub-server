<div id="readme-top"></div>

[![Swagger docs](https://github.com/S1riyS/TutorHub-server/actions/workflows/swagger.yml/badge.svg?branch=master&style=flat)](https://github.com/S1riyS/TutorHub-server/actions/workflows/swagger.yml)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/S1riyS/TutorHub-server/master?logo=codefactor&logoColor=959da5&label=Code%20Quality&labelColor=333a41&color=32cb55)](https://www.codefactor.io/repository/github/s1riys/tutorhub-server/overview/master)

[//]: # (Project logo)
<br/>
<div align="center">
    <a href="https://github.com/S1riyS/TutorHub-server">
        <img src="https://i.postimg.cc/QMccxrR7/rounded-in-photoretrica.png" alt="Logo" width="140" height="140">
    </a>
    <h3 align="center">TutorHub</h3>
    <p align="center">
        <a href="https://s1riys.github.io/TutorHub-server/" target="_blank" rel="noopener noreferrer">
            <strong>Explore the API docs »</strong>
        </a>
    </p>
</div>

## 📝 About The Project

[**TutorHub**][GitHub-repo-link] - is a platform where students and teachers can find each
other. Here you can assign lessons, conveniently give and accomplish homework.

Platform has a lot of search parameters:

* Topic that you would like to learn
* Price of the lesson
* Teaching format *(e.g. remotely or teacher will go to your house)*
* Experience of tutor

Also, you can specify the time, when you are ready to study, so we can offer you those tutors, who are ready to work at
this time

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Getting started

### 1. Clone a repo

```bash
git clone https://github.com/S1riyS/TutorHub-server.git
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Set up `.env` file:

This project uses `.env` file for configuration.

In order to find out, what exactly must be there, check out
[`.env.example`](https://github.com/S1riyS/TutorHub-server/blob/master/.env.example).

> [!IMPORTANT]
> Put `.env` file in the root of the project

### 4. Run the app

```bash
npx prisma migrate dev
npx prisma generate
npm run start:dev
```

> [!NOTE]
> Commands above are for running app in development mode

<p align="right">(<a href="#readme-top">back to top</a>)</p>

[GitHub-repo-link]: https://github.com/S1riyS/TutorHub-server

## 🛠️ Built With

* [![NodeJS][NodeJS-logo]][NodeJS-link]
* [![NestJS][NestJS-logo]][NestJS-link]
* [![Prisma][Prisma-logo]][Prisma-link]
* [![Postgres][Postgres-logo]][Postgres-link]
* [![Swagger][Swagger-logo]][Swagger-link]
* [![GitHub-Actions][GitHub-Actions-logo]][GitHub-Actions-link]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🗺️ Roadmap

- [ ] Major features:
    - [x] Authorization and authentication
    - [x] The logic of the division into students and teachers
    - [ ] Lessons pricing
    - [ ] Schedules both for tutors and students
    - [ ] Search filters
    - [ ] The system of issuing and submitting homework assignments
    - [ ] Email notifications (password confirmation, reminders, etc)
- [ ] Testing
- [ ] Deployment
- [x] Automatic generation of documentation via GitHub Actions ([result](https://s1riys.github.io/TutorHub-server/))

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💬 Contacts

**Ankudinov Kirill** - [kirill.ankudinov.94@mail.ru](mailto:kirill.ankudinov.94@mail.ru)

My social medias:

[![Vkontakte](https://img.shields.io/badge/-Vkontakte-090909?style=for-the-badge&logo=Vk&logoColor=4F7DB3)](https://vk.com/s1riys)
[![Discord](https://img.shields.io/badge/-Discord-090909?style=for-the-badge&logo=discord)](https://discordapp.com/users/380736129361772548/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


[//]: # (LINKS)

[NodeJS-logo]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white

[NodeJS-link]: https://nodejs.org/en/about

[NestJS-logo]: https://img.shields.io/badge/Nest.JS-e0234e?style=for-the-badge&logo=nestjs&logoColor=white

[NestJS-link]: https://docs.nestjs.com/

[Prisma-logo]: https://img.shields.io/badge/prisma-5a67d8?style=for-the-badge&logo=prisma&logoColor=white

[Prisma-link]: https://www.prisma.io/

[Postgres-logo]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white

[Postgres-link]: https://www.postgresql.org/about/

[Swagger-logo]: https://img.shields.io/badge/swagger-82e62d?style=for-the-badge&logo=swagger&logoColor=173647

[Swagger-link]: https://swagger.io/

[GitHub-Actions-link]: https://docs.github.com/en/actions

[GitHub-Actions-logo]: https://img.shields.io/badge/GitHub%20Actions-2f6ee6?style=for-the-badge&logo=githubactions&logoColor=white
