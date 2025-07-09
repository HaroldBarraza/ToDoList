import sql from "@/app/lib/database";
import type { Note } from "@/app/lib/types";

export async function getNotes(): Promise<Note[]> {
  const res = await sql`
    SELECT tasks.id, tasks.title, tasks.text, tasks.state, tasks.category_id, categories.name as category_name
    FROM tasks
    LEFT JOIN categories ON tasks.category_id = categories.id
    ORDER BY tasks.id DESC
  `;
  return res as unknown as Note[];
}
