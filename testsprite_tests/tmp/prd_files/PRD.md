# Product Requirements Document: Event Manager

## 1. Product Overview

Event Manager is a web application for planning, managing, and operating event access. It helps event organizers create events, manage guest lists, generate QR invitations, scan guests at the door, and trigger personalized media experiences during check-in.

The application is built as a React/Vite frontend, an Express/TypeScript backend, and a PostgreSQL database managed through Prisma. It also uses Socket.IO for real-time QR generation progress and display-screen video playback events.

## 2. Target Users

- Event administrators who create and manage events.
- Event staff who handle check-in during the event.
- Display operators who run the public display screen for welcome videos.

## 3. Core Goals

- Centralize event setup and guest management.
- Speed up guest entry through QR scanning and manual fallback check-in.
- Track attendance and event status accurately.
- Support media assignment so guest check-ins can trigger relevant videos.
- Provide a stable authenticated dashboard for event operations.

## 4. Main Features

### Authentication

- Login page for administrators.
- Protected dashboard and event-management routes.
- JWT-authenticated API routes for event, guest, check-in, and media operations.
- Seeded test/admin account: `admin@eventmanager.com` / `admin1234`.

### Dashboard

- Shows summary metrics for total events, managed guests, and average attendance.
- Lists events created by the authenticated user.
- Supports event search by name, location, type, or venue.
- Supports filters for all, active, and finalized events.
- Supports grid/list display toggling.
- Allows creating new events.

### Event Management

- Event detail page with event header, cover image area, metadata, guest count, and status actions.
- Editable event fields: name, type, date/time, venue, location, and expected guest count.
- Event finalization flow that marks remaining pending guests as absent.
- Event deletion flow with confirmation.
- Event tabs for information, guests, QR scanning, media, and metrics.

### Guest Management

- Guest table with search, status filters, pagination, row selection, and row actions.
- Manual guest creation.
- Excel guest import.
- Guest deletion with confirmation.
- Individual QR generation and download.
- Bulk QR generation with real-time progress updates through Socket.IO.
- ZIP download for generated QR assets.
- Guest fields include document, first name, last name, email, phone, table, companion count, status, QR hash, check-in time, photo/video metadata, and invitation state.

### Check-In

- QR camera scanning for guest entry.
- Manual guest search and check-in fallback.
- Live check-in stats: total guests, present guests, absent/pending count, and attendance percentage.
- Recent check-ins panel.
- Feedback states for successful, duplicate, and failed scans.
- Duplicate scan handling for guests already checked in.

### Media Management

- Event video upload with accepted formats such as MP4, WebM, OGG, MOV, AVI, and MKV.
- Video list with metadata, preview, playback link, and delete action.
- Bulk video assignment to guests.
- Individual guest video assignment.
- QR card/invitation base image upload.
- QR slot positioning for generated invitation cards.

### Public Display Screen

- Public route at `/display/:id` for a screen used during the event.
- Connects through Socket.IO to receive video playback events.
- Shows idle state while waiting for guest check-ins.
- Plays assigned guest videos when a check-in event emits a display playback message.
- Shows guest welcome overlay and recently checked-in guests.
- Includes connection status and audio toggle.

## 5. Backend API Areas

- `/api/users`: user creation, listing, lookup, and login.
- `/api/events`: authenticated event creation, listing, detail, update, deletion, summary stats, and finalization.
- `/api/events/:eventId/guests`: authenticated guest listing, creation, bulk import, check-in, QR generation, invitation sending, video assignment, update, and deletion.
- `/api/checkin/:eventId`: authenticated QR scan and manual check-in endpoints.
- `/api/events/:eventId/media`: authenticated media listing, upload, deletion, QR card upload, QR card lookup, and QR slot update.

## 6. Data Model Summary

- User: administrator account with email, password hash, name, and owned events.
- Event: event metadata, status, attendance counters, QR job fields, invitation template data, and owner relation.
- Guest: attendee identity, contact info, status, companions, table, QR data, check-in data, and assigned media.
- EventMedia: uploaded event videos with Cloudinary/local URLs, media type, table targeting, format, and duration.

## 7. What TestSprite Should Test

### Frontend End-to-End Tests

