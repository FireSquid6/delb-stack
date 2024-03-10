# The DELB Stack

`D`rizzle [Site](https://orm.drizzle.team/)

`E`lysia [Site](https://elysiajs.com/)

`L`ucia [Site](https://lucia-auth.com/)

`B`un [Site](https://bun.sh/)

You may notice that this doesn't include a database. We use whatever SQL service fits our use case best. This could be:

- [Supabase](https://supabase.com/)
- [Neon](https://neon.tech/)
- [Turso](https://turso.tech/)
- Bun's SQLite API
- Self hosted:
  - Postgres
  - MySQL
  - SQLite

You may also notice that there is no frontend. This is because DELB believes that the frontend and backend should remain separate. Your frontend can be whatever you're most familiar with or whatever suits your needs best. This means that DELB can be used in:

- Web Apps
- Desktop Apps
- Mobile Apps
- Plain API services
- all of the above!

## Values

1. Frontend independence
2. Simplicity
3. Transparent abstraction
4. Cloud Agnosticism
5. Portability
6. Testability

## Deploying

Since we value cloud agnosticism, DELB is designed to be deployed anywhere. Some common options are:

- [fly.io](https://fly.io) with docker
- AWS/Google with docker
- Nix (my personal favorite)

# `create-delb-app`

Create delb app is still being worked on. We plan to have options for:

- Using a minimal or preconfigured example app
- choosing your database
- using docker or nix
- bootstrapping a frontend
