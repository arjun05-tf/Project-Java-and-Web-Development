import React from 'react';
import { Link } from 'react-router-dom';

export default function ModuleCard({ module, onDelete }) {
  return (
    <div className="col-sm-6 col-md-4 mb-4">
      <div className="card card-module h-100">
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{module.name}</h5>
          <p className="small-muted mb-2">Exam type: <strong>{module.examType}</strong></p>
          <p className="small-muted mb-4">Notes: {module.notes?.length || 0} • Tokens: {module.tokensEarned || 0}</p>
          <div className="mt-auto d-flex justify-content-between">
            <Link to={`/modules/${module.id}`} className="btn btn-outline-primary btn-sm">Open</Link>
            <button onClick={() => onDelete(module.id)} className="btn btn-outline-danger btn-sm">Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
