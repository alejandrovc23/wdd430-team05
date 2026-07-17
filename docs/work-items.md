# Handcrafted Haven Work Items

This initial backlog covers the semester project. Unless explicitly validated, the items describe planned work and do not indicate that future functionality is complete.

## 1. Initialize the Next.js project and shared application layout

### User Story

As a development team member, I want a consistent Next.js foundation and shared layout so that the team can build features within the same maintainable structure.

### Description

Configure the initial Next.js application, global styles, metadata, and shared page structure. Establish working development, lint, build, and production scripts while preserving the repository's planning documentation and creating a stable base for later feature branches.

### Acceptance Criteria

- [x] The repository contains a Next.js App Router application with a shared root layout and homepage.
- [x] The shared layout defines English-language metadata, global styling, and a semantic content structure.
- [x] The package scripts support development, linting, production builds, and production startup.
- [x] The application passes both the lint command and a production build without errors.

### Priority

High

### Initial Status

Done

### Suggested Labels

`setup`, `frontend`

## 2. Create the responsive global navigation

### User Story

As a visitor, I want clear navigation that adapts to my screen and input method so that I can move through the marketplace without confusion.

### Description

Build a reusable semantic header containing the Handcrafted Haven wordmark and primary destinations. The navigation must work at mobile, tablet, and desktop widths and support keyboard and assistive-technology users.

### Acceptance Criteria

- [ ] The header presents the wordmark and clearly labeled links to the agreed primary destinations.
- [ ] Navigation remains readable and free of horizontal overflow at small, medium, and large viewport widths.
- [ ] Every navigation control is keyboard operable and has a visible focus state.
- [ ] A skip-to-content link allows keyboard users to bypass the repeated header navigation.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`frontend`, `accessibility`, `navigation`

## 3. Build the product catalog page

### User Story

As a shopper, I want to browse a clear catalog of handmade products so that I can discover items that interest me.

### Description

Create the main catalog route and a reusable product-grid presentation. Each result should communicate the essential product details and lead to the corresponding product page while handling loading, empty, and populated states coherently.

### Acceptance Criteria

- [ ] The catalog displays product cards containing an image, name, category, artisan name, price, and rating when those values are available.
- [ ] Each product card provides a descriptive, keyboard-accessible link to that product's detail page.
- [ ] The product grid changes from one column on small screens to two and then three columns when space permits.
- [ ] A helpful empty state is displayed when the catalog query returns no products.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`catalog`, `frontend`

## 4. Add product category, price, and sorting controls

### User Story

As a shopper, I want to filter and sort products by useful criteria so that I can find relevant handmade goods efficiently.

### Description

Add catalog controls for category, price range, and sort order. The chosen controls should update the displayed results predictably, expose their state accessibly, and offer a simple way to return to the unfiltered catalog.

### Acceptance Criteria

- [ ] A labeled category control limits results to the selected category.
- [ ] Labeled minimum and maximum price controls limit results to products within the valid selected range.
- [ ] A labeled sorting control can order products by at least price and name in the directions defined by the interface.
- [ ] Users can clear all active controls, and the catalog then displays the complete result set.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`catalog`, `frontend`, `accessibility`

## 5. Build the product detail page

### User Story

As a customer, I want a detailed view of a handmade product so that I can understand its value and the artisan behind it before making a decision.

### Description

Create a dynamic product route that presents the selected product's imagery and complete marketplace information. Connect the product to its artisan story and provide appropriate handling when a requested product does not exist.

### Acceptance Criteria

- [ ] A valid product route displays the product name, description, price, category, images, rating information, and artisan identity.
- [ ] Product imagery has meaningful alternative text and remains responsive without distortion.
- [ ] The page includes a descriptive link to the associated artisan or seller profile.
- [ ] An invalid product identifier returns the application's intentional not-found experience instead of a broken page.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`catalog`, `frontend`

## 6. Implement user authentication

### User Story

As a registered user, I want to sign in and sign out securely so that I can access features associated with my account.

### Description

Implement the authentication foundation needed by protected seller and review features. The solution should provide understandable account forms, secure session handling, server-side authorization checks, and feedback that does not disclose sensitive account information.

### Acceptance Criteria

- [ ] A user can create an account and sign in with valid credentials through labeled, validated forms.
- [ ] Invalid credentials and invalid form values produce accessible error feedback without revealing whether a specific account exists.
- [ ] An authenticated user can sign out, after which protected routes no longer authorize that session.
- [ ] Passwords are hashed and secrets remain in ignored environment configuration rather than source control.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`authentication`, `backend`, `accessibility`

## 7. Create authenticated seller profiles

### User Story

As an artisan, I want an authenticated seller profile that shares my biography and craft story so that customers can connect with the person behind my products.

### Description

