# cookbook

Stack
Django
Postgres
React
NextJS
Tailwind CSS

START SERVER: npm run dev

RENDERING: Static Generation without Data + Fetch Data on the Client-Side

- "This approach works well for user dashboard pages, for example. Because a dashboard is a private, user-specific page, SEO is not relevant, and the page doesn’t need to be pre-rendered. The data is frequently updated, which requires request-time data fetching."
- The team behind Next.js has created a React hook for data fetching called SWR. They highly recommend it if you’re fetching data on the client side
