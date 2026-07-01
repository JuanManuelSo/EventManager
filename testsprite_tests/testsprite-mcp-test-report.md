# TestSprite AI Testing Report (MCP)

---

## 1️⃣ Document Metadata

- **Project Name:** EventManager
- **Date:** 2026-07-01
- **Prepared by:** TestSprite AI Team
- **Execution Target:** `http://localhost:4000`
- **Server Mode:** Production Docker Compose stack
- **Credentials Used:** `admin@eventmanager.com` / `admin1234`
- **Raw Report:** [`testsprite_tests/tmp/raw_report.md`](./tmp/raw_report.md)
- **Test Plan:** [`testsprite_tests/testsprite_frontend_test_plan.json`](./testsprite_frontend_test_plan.json)

---

## 2️⃣ Requirement Validation Summary

### Requirement: Authentication And Protected Access

#### Test TC001 Sign in and reach the dashboard
- **Test Code:** [TC001_Sign_in_and_reach_the_dashboard.py](./TC001_Sign_in_and_reach_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/0a946623-722c-46c7-b679-a252346ea2aa
- **Status:** ✅ Passed
- **Analysis / Findings:** Valid admin credentials successfully authenticate and route the user to the dashboard.

#### Test TC003 Sign in and open the dashboard
- **Test Code:** [TC003_Sign_in_and_open_the_dashboard.py](./TC003_Sign_in_and_open_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/e1275971-9c11-45f2-95c9-d355c4b24eb0
- **Status:** ✅ Passed
- **Analysis / Findings:** Authenticated dashboard access is working for the seeded administrator account.

#### Test TC029 Show validation for missing login fields
- **Test Code:** [TC029_Show_validation_for_missing_login_fields.py](./TC029_Show_validation_for_missing_login_fields.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/a32ea309-acb8-485e-9c56-abd1db459191
- **Status:** ✅ Passed
- **Analysis / Findings:** Empty login credentials are blocked with user-facing validation messages.

#### Test TC030 Show an authentication error for invalid login
- **Test Code:** [TC030_Show_an_authentication_error_for_invalid_login.py](./TC030_Show_an_authentication_error_for_invalid_login.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/e665dbea-2bc3-4cd6-aa5c-49c1485f5a1a
- **Status:** ✅ Passed
- **Analysis / Findings:** Invalid credentials show an authentication error and do not grant dashboard access.

### Requirement: Dashboard Browsing, Search, Filters, And Event Navigation

#### Test TC006 Open an event from the dashboard
- **Test Code:** [TC006_Open_an_event_from_the_dashboard.py](./TC006_Open_an_event_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/36602f0f-9760-452a-988f-307367a0a7a8
- **Status:** ✅ Passed
- **Analysis / Findings:** A user can open an event from the dashboard and reach the event detail route.

#### Test TC009 Find an event using search and status filters
- **Test Code:** [TC009_Find_an_event_using_search_and_status_filters.py](./TC009_Find_an_event_using_search_and_status_filters.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/bd6fe0d6-f530-4ba4-a506-ee0e026e8052
- **Status:** ✅ Passed
- **Analysis / Findings:** Search and status filtering can narrow the event list before opening an event.

#### Test TC010 Browse and search events from the dashboard
- **Test Code:** [TC010_Browse_and_search_events_from_the_dashboard.py](./TC010_Browse_and_search_events_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/f1e8b675-3bda-44e4-a7d3-85cc0f6b52cd
- **Status:** ❌ Failed
- **Analysis / Findings:** Opening `/events/1` displayed `Evento no encontrado` instead of event metadata. This suggests the test selected or assumed an event ID that was unavailable after prior test mutations, or the UI can route to stale event IDs without a reliable existence check.

#### Test TC017 Update the dashboard list when changing filters and search
- **Test Code:** [TC017_Update_the_dashboard_list_when_changing_filters_and_search.py](./TC017_Update_the_dashboard_list_when_changing_filters_and_search.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/eadbef6e-eb88-4f95-8746-cedfe549fa3d
- **Status:** ✅ Passed
- **Analysis / Findings:** The visible dashboard list updates correctly when search text and status filters change.

### Requirement: Event Creation, Editing, Finalization, And Deletion

#### Test TC013 Create a new event from the dashboard
- **Test Code:** [TC013_Create_a_new_event_from_the_dashboard.py](./TC013_Create_a_new_event_from_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/dda2aed5-027d-4237-8bb4-ab8ec0acd5dc
- **Status:** ✅ Passed
- **Analysis / Findings:** Creating a new event from the dashboard succeeds and the event appears in the list.

#### Test TC015 Update event information
- **Test Code:** [TC015_Update_event_information.py](./TC015_Update_event_information.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/84f159b4-f08b-4ec3-876e-ff7d2eb962aa
- **Status:** ❌ Failed
- **Analysis / Findings:** Editing event information failed because the `Invitados` field raised `Debe ser un número`; the form stayed in edit mode and the header kept the old guest count. The event edit form likely passes a string value where the validation schema expects a number.

#### Test TC018 Delete an event and return to the dashboard
- **Test Code:** [TC018_Delete_an_event_and_return_to_the_dashboard.py](./TC018_Delete_an_event_and_return_to_the_dashboard.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/4c6447d9-c0e9-46c7-91f8-02b85c7f9a4b
- **Status:** ✅ Passed
- **Analysis / Findings:** Event deletion works through the confirmation modal and returns the user to the dashboard.

#### Test TC022 Finalize an active event
- **Test Code:** [TC022_Finalize_an_active_event.py](./TC022_Finalize_an_active_event.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/4d3af07b-3758-4e1d-89d7-c96e30784f84
- **Status:** ✅ Passed
- **Analysis / Findings:** Active events can be finalized through the UI and backend flow.

#### Test TC028 Show validation while creating an event
- **Test Code:** [TC028_Show_validation_while_creating_an_event.py](./TC028_Show_validation_while_creating_an_event.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/bebd6756-b4c3-4632-8d7c-c8f531c9c05a
- **Status:** ✅ Passed
- **Analysis / Findings:** The event creation modal blocks invalid submissions and shows validation feedback.

### Requirement: Guest Management And QR Generation

#### Test TC008 Add a guest manually
- **Test Code:** [TC008_Add_a_guest_manually.py](./TC008_Add_a_guest_manually.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/0376fa41-c886-47c0-b2e6-49df5e5ba054
- **Status:** ✅ Passed
- **Analysis / Findings:** Manual guest creation works and the guest appears in the event guest table.

#### Test TC011 Import guests from a valid spreadsheet
- **Test Code:** [TC011_Import_guests_from_a_valid_spreadsheet.py](./TC011_Import_guests_from_a_valid_spreadsheet.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/f67a7b31-43c6-471b-a5a7-47bfa7ed5b0e
- **Status:** ✅ Passed
- **Analysis / Findings:** Valid spreadsheet import creates guests and displays them in the table.

#### Test TC014 Generate guest QR codes in bulk
- **Test Code:** [TC014_Generate_guest_QR_codes_in_bulk.py](./TC014_Generate_guest_QR_codes_in_bulk.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/b0135c3b-87a4-402e-8c02-4448c5418792
- **Status:** ✅ Passed
- **Analysis / Findings:** Bulk QR generation starts and completes sufficiently for the UI test to validate the workflow.

#### Test TC020 Delete a guest from the list
- **Test Code:** [TC020_Delete_a_guest_from_the_list.py](./TC020_Delete_a_guest_from_the_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/b8e00140-439c-47d5-af5e-07ea8054c7de
- **Status:** ❌ Failed
- **Analysis / Findings:** After confirming guest deletion, the guest row `Acosta, Rocío` remained visible in the guest table. The delete request may not complete successfully, the query cache may not be invalidated/refetched, or the UI may not remove the row after success.

#### Test TC023 Search and filter the guest list
- **Test Code:** [TC023_Search_and_filter_the_guest_list.py](./TC023_Search_and_filter_the_guest_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/0b5716d5-8142-408d-920d-0a0cf5b24b5e
- **Status:** ✅ Passed
- **Analysis / Findings:** Guest search and status filters update the guest table as expected.

### Requirement: Check-In Operations

#### Test TC002 Check in a guest by scanning a QR code
- **Test Code:** [TC002_Check_in_a_guest_by_scanning_a_QR_code.py](./TC002_Check_in_a_guest_by_scanning_a_QR_code.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/8dc0673b-36a9-4e57-bc51-0d78bd8e05d5
- **Status:** ✅ Passed
- **Analysis / Findings:** QR check-in flow marks a guest present and updates recent check-in feedback.

#### Test TC004 Check in a guest manually from search
- **Test Code:** [TC004_Check_in_a_guest_manually_from_search.py](./TC004_Check_in_a_guest_manually_from_search.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/53e8c804-00c9-4b08-830f-bc00c51f6a47
- **Status:** ✅ Passed
- **Analysis / Findings:** Manual search-based check-in succeeds and updates attendance UI state.

#### Test TC025 Prevent a duplicate check-in
- **Test Code:** [TC025_Prevent_a_duplicate_check_in.py](./TC025_Prevent_a_duplicate_check_in.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/29be77a9-7c16-4fea-b384-ea6e8a8bc3cd
- **Status:** ✅ Passed
- **Analysis / Findings:** Duplicate check-ins are detected and handled without creating a second attendance entry.

### Requirement: Media Management And QR Card Artwork

#### Test TC012 Upload a supported video to an event media list
- **Test Code:** [TC012_Upload_a_supported_video_to_an_event_media_list.py](./TC012_Upload_a_supported_video_to_an_event_media_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/80502728-b7bf-4dc9-94a5-de4b6cf62ad0
- **Status:** BLOCKED
- **Analysis / Findings:** The UI exposed a video file input, but TestSprite did not have an available video fixture path. This is an environment/test-data gap, not a confirmed product failure.

#### Test TC016 Assign a welcome video to a guest
- **Test Code:** [TC016_Assign_a_welcome_video_to_a_guest.py](./TC016_Assign_a_welcome_video_to_a_guest.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/e789441b-1992-4023-a59d-186880338b2b
- **Status:** BLOCKED
- **Analysis / Findings:** No uploaded videos were available, so the assignment dropdown only showed its placeholder and the save action remained disabled.

#### Test TC019 Assign media to guests in bulk
- **Test Code:** [TC019_Assign_media_to_guests_in_bulk.py](./TC019_Assign_media_to_guests_in_bulk.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/2df1216f-d2d5-4e87-a763-e4be246f2606
- **Status:** BLOCKED
- **Analysis / Findings:** Bulk assignment could not proceed because no video file was available to upload, leaving the media list empty and the bulk assignment control disabled.

#### Test TC024 Delete an event video from the media list
- **Test Code:** [TC024_Delete_an_event_video_from_the_media_list.py](./TC024_Delete_an_event_video_from_the_media_list.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/991a9f21-5510-4fa1-8e1d-bc21b016e70f
- **Status:** BLOCKED
- **Analysis / Findings:** Video deletion could not be verified because the prerequisite video upload was blocked by missing fixture files.

#### Test TC026 Preview an uploaded event video
- **Test Code:** [TC026_Preview_an_uploaded_event_video.py](./TC026_Preview_an_uploaded_event_video.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/1b794663-7bcd-4efa-beb6-c88a5900ace3
- **Status:** BLOCKED
- **Analysis / Findings:** Video preview could not be verified because no video existed and the runner had no sample video fixture to upload.

#### Test TC027 Upload QR card artwork and save slot coordinates
- **Test Code:** [TC027_Upload_QR_card_artwork_and_save_slot_coordinates.py](./TC027_Upload_QR_card_artwork_and_save_slot_coordinates.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/b7579e69-2a6c-41e3-9e8d-9e1f7b0b8d0a
- **Status:** ❌ Failed
- **Analysis / Findings:** The QR card upload area did not expose or trigger a usable file input. TestSprite found the slot coordinate inputs but could not upload the available `qr_card.pdf` fixture.

### Requirement: Public Display Screen And Real-Time Playback UX

#### Test TC005 Keep playing check-in video on the public display
- **Test Code:** [TC005_Keep_playing_check_in_video_on_the_public_display.py](./TC005_Keep_playing_check_in_video_on_the_public_display.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/e0c68da5-aa0d-4134-bf02-46e000b1fb72
- **Status:** ✅ Passed
- **Analysis / Findings:** The display screen remains available and handles playback-related UI behavior during check-in scenarios.

#### Test TC007 Open the public display for an event
- **Test Code:** [TC007_Open_the_public_display_for_an_event.py](./TC007_Open_the_public_display_for_an_event.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/b04e877e-324b-469d-83c9-42afde74d71d
- **Status:** ✅ Passed
- **Analysis / Findings:** The public display route loads without authentication and shows the idle waiting state.

#### Test TC021 Show recent guests on the public display
- **Test Code:** [TC021_Show_recent_guests_on_the_public_display.py](./TC021_Show_recent_guests_on_the_public_display.py)
- **Test Visualization and Result:** https://www.testsprite.com/dashboard/mcp/tests/5a349d07-bcfd-4072-a93e-c55d8c968a6a/0b56ab73-7bff-414c-8f7b-5c30d4810c53
- **Status:** ✅ Passed
- **Analysis / Findings:** Recently checked-in guests are shown on the public display as expected.

---

## 3️⃣ Coverage & Matching Metrics

- **Total Tests:** 30
- **Passed:** 21
- **Failed:** 4
- **Blocked:** 5
- **Pass Rate:** 70.00%

| Requirement | Total Tests | ✅ Passed | ❌ Failed | BLOCKED |
|-------------|-------------|-----------|-----------|---------|
| Authentication And Protected Access | 4 | 4 | 0 | 0 |
| Dashboard Browsing, Search, Filters, And Event Navigation | 4 | 3 | 1 | 0 |
| Event Creation, Editing, Finalization, And Deletion | 5 | 4 | 1 | 0 |
| Guest Management And QR Generation | 5 | 4 | 1 | 0 |
| Check-In Operations | 3 | 3 | 0 | 0 |
| Media Management And QR Card Artwork | 6 | 0 | 1 | 5 |
| Public Display Screen And Real-Time Playback UX | 3 | 3 | 0 | 0 |

---

## 4️⃣ Key Gaps / Risks

- Event detail navigation can show `Evento no encontrado` for `/events/1`, which may indicate stale IDs in the dashboard flow or insufficient test-data isolation.
- Event editing has a validation problem on `cant_invitados`; the UI input value is not being accepted as a number during save.
- Guest deletion did not remove the row from the UI after confirmation; investigate the delete API result and React Query cache invalidation path.
- QR card artwork upload appears inaccessible to automated and likely keyboard-driven users because no usable file input was exposed or triggered.
- Media upload and video-dependent workflows need deterministic test fixtures, such as a small committed/sample MP4 made available to TestSprite.
- Tests mutate shared database state across cases, so future runs should either reset seed data per run or have each test create and use isolated event/guest records.
- The production frontend build emitted non-fatal warnings for unresolved Manrope font asset references and large chunks; these did not block tests but should be reviewed separately.

---
