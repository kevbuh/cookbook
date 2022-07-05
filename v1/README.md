# cookbook

Stack
Django
Postgres
React
NextJS
Tailwind CSS

START FRONTEND: npm run dev
START BACKEND: python3 manage.py runserver
also make sure to have postgres running

RENDERING: Static Generation without Data + Fetch Data on the Client-Side

- "This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching."
- The team behind Next.js has created a React hook for data fetching called SWR. They highly recommend it if you’re fetching data on the client side
- Photos in S3 with references in Postgres along with location, description, tags etc. Could easily enable collections of photos per post that way too.

BACKEND: Lots of help from "https://medium.com/django-rest/django-rest-framework-b3028b3f0b9"
