'use server'

import sql from '@/app/lib/database';
import { revalidatePath } from 'next/cache';


export async function AddNote(formData: FormData) {
  const title = formData.get('title') as string;
  const text = formData.get('text') as string;
  const category_id = Number(formData.get('category_id'));

  await sql`
    INSERT INTO tasks (title, text, state, category_id)
    VALUES (${title}, ${text}, false, ${category_id});
  `;
}

export async function UpdateNotes(id: number, newstate: boolean){
    await sql`UPDATE tasks SET state = ${newstate} WHERE id = ${id}`;
    revalidatePath('/');
}

export async function DeleteNote(id:number) {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/')
}