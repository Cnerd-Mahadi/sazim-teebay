# To run server locally

1. Run your docker and install postgres with a database, replace your db name in index.db.ts file
2. Install all the necessery dependencies using npm
3. Migrate the prisma schema in your db "npx prisma migrate dev", run the seed "npx prisma db seed"
4. Start the server dev mode with "npm run dev"
