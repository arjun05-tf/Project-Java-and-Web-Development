import React, { useEffect, useState } from 'react';
import { getModules } from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    getModules().then(data => {
      if (mounted) {
        setModules(Array.isArray(data) ? data : []);
        setLoading(false);
      }
    }).catch(() => setLoading(false));
    return () => { mounted = false; };
  }, []);

  return (
    <div className="container container-max">
      <div className="row">
        <div className="col-md-8">
          <div className="card mb-4">
            <div className="card-body">
              <h4>Welcome to StudyBuddy</h4>
              <p className="small-muted">A simple productivity tool to keep track of modules, exams and notes.</p>
              <Link to="/modules" className="btn btn-primary">Open Modules</Link>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <div className="card p-3">
                <h6>Total Modules</h6>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{loading ? '...' : modules.length}</div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="card p-3">
                <h6>Estimated Tokens</h6>
                <div style={{ fontSize: '1.5rem', fontWeight: 600 }}>{loading ? '...' : modules.reduce((s, m) => s + (m.tokensEarned || 0), 0)}</div>
              </div>
            </div>
          </div>
        </div>

        <aside className="col-md-4">
          <div className="card p-3">
            <h6>Quick Tips</h6>
            <ul className="ps-3">
              <li>Use modules to separate subjects</li>
              <li>Pick an exam type for planning</li>
              <li>Start by adding 2–3 modules</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