- Login succeeds with the seeded admin account.
- Login validation blocks empty credentials and empty password.
- Invalid login shows an error and does not enter the dashboard.
- Authenticated users can access the dashboard.
- Unauthenticated users are redirected away from protected routes.
- Dashboard stats load without breaking the page.
- Events can be searched and filtered by status.
- Event creation form validates required fields and creates a new event.
- Event detail page loads after selecting an event.
- Event information can be edited and saved.
- Event finalization opens confirmation, completes, and updates status.
- Event deletion opens confirmation and removes the event.
- Guest tab loads the guest table, empty states, search, filters, and pagination.
- Manual guest creation validates required fields and adds a guest.
- Excel import modal opens and handles valid/invalid upload flows.
- Guest row actions open QR generation, video assignment, and delete modals.
- Bulk QR generation starts and displays progress state.
- Individual QR generation triggers a file download response.
- Check-in tab loads camera area, manual search, stats, and recent check-in panel.
- Manual check-in changes a guest from pending to present.
- Duplicate manual/QR check-in displays duplicate feedback instead of creating a second entry.
- QR scan flow submits a QR hash and handles success, duplicate, and invalid QR responses.
- Media tab uploads a supported video and rejects unsupported formats or oversized files.
- Media deletion removes a video after confirmation.
- Bulk video assignment applies selected media to matching guests.
- QR card upload accepts supported image/PDF formats and rejects unsupported files.
- QR card slot positioning can be saved.
- Public display route `/display/:id` loads without authentication.
- Display screen shows connected/disconnected states and idle state.
- Display screen plays the assigned video when a check-in event is emitted.
- Core pages render correctly on desktop and mobile viewport sizes.

### Backend API Tests

- User login returns a token for valid credentials.
- User login rejects invalid credentials.
- Protected endpoints reject missing or invalid tokens.
- Event create/list/detail/update/finalize/delete endpoints enforce authentication and expected validation.
- Dashboard summary endpoint returns consistent totals.
- Guest create and bulk create validate payloads and prevent duplicate guest emails per event.
- Guest update and delete work only for the target event.
- QR bulk generation starts a job and exposes downloadable output after completion.
- Single guest QR endpoint returns an image response.
- QR scan endpoint marks a guest present, sets check-in time, updates event attendance counters, and handles duplicate scans.
- Manual check-in endpoint handles valid, duplicate, and invalid guest IDs.
- Finalizing an event marks pending guests as absent and prevents incorrect active-event assumptions.
- Media upload accepts allowed video MIME types and rejects unsupported types.
- Media delete removes the media record and handles missing media IDs safely.
- QR card upload and QR slot update persist invitation-template metadata.
- API error responses use predictable status codes and messages.

### Real-Time Tests

- QR generation emits progress updates and final done/error states.
- QR ZIP download is triggered when generation completes.
- Display clients can join an event room.
- Check-in with assigned video emits a display playback event to the correct event room.
- Display clients from other events do not receive unrelated playback events.

### Regression And Edge-Case Tests

- Empty event list renders a useful empty state.
- Empty guest list disables QR generation and shows a clear message.
- Guest search returns an empty state when no match exists.
- Pagination remains stable after deleting or filtering guests.
- Finalized events cannot be incorrectly treated as active.
- Check-in stats remain correct after refresh.
- File upload errors do not leave the UI stuck in loading state.
- Network/API failures show user-facing error feedback.

## 8. Recommended TestSprite Setup

- Run the stack with Docker Compose so frontend, backend, and PostgreSQL are available together.
- Frontend URL: `http://localhost:4000` when using Docker Compose.
- Backend API URL: `http://localhost:3000/api` when using Docker Compose.
- Use the seeded login account: `admin@eventmanager.com` / `admin1234`.
- Prioritize authenticated frontend E2E tests first, then backend API tests, then Socket.IO/display workflows.

## 9. Out Of Scope For Initial Test Pass

- Payment processing, because no payment flow is present.
- Public self-registration, because guest management is administrator-driven.
- Email delivery verification beyond confirming the invitation endpoint behavior.
- Deep Cloudinary media-processing verification beyond upload/delete/API response behavior.
