const db = process.env.DATABASE_URL;
const port = process.env.PORT ?? "3000";
console.log(Boolean(db), port);
