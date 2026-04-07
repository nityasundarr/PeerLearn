import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import AdminLayout from './AdminLayout';

const STATUS_STYLES = {
  pending:  { bg: '#fef3c7', color: '#92400e', label: 'Pending' },
  upheld:   { bg: '#fef2f2', color: '#991b1b', label: 'Upheld' },
  modified: { bg: '#eff6ff', color: '#1e40af', label: 'Modified' },
  revoked:  { bg: '#f0fdf4', color: '#166534', label: 'Revoked' },
};

const PENALTY_LABELS = { warning: 'Warning', suspension: 'Suspension', ban: 'Ban' };

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-SG', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

// ── Appeals List ─────────────────────────────────────────────────────────────

const AppealsList = () => {
  const navigate = useNavigate();
  const [appeals, setAppeals] = useState([]);
  const [statusFilter, setStatusFilter] = useState('pending');
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [hovered, setHovered] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const params = statusFilter ? `?status=${statusFilter}` : '';
      const { data } = await api.get(`/appeals${params}`);
      setAppeals(Array.isArray(data) ? data : []);
    } catch (err) {
      setAppeals([]);
      setLoadError(err.response?.data?.detail ?? err.message ?? 'Failed to load appeals');
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => { load(); }, [load]);

  const filters = ['pending', 'upheld', 'modified', 'revoked'];
  const filterLabels = { pending: 'Pending', upheld: 'Upheld', modified: 'Modified', revoked: 'Revoked' };

  return (
    <AdminLayout>
      <div style={{ maxWidth: '900px' }}>
        <h1 style={{ margin: '0 0 4px', fontSize: '26px', fontWeight: '700', color: '#1c1917' }}>Appeals</h1>
        <p style={{ margin: '0 0 24px', color: '#78716c', fontSize: '14px' }}>Review and decide on penalty appeals submitted by users</p>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {filters.map((f) => {
            const active = statusFilter === f;
            return (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                onMouseEnter={() => setHovered(`filter-${f}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  padding: '8px 16px',
                  background: active ? '#1a5f4a' : (hovered === `filter-${f}` ? '#f0faf5' : '#fff'),
                  color: active ? '#fff' : '#57534e',
                  border: `1px solid ${active ? '#1a5f4a' : '#e7e5e4'}`,
                  borderRadius: '8px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                {filterLabels[f]}
              </button>
            );
          })}
        </div>

        {loading && <div style={{ color: '#a8a29e', padding: '48px', textAlign: 'center' }}>Loading…</div>}
        {!loading && loadError && (
          <div style={{ color: '#b91c1c', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '16px', marginBottom: '16px', fontSize: '14px' }}>
            Error: {loadError}
          </div>
        )}
        {!loading && !loadError && appeals.length === 0 && (
          <div style={{ color: '#a8a29e', padding: '48px', textAlign: 'center', background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4' }}>No appeals found.</div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {appeals.map((a) => {
            const s = STATUS_STYLES[a.status] || STATUS_STYLES.pending;
            return (
              <div
                key={a.appeal_id}
                onClick={() => navigate(`/admin/appeals/${a.appeal_id}`)}
                onMouseEnter={() => setHovered(`row-${a.appeal_id}`)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  background: '#fff', borderRadius: '12px',
                  border: `1px solid ${hovered === `row-${a.appeal_id}` ? '#1a5f4a' : '#e7e5e4'}`,
                  padding: '18px 24px', cursor: 'pointer', transition: 'all 0.15s',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#1c1917', fontFamily: 'monospace' }}>
                      APL-{a.appeal_id.slice(0, 8).toUpperCase()}
                    </span>
                    <span style={{ background: s.bg, color: s.color, padding: '2px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{s.label}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: '13px', color: '#57534e', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {a.appeal_text}
                  </p>
                </div>
                <div style={{ fontSize: '12px', color: '#a8a29e', whiteSpace: 'nowrap' }}>{formatDate(a.submitted_at)}</div>
                <span style={{ color: '#1a5f4a', fontSize: '18px' }}>›</span>
              </div>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
};

// ── Appeal Detail ─────────────────────────────────────────────────────────────

const AppealDetail = () => {
  const { appealId } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [decideForm, setDecideForm] = useState({ outcome: 'revoked', outcome_notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/appeals/${appealId}`);
      setDetail(data);
    } catch (err) {
      if (err.response?.status === 403) navigate('/admin/appeals');
    } finally {
      setLoading(false);
    }
  }, [appealId, navigate]);

  useEffect(() => { load(); }, [load]);

  const handleDecide = async () => {
    if (!decideForm.outcome) { setError('Please select an outcome.'); return; }
    setError(null);
    setSubmitting(true);
    try {
      await api.patch(`/appeals/${appealId}`, decideForm);
      await load();
    } catch (err) {
      setError(err.response?.data?.detail ?? 'Failed to record decision.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <AdminLayout><div style={{ color: '#a8a29e', padding: '48px', textAlign: 'center' }}>Loading…</div></AdminLayout>;
  if (!detail) return <AdminLayout><div style={{ color: '#b91c1c', padding: '48px', textAlign: 'center' }}>Appeal not found.</div></AdminLayout>;

  const { appeal, disciplinary_record } = detail;
  const s = STATUS_STYLES[appeal.status] || STATUS_STYLES.pending;
  const isPending = appeal.status === 'pending';

  const InfoRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f5f5f4', fontSize: '14px' }}>
      <span style={{ color: '#78716c', fontWeight: '500' }}>{label}</span>
      <span style={{ color: '#1c1917', fontFamily: label.includes('ID') ? 'monospace' : 'inherit', fontSize: label.includes('ID') ? '12px' : '14px', textAlign: 'right', maxWidth: '60%', wordBreak: 'break-all' }}>{value || '—'}</span>
    </div>
  );

  return (
    <AdminLayout>
      <div style={{ maxWidth: '760px' }}>
        <button
          onClick={() => navigate('/admin/appeals')}
          style={{ background: 'none', border: 'none', color: '#1a5f4a', fontSize: '14px', fontWeight: '500', cursor: 'pointer', marginBottom: '24px', padding: 0 }}
        >
          ← Back to Appeals
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1c1917' }}>
            APL-{appeal.appeal_id.slice(0, 8).toUpperCase()}
          </h1>
          <span style={{ background: s.bg, color: s.color, padding: '4px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: '600' }}>{s.label}</span>
        </div>

        {/* Appeal Text */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '12px' }}>Appeal Statement</h2>
          <p style={{ fontSize: '15px', color: '#1c1917', lineHeight: 1.65, margin: 0, whiteSpace: 'pre-wrap' }}>{appeal.appeal_text}</p>
          <div style={{ marginTop: '16px', fontSize: '13px', color: '#a8a29e' }}>Submitted {formatDate(appeal.submitted_at)}</div>
        </div>

        {/* Appeal Info */}
        <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '24px', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '4px' }}>Appeal Info</h2>
          <InfoRow label="Appeal ID" value={appeal.appeal_id} />
          <InfoRow label="Appellant User ID" value={appeal.user_id} />
          <InfoRow label="Submitted" value={formatDate(appeal.submitted_at)} />
          {appeal.decided_at && <InfoRow label="Decided" value={formatDate(appeal.decided_at)} />}
          {appeal.outcome_notes && <InfoRow label="Outcome Notes" value={appeal.outcome_notes} />}
        </div>

        {/* Linked Disciplinary Record */}
        {disciplinary_record && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '24px', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '4px' }}>Linked Penalty</h2>
            <InfoRow label="Record ID" value={disciplinary_record.record_id} />
            <InfoRow label="Penalty Type" value={PENALTY_LABELS[disciplinary_record.penalty_type] || disciplinary_record.penalty_type} />
            <InfoRow label="Issued To (User ID)" value={disciplinary_record.user_id} />
            <InfoRow label="Issued At" value={formatDate(disciplinary_record.issued_at)} />
            <InfoRow label="Appeal Deadline" value={formatDate(disciplinary_record.appeal_deadline)} />
            {disciplinary_record.complaint_id && (
              <div style={{ marginTop: '12px' }}>
                <button
                  onClick={() => navigate(`/admin/complaints/${disciplinary_record.complaint_id}`)}
                  onMouseEnter={() => setHovered('view-complaint')}
                  onMouseLeave={() => setHovered(null)}
                  style={{ padding: '8px 16px', background: hovered === 'view-complaint' ? '#f0faf5' : '#fff', color: '#1a5f4a', border: '1px solid #1a5f4a', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}
                >
                  View Linked Complaint →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Decision Form — only if pending */}
        {isPending && (
          <div style={{ background: '#fff', borderRadius: '14px', border: '1px solid #e7e5e4', padding: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1c1917', marginBottom: '16px' }}>Record Decision</h2>

            {error && <p style={{ color: '#ef4444', fontSize: '13px', marginBottom: '12px' }}>{error}</p>}

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Outcome</label>
              <select
                value={decideForm.outcome}
                onChange={(e) => setDecideForm((f) => ({ ...f, outcome: e.target.value }))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', background: '#fff' }}
              >
                <option value="revoked">Revoked — penalty removed</option>
                <option value="modified">Modified — penalty adjusted</option>
                <option value="upheld">Upheld — penalty stands</option>
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Notes (optional)</label>
              <textarea
                rows={3}
                value={decideForm.outcome_notes}
                onChange={(e) => setDecideForm((f) => ({ ...f, outcome_notes: e.target.value }))}
                placeholder="Explain the decision to the appellant…"
                style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }}
              />
            </div>

            <button
              onClick={handleDecide}
              disabled={submitting}
              onMouseEnter={() => !submitting && setHovered('decide')}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: '100%', padding: '14px',
                background: submitting ? '#e7e5e4' : (hovered === 'decide' ? '#145040' : '#1a5f4a'),
                color: submitting ? '#a8a29e' : '#fff',
                border: 'none', borderRadius: '10px', fontWeight: '600',
                cursor: submitting ? 'not-allowed' : 'pointer', fontSize: '15px', transition: 'all 0.2s ease',
              }}
            >
              {submitting ? 'Submitting…' : 'Submit Decision'}
            </button>
          </div>
        )}

        {/* Already decided */}
        {!isPending && (
          <div style={{ background: s.bg, borderRadius: '14px', border: `1px solid ${s.color}30`, padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '18px', fontWeight: '700', color: s.color, marginBottom: '4px' }}>
              Decision: {s.label}
            </div>
            {appeal.outcome_notes && <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#57534e' }}>{appeal.outcome_notes}</p>}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

// ── Route-level export ────────────────────────────────────────────────────────

const AdminAppeals = () => {
  const { appealId } = useParams();
  return appealId ? <AppealDetail /> : <AppealsList />;
};

export default AdminAppeals;
