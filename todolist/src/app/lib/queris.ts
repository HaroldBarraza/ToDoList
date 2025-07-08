import sql from "@/app/lib/database";

export async function getNotes(){
    const res = await sql`SELECT id, title, text, state FROM tasks ORDER BY id DESC`
    return res;
}