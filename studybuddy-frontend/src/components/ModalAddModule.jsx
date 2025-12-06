import React, { useState, useEffect } from 'react';

export default function ModalAddModule({ show, onHide, onCreate }) {
  const [name, setName] = useState('');
  const [examType, setExamType] = useState('written');

  useEffect(() => {
    if (show) {
      setName('');
      setExamType('written');
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="position-fixed top-0 start-0 vw-100 vh-100 d-flex align-items-center justify-content-center" style={{ zIndex: 1050 }}>
      <div className="modal-backdrop fade show"></div>
      <div className="card p-3" style={{ width: '520px', zIndex: 1060 }}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h5 className="mb-0">Add Module</h5>
          <button className="btn btn-sm btn-outline-secondary" onClick={onHide}>Close</button>
        </div>
        <div className="mb-2">
          <label className="form-label">Module name</label>
          <input className="form-control" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Linear Algebra" />
        </div>
        <div className="mb-3">
          <label className="form-label">Exam type</label>
          <select className="form-select" value={examType} onChange={e => setExamType(e.target.value)}>
            <option value="written">Written</option>
            <option value="presentation">Presentation</option>
            <option value="submission">Submission</option>
          </select>
        </div>
        <div className="text-end">
          <button className="btn btn-secondary me-2" onClick={onHide}>Cancel</button>
          <button className="btn btn-primary" disabled={!name.trim()} onClick={() => onCreate({ name: name.trim(), examType })}>Create</button>
        </div>
      </div>
    </div>
  );
}
