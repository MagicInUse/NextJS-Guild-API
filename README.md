# README.md

# Faded Legends Guild

Welcome to the Faded Legends Guild project! This application serves as a welcome page for our World of Warcraft guild, featuring a roster of guild members and links to their unique armory pages.

## Project Structure

The project is divided into two main parts: the client and the server.

### Client

The client is built using Next.js and contains the following key files:

- **src/app/layout.tsx**: Defines the layout component for the application.
- **src/app/page.tsx**: Main entry point rendering the welcome page.
- **src/app/roster/page.tsx**: Renders the roster page displaying guild members.
- **src/components/GuildRoster.tsx**: Displays the guild roster and fetches data from the server.
- **src/components/Header.tsx**: Renders the application header with navigation links.
- **src/components/PlayerCard.tsx**: Displays individual player information with links to their armory pages.
- **src/types/index.ts**: Exports TypeScript types and interfaces used throughout the client application.
- **.env**: Contains environment variables including battle.net ClientID and ClientSecret.
- **next.config.js**: Configuration settings for the Next.js application.
- **package.json**: Lists dependencies and scripts for the client application.
- **tsconfig.json**: TypeScript configuration file.

### Server

The server is built using Node.js and Express, with the following key files:

- **src/controllers/guildController.ts**: Exports functions to handle guild-related requests.
- **src/routes/api.ts**: Sets up API routes linking to the appropriate controller functions.
- **src/services/battlenetService.ts**: Contains functions to interact with the battlenet-api-wrapper for OAuth and API requests.
- **src/app.ts**: Entry point for the Express server, setting up middleware and routes.
- **.env**: Contains environment variables for the server, including battle.net ClientID and ClientSecret.
- **package.json**: Lists dependencies and scripts for the server application.
- **tsconfig.json**: TypeScript configuration file.

## Contributing

Feel free to contribute to the project by submitting issues or pull requests. Let's make Faded Legends the best it can be!