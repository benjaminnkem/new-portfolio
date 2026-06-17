# 9Ja Wrapped 2023 🚀

## Technologies/Packages/Libraries

1.  Next.js (Chore Framework)
2.  Mongoose (MongoDB ORM)
3.  Zustand (State Manager)
4.  Tailwind CSS + SASS/SCSS (Styling)
5.  React Hot Toast (Notifications)
6.  Framer Motion & GSAP (Animation Libraries)

## Installation

Follow this installation process to run the app locally.

### Clone The Repository

```bash
git clone https://github.com/Engrtunze/9jawrapper
```

### Navigate to the Project Directory

```bash
cd 9ja-wrapped
```

### Install Dependencies

```bash
npm install
```

### Add Necessary Environment Variables

Create a `.env.local` file in the root of your project and add any necessary environment variables.

```bash
MONGO_URI=mongodb-connection-string
BASE_URL=deployment-url or http://localhost:3000 (local)
NEXT_PUBLIC_BASE_URL=deployment-url or http://localhost:3000 (local)
```

`Don't forget` to add the environment variables when deployment to a server.

#### How to get MongoDB Connection String

- Create a MongoDB Atlas Account.
- You'll be prompted to complete the necessary authentication steps.
- Create a project and database `naijawrap` or any database name of your choice.
- The required collection will be created automatically by mongoose.
- Copy the connection string e.g `mongodb+srv://<username>:<password>@test.y239zfo.mongodb.net/<database_name>`

### Run the Development Server

```bash
yarn dev
# or
npm run dev
```

### Build for Production

```bash
yarn build
# or
npm run build
```

### Run in Production Mode

```bash
yarn start
# or
npm run start
```

And voila it's live! 🎉
