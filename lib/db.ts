import postgres from "postgres";

export async function getSql() {
  const sql = postgres(process.env.DATABASE_URL ?? "", { ssl: "require" });

  return sql;
}
