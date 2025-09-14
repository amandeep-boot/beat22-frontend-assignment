
# Beat22 Frontend Assignment

Live Demo: [beat22-frontend-assignment.vercel.app](https://beat22-frontend-assignment.vercel.app/)

This project is an Angular-based frontend clone of the Beat22 Beats page. It fetches trending beats from a public API and replicates the look and functionality of the original site, including filtering, music preview, and responsive design.

## Features
- Explore trending beats with grid and list views
- Music preview player for each beat card
- Filter beats by genre, mood, tempo, key, and more
- Search and sort functionality
- Responsive, modern UI using Angular Material and SCSS

## Tech Stack
- Angular (standalone components, signals)
- Angular Material
- TypeScript
- SCSS
- RxJS
- HTML5 Audio

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository:
	 ```sh
	 git clone https://github.com/amandeep-boot/beat22-frontend-assignment.git
	 cd beat22-frontend-assignment
	 ```
2. Install dependencies:
	 ```sh
	 npm install
	 ```

### Development Server
Start the Angular development server with proxy for API requests:
```sh
ng serve
```
The app will be available at `http://localhost:4200`.

### Proxy Configuration
API requests to `/api` are proxied to the Beat22 backend using `src/proxy.conf.json`. This bypasses CORS issues during local development.

## Project Structure
```
src/app/
	components/
		beat-list/
		beat-card/
		beats-page/
		filter-bar/
		header/
	models/
		beat.interface.ts
	services/
		beats.ts
	app.ts
	app.routes.ts
	app.config.ts
```

## Customization
- Update API endpoints in `beats.ts` if needed.
- Modify SCSS for custom theming.
- Extend filter-bar and beat-list for more advanced features.

## License
This project is for educational/demo purposes only.
