'use server'

import sql from '@/app/lib/database';
import { revalidatePath } from 'next/cache';
import { relative } from 'path';

export async function AddNote(formData: FormData){
    const title = formData.get('title') as string;
    const text = formData.get('text') as string;

    if (!title || !text)return;

    await sql`INSERT INTO tasks (title, text, state)
    VALUES (${title}, ${text}, false)`;

    revalidatePath('/')
}

export async function UpdateNotes(id: number, newstate: boolean){
    await sql`UPDATE tasks SET state = ${newstate} WHERE id = ${id}`;
    revalidatePath('/');
}

export async function DeleteNote(id:number) {
    await sql`DELETE FROM tasks WHERE id = ${id}`;
    revalidatePath('/')
}