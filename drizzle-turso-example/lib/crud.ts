import { eq } from "drizzle-orm";
import { db } from "../db";
import { users, posts } from "../db/schema";
import type {
  InsertUser,
  InsertPost,
  SelectUser,
  SelectPost,
} from "../db/schema";

export async function insertUser(data: InsertUser) {
  await db.insert(users).values(data);
}

export async function deleteUser(id: SelectUser["id"]): Promise<void> {
  await db.delete(users).where(eq(users.id, id));
}

export async function patchPost(
  id: SelectPost["id"],
  data: Partial<Omit<SelectPost, "id">>,
): Promise<SelectPost[]> {
  const updatedPost = await db
    .update(posts)
    .set(data)
    .where(eq(posts.id, id))
    .returning();

  return updatedPost;
}

export async function findUserWithId(
  id: SelectUser["id"],
): Promise<SelectUser> {
  const foundUsers = await db.select().from(users).where(eq(users.id, id));

  if (foundUsers.length === 0) {
    return Promise.reject(new Error("User not found"));
  }

  return foundUsers[0];
}

export async function findUserWithEmail(
  email: SelectUser["email"],
): Promise<SelectUser> {
  const foundUsers = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (foundUsers.length === 0) {
    return Promise.reject(new Error("User not found"));
  }

  return foundUsers[0];
}

export async function insertPost(data: InsertPost): Promise<void> {
  await db.insert(posts).values(data);
}

export async function getUserWithPosts(
  id: SelectUser["id"],
): Promise<Array<{ users: SelectUser; posts: SelectPost | null }>> {
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, id))
    .leftJoin(posts, eq(posts.userId, users.id));

  return user;
}
