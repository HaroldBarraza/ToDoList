import {getNotesGroupedByCategory} from '@/app/lib/queris'
import { AddNote, UpdateNotes, DeleteNote } from './lib/actions';
import type {Note, Categories} from '@/app/lib/types'
import '@/app/css/page.css'
import sql from "@/app/lib/database";

export default async function Home() {

  const categories = await sql<Categories[]>`SELECT * FROM categories`;
  const notesByCategory = await getNotesGroupedByCategory();

  return (
    <div className='container' >
      //FORM TO ADD A NOTE
      <div className='form-agenda' >
          <form action={AddNote}>
            <p>Add Note</p>
            <input type="text" name='title' placeholder='Title of the note' required />
            <input type="text" name='text' placeholder='Description' required />
            <select name="category_id" required>
              <option value="">Select category</option>
                {categories.map((cat: Categories) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            <button>Enviar</button>
          </form>
      </div>


      <div className='notas'>
        <h2>Notes</h2>

        {Object.keys(notesByCategory).length === 0 ? (
          <p>Any Notes</p>
        ) : (
          Object.entries(notesByCategory).map(([categoryName, notes]) => (
            <div key={categoryName}>
              <h3 className="categoria-titulo">{categoryName}</h3>
              <ul>
                {notes.map((nota: Note) => (
                  <li key={nota.id} className="nota-item">
                  <div className="nota-contenido">
                    <div className="nota-izquierda">
                      <form action={async () => {
                        'use server';
                        await UpdateNotes(nota.id, !nota.state);
                      }}>
                        <button type='submit' className='boton-check'>{nota.state ? '✔️' : '❌'}</button>
                      </form>
                    </div>
                    
                    <div className="nota-texto">
                      <strong>{nota.title}</strong>
                      <p className={nota.state ? 'texto-completado' : ''}>{nota.text}</p>
                    </div>
                    
                    <div className="nota-derecha">
                      <form action={async () => {
                        'use server';
                        await DeleteNote(nota.id);
                      }}>
                        <button type='submit' className='boton-delete'>🗑️</button>
                      </form>
                    </div>
                  </div>
                </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
