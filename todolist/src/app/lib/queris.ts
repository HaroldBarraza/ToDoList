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
export async function getNotesGroupedByCategory() {
  const res = await sql`
    SELECT 
      categories.id AS category_id,
      categories.name AS category_name,
      tasks.id, tasks.title, tasks.text, tasks.state
    FROM tasks
    JOIN categories ON tasks.category_id = categories.id
    ORDER BY categories.name, tasks.id DESC
  `;

  // Agrupar resultados por categoría
  const grouped: { [key: string]: Note[] } = {};

  for (const row of res) {
    const note: Note = {
      id: row.id,
      title: row.title,
      text: row.text,
      state: row.state,
      category_id: row.category_id,
    };

    if (!grouped[row.category_name]) {
      grouped[row.category_name] = [];
    }

    grouped[row.category_name].push(note);
  }

  return grouped;
}

