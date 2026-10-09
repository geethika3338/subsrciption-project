# Movie Streaming Platform

A web application prototype with a movie-streaming theme. The repository includes HTML pages for the home screen, login, and user dashboard, alongside a backend directory.

## Current UI

- Home page with registration and plan navigation
- Login page
- User dashboard
- Selected-plan display
- Trending-movie section
- Upgrade-plan and logout actions

The dashboard code references a local backend at `http://localhost:3000`. The backend must be running and configured for those requests to work.

## Technology

- HTML, CSS, and JavaScript
- Node.js / Express dependencies are listed in `package.json`
- MySQL-related dependencies are listed in `package.json`

Check the files in `backend/` for the exact routes, database schema, and startup command.

## Getting Started

1. Clone the repository.
2. Install Node.js if it is not already installed.
3. Inspect `package.json` and the `backend/` folder for the server entry point and available scripts.
4. Install dependencies in the directory containing the relevant `package.json`:

   ```bash
   npm install
   ```

5. Configure the database connection using local environment variables or the project's documented configuration. Do not commit passwords or API secrets.
6. Start the backend using the command defined by the project, then open the frontend page using a local web server.

## Important Notes

- This is a prototype; verify that registration, login, plan selection, and movie loading work end to end before describing them as completed features.
- Avoid storing sensitive account information in browser storage for a real authentication system.
- Do not commit `node_modules/`; use `.gitignore` and the lockfile to manage dependencies.

## Author

Geethika B. — [GitHub profile](https://github.com/geethika3338)
