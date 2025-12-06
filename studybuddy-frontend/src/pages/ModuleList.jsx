import React, { useEffect, useState } from 'react';
import { getModules, createModule, deleteModule } from '../services/api';
import ModuleCard from '../components/ModuleCard';
import ModalAddModule from '../components/ModalAddModule';

export default function ModuleList() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    refresh();
    // eslint-disable-next-line
  }, []);

  const refresh = () => {
    setLoading(true);
    getModules().then(data => {
      setModules(Array.isArray(data) ? data : []);
    }).catch(() => {
      setModules([]);
    }).finally(() => setLoading(false));
  };

  async function handleCreate(payload) {
    const created = await createModule(payload);
    setModules(prev => [...prev, created]);
    setShowAdd(false);
  }

  async function handleDelete(id) {
    if (!window.confirm('Delete this module?')) return;
    await deleteModule(id);
    setModules(prev => prev.filter(m => Number(m.id) !== Number(id)));
  }

  return (
    <div className="container container-max">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Modules</h3>
        <div>
          <button className="btn btn-outline-secondary me-2" onClick={refresh}>Refresh</button>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}>+ Add Module</button>
        </div>
      </div>

      {loading ? (
        <div>Loading modules...</div>
      ) : (
        <div className="row">
          {modules.length ? modules.map(m => (
            <ModuleCard key={m.id} module={m} onDelete={handleDelete} />
          )) : (
            <div className="col-12">
              <div className="card p-3">No modules yet. Click <button className="btn btn-sm btn-link p-0" onClick={() => setShowAdd(true)}>Add Module</button> to get started.</div>
            </div>
          )}
        </div>
      )}

      <ModalAddModule show={showAdd} onHide={() => setShowAdd(false)} onCreate={handleCreate} />
    </div>
  );
}
