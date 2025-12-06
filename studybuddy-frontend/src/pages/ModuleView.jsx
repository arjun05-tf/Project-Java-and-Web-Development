import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getModuleById, updateModule } from '../services/api';

export default function ModuleView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [module, setModule] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [examType, setExamType] = useState('written');
  const [noteText, setNoteText] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);

    getModuleById(id)
      .then(data => {
        if (!mounted) return;
        // backend returns null or 404 mapped to null in our api.js fallback
        if (!data) {
          setModule(null);
        } else {
          setModule(data);
          setName(data.name || '');
          setExamType(data.examType || 'written');
        }
      })
      .catch((e) => {
        // If backend returned 404, our api wrapper resolves to null or throws; handle both
        if (!mounted) return;
        setModule(null);
        setError('Module not found or could not be loaded.');
      })
      .finally(() => {
        if (!mounted) return;
        setLoading(false);
      });

    return () => { mounted = false; };
  }, [id]);

  async function saveEdits() {
    try {
      const patched = await updateModule(id, { name, examType });
      setModule(patched);
      setEditing(false);
    } catch (err) {
      // show a small error state
      setError('Failed to save edits.');
    }
  }

  async function addNote() {
    if (!noteText.trim()) return;
    const notes = module.notes ? [...module.notes] : [];
    notes.push({ id: Date.now(), text: noteText.trim(), createdAt: new Date().toISOString() });

    try {
      const patched = await updateModule(id, { notes });
      setModule(patched);
      setNoteText('');
    } catch (err) {
      setError('Failed to add note.');
    }
  }

  if (loading) {
    return <div className="container container-max">Loading...</div>;
  }

  // Friendly not-found UI (handles 404s gracefully)
  if (!module) {
    return (
      <div className="container container-max">
        <div className="card mb-3 p-4">
          <h4 style={{ marginBottom: 6 }}>Module not found</h4>
          <p className="small-muted">
            The module you requested doesn't exist or was removed. Try selecting a module from the list.
          </p>

          <div className="mt-3">
            <button className="btn btn-primary me-2" onClick={() => nav('/modules')}>Back to Modules</button>
            <button className="btn btn-outline-secondary" onClick={() => window.location.reload()}>Reload</button>
          </div>

          {error && <div className="mt-3 text-danger">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="container container-max">
      <div className="card mb-3">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <div>
              {!editing ? (
                <>
                  <h4>{module.name}</h4>
                  <div className="small-muted">Exam: <strong>{module.examType}</strong></div>
                </>
              ) : (
                <>
                  <input className="form-control mb-2" value={name} onChange={e => setName(e.target.value)} />
                  <select className="form-select" value={examType} onChange={e => setExamType(e.target.value)}>
                    <option value="written">Written</option>
                    <option value="presentation">Presentation</option>
                    <option value="submission">Submission</option>
                  </select>
                </>
              )}
            </div>

            <div>
              {!editing ? (
                <button className="btn btn-outline-secondary btn-sm" onClick={() => setEditing(true)}>Edit</button>
              ) : (
                <>
                  <button className="btn btn-sm btn-secondary me-2" onClick={() => { setEditing(false); setName(module.name); setExamType(module.examType); }}>Cancel</button>
                  <button className="btn btn-sm btn-primary" onClick={saveEdits}>Save</button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-7">
          <div className="card mb-3">
            <div className="card-body">
              <h6>Notes</h6>
              <div className="mb-2">
                <textarea className="form-control" rows="3" value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Write a quick note..."></textarea>
                <div className="text-end mt-2">
                  <button className="btn btn-sm btn-primary" onClick={addNote}>Add Note</button>
                </div>
              </div>

              <ul className="list-group list-group-flush">
                {module.notes && module.notes.length ? module.notes.slice().reverse().map(n => (
                  <li className="list-group-item" key={n.id}>
                    <div className="d-flex justify-content-between">
                      <div>{n.text}</div>
                      <div className="small-muted">{new Date(n.createdAt).toLocaleString()}</div>
                    </div>
                  </li>
                )) : <li className="list-group-item small-muted">No notes yet</li>}
              </ul>
            </div>
          </div>
        </div>

        <aside className="col-md-5">
          <div className="card p-3">
            <h6>Module Info</h6>
            <p className="small-muted mb-1">ID: {module.id}</p>
            <p className="small-muted mb-1">Tokens: {module.tokensEarned || 0}</p>
            <p className="small-muted">Notes count: {module.notes?.length || 0}</p>
            {error && <div className="mt-2 text-danger">{error}</div>}
          </div>
        </aside>
      </div>
    </div>
  );
}