Create public seller-profile pages and an authenticated editing experience for profile owners. Profiles should establish artisan identity, tell the seller's story, and provide a clear path to that seller's available product collection.

### Acceptance Criteria

- [ ] A public seller profile displays the artisan's name, biography, story, profile image when supplied, and product collection.
- [ ] Only an authenticated profile owner can access and submit edits to their own seller information.
- [ ] Required values are validated on the server and understandable errors are returned for invalid submissions.
- [ ] The profile remains readable and usable on mobile, tablet, and desktop screens.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`seller`, `authentication`, `frontend`, `backend`

## 8. Build seller product management

### User Story

As a seller, I want to create, update, and remove my product listings so that my public collection remains accurate.

### Description

Build an authenticated product-management area for sellers. It should support the full listing lifecycle, validate product information consistently, enforce ownership on the server, and give sellers clear feedback after each operation.

### Acceptance Criteria

- [ ] An authenticated seller can create a listing with a name, description, price, category, and valid image information.
- [ ] A seller can edit only products they own, and approved changes appear in the public product experience.
- [ ] A seller can remove their own listing only after an explicit confirmation step.
- [ ] Unauthorized product create, update, and delete requests are rejected by server-side authorization.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`seller`, `catalog`, `backend`, `authentication`

## 9. Add product ratings and written reviews

### User Story

As a customer, I want to rate products and write reviews so that I can share useful feedback with other shoppers and artisans.

### Description

Add product feedback that combines a rating from one to five with a required written review. Present the aggregate rating and individual reviews accessibly while preventing unauthorized modification of another user's feedback.

### Acceptance Criteria

- [ ] An authenticated customer can submit a one-to-five rating and a required written review between 10 and 1,000 characters.
- [ ] The product page displays the calculated aggregate rating and a clearly identified list of persisted reviews.
- [ ] A review author can edit or remove their own review but cannot change another user's review.
- [ ] Rating controls, review forms, validation messages, and review content are accessible by keyboard and assistive technology.

### Priority

Medium

### Initial Status

Backlog

### Suggested Labels

`reviews`, `frontend`, `backend`, `accessibility`

## 10. Design the database schema and data-access layer

### User Story

As a development team member, I want a documented relational data model and consistent access layer so that application features can store and retrieve data reliably.

### Description

Design the persistent model for users, seller profiles, products, categories, ratings, and reviews, including ownership and relationship constraints. Introduce migrations and a centralized data-access approach that keeps database-specific logic out of presentation components.

### Acceptance Criteria

- [ ] The schema documents tables or models, field types, keys, required values, relationships, and deletion behavior for the agreed entities.
- [ ] Versioned migrations can create the schema in a clean development database without manual table changes.
- [ ] Data-access functions cover the initial required create, read, update, and delete operations without exposing credentials to client code.
- [ ] Automated checks verify representative queries, relationship constraints, and ownership-sensitive operations against a test environment.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`database`, `backend`

## 11. Perform accessibility, validation, performance, usability, and SEO review

### User Story

As a visitor with varied abilities, devices, and connection speeds, I want a robust and understandable experience so that I can use Handcrafted Haven effectively.

### Description

Audit the integrated application against its quality goals before release. Record reproducible findings, correct high-impact issues, and verify semantic markup, keyboard operation, responsive behavior, metadata, validation, and representative performance measurements.

### Acceptance Criteria

- [ ] A documented review covers WCAG 2.1 Level AA checks, complete keyboard use, focus visibility, alternative text, contrast, and heading structure.
- [ ] HTML and form validation findings are recorded, and all release-blocking errors introduced by the application are resolved.
- [ ] Representative mobile and desktop performance results are recorded with agreed remediation for material regressions.
- [ ] Core routes have unique titles and descriptions, usable navigation, responsive layouts, and no known horizontal overflow.

### Priority

High

### Initial Status

Backlog

### Suggested Labels

`accessibility`, `performance`, `seo`, `testing`

## 12. Deploy Handcrafted Haven to Vercel

### User Story

As a project stakeholder, I want a stable Vercel deployment so that the completed application can be reviewed through a public URL.

### Description

Configure the repository for a repeatable Vercel deployment after the application and its services are ready. Protect secrets, verify production configuration, and perform route-level smoke checks without treating the Week 02 demonstration as the final production release.

### Acceptance Criteria

- [ ] Vercel builds the designated release branch successfully using the repository's documented production build command.
- [ ] Required production environment values are configured in Vercel and no secret values are committed or exposed to the browser.
- [ ] The homepage, catalog, product detail, authentication, and seller routes pass documented production smoke checks.
- [ ] The repository documentation records the verified deployment URL and the team's deployment or rollback procedure.

### Priority

Medium

### Initial Status

Backlog

### Suggested Labels

`deployment`, `vercel`, `testing`
