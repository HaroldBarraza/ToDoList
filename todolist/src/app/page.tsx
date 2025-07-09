import {getNotes} from '@/app/lib/queris'
import { AddNote, UpdateNotes, DeleteNote } from './lib/actions';
import type {Note} from '@/app/lib/types'
import '@/app/css/page.css'
import sql from "@/app/lib/database";

export default async function Home() {

  const notes = await getNotes();
  const categories = await sql`SELECT * FROM categories`;

  return (
    <div className='container' >
      <div className='form-agenda' >
          <form action={AddNote}>
            <p>Título de la nota</p>
            <input type="text" name='title' placeholder='Nombre de la nota' required />
            <input type="text" name='text' placeholder='Agregue las notas que deseas' required />
            <select name="category_id" required>
              <option value="">Seleccionar categoría</option>
              {categories.map((cat: any) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button>Enviar</button>
          </form>
      </div>


      <div className='notas' >
      <h2>Notas existentes</h2>
      <ul>
        {notes.length === 0 ? (
          <li>No hay notas aún</li>
        ) : (
          notes.map((nota: Note) => (
            <li key={nota.id}>
              <form action={async()=>{
                'use server';
                await UpdateNotes(nota.id, !nota.state);
              }}>
                <span className={nota.state ? '': 'texto-completado'}>
                <strong>{nota.title}</strong>: {nota.text}
                </span>
                <button type='submit'>{nota.state ? '❌' : '✔️'}</button>
              </form>
              <form action={async()=>{
                'use server';
                await DeleteNote(nota.id)
              }}> 
                <button type='submit'>🗑️</button>
              </form>
            </li>
          ))
        )}
      </ul>
      </div>
    </div>
  );
}
