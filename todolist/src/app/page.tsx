import {getNotes} from '@/app/lib/queris'
import { AddNote, UpdateNotes, DeleteNote } from './lib/actions';
import type {Note} from '@/app/lib/types'

export default async function Home() {

  const notes = await getNotes();

  return (
    <div>
      <form action={AddNote}>
        <p>Titulo de la nota</p>
        <input type="text" name='title' placeholder='Nombre de la nota'required/>
        <input type="text" name='text' placeholder='Agregue las notas que deseas' required/>
        <button>Enviar</button>
      </form>

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
                <strong>{nota.title}</strong>: {nota.text} -{''}
                {nota.state ? '✅' : '❌'}
                <button type='submit'>{nota.state ? 'Marcar como pendiente' : 'Marcar como completado'}</button>
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
  );
}
