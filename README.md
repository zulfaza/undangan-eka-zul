This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, setup the env variable

```env
# You can get this from firebase
GCP_CLIENT_CERT_URL=
GCP_CLIENT_EMAIL=
GCP_PRIVATE_KEY=
GCP_PRIVATE_KEY_ID=
GCP_PROJECT_ID=

# You can get this from url on google spreadsheet
# and make sure to make it public
GOOGLE_SHEET_ID=
GOOGLE_SHEET_RANGE=

#this is a base url for you web, we need specify this
#because if using env from vercel, it will be different
#for each build
NEXT_PUBLIC_BASE_URL=
```

then run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
