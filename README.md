# POS Padi Express Backend API

## Project Overview
 
The Pedmonie Express Backend API is a Django-based analytics service designed to provide insights into critical business areas, including:

- **Sales Performance Analytics**  
  - **Revenue Trends:** Track overall sales performance over time (e.g., daily, weekly, monthly, quarterly). Show revenue growth or decline trends to help vendors understand performance.  
  - **Sales by Product:** Display which renewable energy products (solar panels, wind turbines, batteries, etc.) are generating the most revenue.  
  - **Sales by Region/Location:** Identify which geographic areas or markets are generating the most sales, useful for targeting specific regions.  
  - **Sales by Time of Year:** Renewable energy products may have seasonal trends (e.g., increased sales in summer for solar products). Track sales spikes or dips during different times of the year.  

Live link: is at https://

Doc link: https://documenter.getpostman.com/view/36548151/2sAYBPmZm1

## Installation Instructions
### Prerequisites

Before setting up the project locally, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org) (>=20.14.0).
- A Database System (e.g., PostgreSQL, MySQL, SQLite)

### How to run API Locally

1. Clone the repository:
```bash
git clone https://github.com/InternPulse/pos-padi-express-backend.git
```

2. Change into the parent directory:
```bash
cd pos-padi-express-backend
```

3. Set appropriate values for the following Compulsory Environment Variables:
```txt
# Postgres connection string
DATABASE_URL=""
# Secret key for signing JWTs
JWTKEY=""
# API Port
PORT=5000
```

4. Migrate Your Database:
``` bash
npx prisma migrate dev --name init
```

5. Install the App dependencies:
``` bash
npm install
```

6. Start the App:
```bash
npm run dev
```

The API should now be running locally at [http://localhost:5000/](http://localhost:5000/).


# Commit Standards

## Branches

- **dev** -> pr this branch for everything `backend` related
- **main** -> **dont touch** this branch, this is what is running in production!

## Contributions

pedmonie-express-backend is open to contributions, but I recommend creating an issue or replying in a comment to let us know what you are working on first that way we don't overwrite each other.

## Contribution Guidelines

1. Clone the repo `git clone https://github.com/InternPulse/pos-padi-express-backend.git`.
2. Open your terminal & set the origin branch: `git remote add origin https://github.com/InternPulse/pos-padi-express-backend.git`
3. Pull origin `git pull origin dev`
4. Create a new branch for the task you were assigned to, eg `TicketNumber/(Feat/Bug/Fix/Chore)/Ticket-title` : `git checkout -b BA-001/Feat/Sign-Up-from`
5. After making changes, do `git add .`
6. Commit your changes with a descriptive commit message : `git commit -m "your commit message"`.
7. To make sure there are no conflicts, run `git pull origin dev`.
8. Push changes to your new branch, run `git push -u origin feat-csv-parser`.
9. Create a pull request to the `dev` branch not `main`.
10. Ensure to describe your pull request.
11. > If you've added code that should be tested, add some test examples.


# Merging
Under any circumstances should you merge a pull request on a specific branch to the `dev` or `main` branch

### _Commit CheatSheet_

| Type     |                          | Description                                                                                                 |
| -------- | ------------------------ | ----------------------------------------------------------------------------------------------------------- |
| feat     | Features                 | A new feature                                                                                               |
| fix      | Bug Fixes                | A bug fix                                                                                                   |
| docs     | Documentation            | Documentation only changes                                                                                  |
| style    | Styles                   | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)      |
| refactor | Code Refactoring         | A code change that neither fixes a bug nor adds a feature                                                   |
| perf     | Performance Improvements | A code change that improves performance                                                                     |
| test     | Tests                    | Adding missing tests or correcting existing tests                                                           |
| build    | Builds                   | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)         |
| ci       | Continuous Integrations  | Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) |
| chore    | Chores                   | Other changes that don't modify, backend or test files                                                    |
| revert   | Reverts                  | Reverts a previous commit                                                                                   |

> _Sample Commit Messages_

- `chore: Updated README file`:= `chore` is used because the commit didn't make any changes to the backend or test folders in any way.
- `feat: Added plugin info endpoints`:= `feat` is used here because the feature was non-existent before the commit.
