# Beat22 Beats Clone (Angular) - README
## Project Overview
This project is an Angular frontend clone of the Beat22 "Beats" page. It fetches trending beats from a public API and displays them with features such as search, filters, list/grid toggle views, audio preview, pricing, and tagging. The goal is to replicate the look and functionality of Beat22’s Beats page using modern Angular best practices while ensuring responsiveness and smooth user experience.
---
## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [API Interaction](#api-interaction)
- [Filtering and Searching](#filtering-and-searching)
- [View Toggle (List/Grid)](#view-toggle-listgrid)
- [Audio Preview & Pricing](#audio-preview--pricing)
- [Styling & UI Design](#styling--ui-design)
- [Future Enhancements](#future-enhancements)
- [Contact](#contact)
---
## Features
- Fetch and display trending beats from the provided API
- Search beats by title, artist, and tags
- Multiple filters: Beat Types, Moods, Tempo, Genre, Keys, Instruments, and Price
- Toggle between list view and grid view layouts
- Play audio previews for each beat
- Display pricing information and tags per beat
- Responsive design with dark theme and purple accent
- Smooth and intuitive user interface closely matching Beat22's original site
---
## Technologies Used
- Angular latest
- TypeScript
- Angular Material (optional, for dropdowns and UI controls)
- RxJS for async data handling
- SCSS for styling and theming
- HTML5 Audio element for audio previews
---
## Getting Started
### Prerequisites
- Node.js (v16+ recommended)
- Angular CLI
- npm or yarn
### Installation Steps


Open `http://localhost:4200` to view the app in your browser.

---

## Project Structure

src/
app/
components/
header/ # Top navbar with logo, search, Sign In
filter-bar/ # Search box, filter dropdowns, filter buttons
beat-list/ # Container for beat cards + toggle view logic
beat-card/ # Reusable component showing beat info & preview
services/
beats.service.ts # API interaction to fetch beats data
models/
beat.model.ts # TypeScript interfaces for beat data


---

## API Interaction

- Use Angular’s HttpClient in `BeatsService` to GET the endpoint:  
  `https://api-server.illpeoplemusic.com/api/v2/playlist/trending`
- Extract the `beats` array from the first playlist object.
- Return `Observable<Beat[]>` data to subscribing components.
- Store full beats list in `BeatListComponent` and provide filtered subsets based on user selections.

---

## Filtering and Searching

- Filters available: Beat Types, Moods, Tempo, Genre, Keys, Instruments, Price
- Search input filters beats by title, producer, or tags (case-insensitive)
- Use Angular Reactive Forms to track filter and search inputs.
- Filter the beats array reactively based on filter criteria and search query.
- Debounce search input to improve performance.

---

## View Toggle (List/Grid)

- Maintain a boolean flag (e.g., `isGridView`) in `BeatListComponent`.
- List view shows structured rows with detailed info per beat.
- Grid view shows beats as cards with cover images and minimal info.
- Toggle buttons in UI switch this flag; use Angular `@if` for conditional view rendering.
- Apply CSS Grid for cards, Flexbox for list layout.

---

## Audio Preview & Pricing

- Use the HTML5 `<audio>` element to allow users to play beat previews.
- Bind beat’s preview URL to audio `src`.
- Display pricing on each beat card or list row.
- Style price buttons with purple accent matching Beat22’s theme.

---

## Styling & UI Design

- Follow Beat22’s dark theme: #121212 background, purple accent for highlights (#7A5FFF or #9B59FF)
- Use SCSS scoped to Angular components.
- Responsive layouts using CSS Grid and Flexbox.
- Add hover/focus states for accessibility and UX polish.
- Ensure seamless integration of filters, search, audio controls, and toggle buttons.

---

## Future Enhancements

- Add pagination or infinite scroll for extensive beat lists.
- Implement advanced sorting options.
- Add user authentication for personalized features.
- Enhance audio player controls (e.g., progress bar, volume).
- Enable downloading or direct purchase flows.

---

## Contact

For questions or feedback, please reach out via email or create an issue in this repository.

---

Thank you for reviewing this project README!  
This clone is built with best Angular practices focusing on modularity, maintainability, and real-world UI requirements.
