import sql from "@/app/lib/database";
import type { Note } from "@/app/lib/types";

export async function getNotes(): Promise<Note[]> {
  const res = await sql`SELECT id, title, text, state FROM tasks ORDER BY id DESC`;
  return res as unknown as Note[];
}
