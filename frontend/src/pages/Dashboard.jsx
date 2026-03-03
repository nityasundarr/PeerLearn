import React, { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';

// ============================================================
// SECTION 2: USER DASHBOARD (UPDATED)
// Changes per SRS:
// - Session states (2.7.1)
// - Messaging channel (2.9)
// - Session fee display (2.8)
// - Pending actions (2.12.4.2)
// - Accept/decline/message for requests (2.12.6.3)
// ============================================================

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);

  const sessionStates = {
    PENDING_TUTOR: { label: 'Pending Tutor Selection', color: '#f59e0b', bg: '#fef3c7' },
    TUTOR_ACCEPTED: { label: 'Tutor Accepted', color: '#3b82f6', bg: '#dbeafe' },
    PENDING_CONFIRM: { label: 'Pending Confirmation', color: '#f59e0b', bg: '#fef3c7' },
    CONFIRMED: { label: 'Confirmed', color: '#22c55e', bg: '#dcfce7' },
    CANCELLED: { label: 'Cancelled', color: '#ef4444', bg: '#fef2f2' },
    COMPLETED: { label: 'Completed', color: '#6b7280', bg: '#f3f4f6' },
  };

  const upcomingSessions = [
    { id: 1, subject: 'Mathematics', topic: 'Calculus Integration', tutor: 'Sarah Tan', initials: 'ST', date: 'Tue, 14 Jan', time: '3:00 PM', venue: 'Clementi Library', state: 'CONFIRMED', fee: '$27.50' },
    { id: 2, subject: 'Physics', topic: 'Mechanics', tutor: 'James Lim', initials: 'JL', date: 'Thu, 16 Jan', time: '4:00 PM', venue: 'West Coast CC', state: 'PENDING_CONFIRM', fee: '$27.50' },
  ];

  const incomingRequests = [
    { id: 3, subject: 'Computer Science', topic: 'Data Structures', student: 'Alice Wong', initials: 'AW', date: 'Wed, 15 Jan', time: '2:00 PM', urgency: 'Exam Soon', level: 'University', fee: '$25.00' },
    { id: 4, subject: 'Mathematics', topic: 'Linear Algebra', student: 'Bob Chen', initials: 'BC', date: 'Fri, 17 Jan', time: '5:00 PM', urgency: 'Assignment Due', level: 'Polytechnic', fee: '$22.00' },
  ];

  const pendingActions = [
    { id: 1, type: 'payment', text: 'Complete payment for Physics session', action: 'Pay Now', urgent: true },
    { id: 2, type: 'request', text: '2 new tutoring requests waiting', action: 'View', urgent: false },
    { id: 3, type: 'feedback', text: 'Rate your session with Emily Wong', action: 'Feedback', urgent: false },
  ];

  const StatusBadge = ({ state }) => {
    const s = sessionStates[state];
    return <span style={{ background: s.bg, color: s.color, padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{s.label}</span>;
  };

  // HOME TAB
  const HomeTab = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
      <div>
        {/* Welcome */}
        <div style={{ background: 'linear-gradient(135deg, #1a5f4a 0%, #2d8a6e 100%)', borderRadius: '20px', padding: '32px', color: '#fff', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '700', marginBottom: '8px' }}>Welcome back, John! 👋</h1>
          <p style={{ opacity: 0.9, marginBottom: '20px' }}>Ready to learn or teach today?</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ background: '#f59e0b', border: 'none', padding: '12px 24px', borderRadius: '10px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>🎓 Request Help</button>
            <button style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 24px', borderRadius: '10px', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>💡 Offer to Tutor</button>
          </div>
        </div>

        {/* Pending Actions (SRS 2.12.4.2) */}
        <div style={{ background: '#fef3c7', border: '1px solid #fde68a', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#92400e', marginBottom: '16px' }}>⚡ Pending Actions</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {pendingActions.map(a => (
              <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', padding: '12px 16px', borderRadius: '10px' }}>
                <span style={{ fontSize: '14px', color: '#1c1917' }}>{a.text}</span>
                <button style={{ padding: '8px 16px', background: a.urgent ? '#ef4444' : '#1a5f4a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>{a.action}</button>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {[{ label: 'Upcoming', value: '2', icon: '📅' }, { label: 'Pending', value: '2', icon: '⏳' }, { label: 'Hours Learned', value: '12', icon: '📚' }, { label: 'Hours Taught', value: '8', icon: '🎓' }].map((s, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e7e5e4', textAlign: 'center' }}>
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{s.icon}</div>
              <div style={{ fontSize: '28px', fontWeight: '700', color: '#1c1917' }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#57534e' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Upcoming Sessions */}
        <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e7e5e4', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1c1917' }}>📅 Upcoming Sessions</h3>
          {upcomingSessions.map(session => (
            <div key={session.id} onClick={() => setShowDetailPanel(true)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f5f5f4', borderRadius: '12px', marginBottom: '12px', cursor: 'pointer' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{session.initials}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>{session.subject}: {session.topic}</div>
                  <div style={{ fontSize: '13px', color: '#57534e' }}>with {session.tutor} • {session.date}, {session.time}</div>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <StatusBadge state={session.state} />
                <div style={{ fontSize: '14px', fontWeight: '600', color: '#1a5f4a', marginTop: '8px' }}>{session.fee}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar - Incoming Requests */}
      <div>
        <div style={{ background: '#fff', borderRadius: '16px', border: '2px solid #f59e0b', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px', color: '#1c1917', display: 'flex', alignItems: 'center', gap: '8px' }}>
            📩 Incoming Requests
            <span style={{ background: '#ef4444', color: '#fff', padding: '2px 10px', borderRadius: '10px', fontSize: '13px' }}>2</span>
          </h3>
          {incomingRequests.map(req => (
            <div key={req.id} style={{ padding: '16px', background: '#fef3c7', borderRadius: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>{req.initials}</div>
                <div>
                  <div style={{ fontWeight: '600', color: '#1c1917', fontSize: '14px' }}>{req.student}</div>
                  <div style={{ fontSize: '12px', color: '#57534e' }}>{req.level}</div>
                </div>
                <span style={{ marginLeft: 'auto', background: req.urgency === 'Exam Soon' ? '#fef2f2' : '#fef3c7', color: req.urgency === 'Exam Soon' ? '#ef4444' : '#f59e0b', padding: '4px 10px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>{req.urgency}</span>
              </div>
              <div style={{ fontSize: '14px', color: '#1c1917', fontWeight: '500', marginBottom: '4px' }}>{req.subject}: {req.topic}</div>
              <div style={{ fontSize: '13px', color: '#57534e', marginBottom: '8px' }}>{req.date}, {req.time}</div>
              <div style={{ fontSize: '14px', color: '#1a5f4a', fontWeight: '600', marginBottom: '12px' }}>Fee: {req.fee}</div>
              {/* Accept/Decline/Message (SRS 2.12.6.3) */}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button style={{ flex: 1, padding: '10px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '13px' }}>✓ Accept</button>
                <button style={{ flex: 1, padding: '10px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>✕ Decline</button>
                <button style={{ padding: '10px 14px', background: '#fff', color: '#3b82f6', border: '1px solid #93c5fd', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', fontSize: '13px' }}>💬</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // MY LEARNING TAB
  const LearningTab = () => (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['Upcoming', 'Pending', 'Past', 'Cancelled'].map((tab, i) => (
          <button key={tab} style={{ padding: '10px 20px', background: i === 0 ? '#1a5f4a' : '#fff', color: i === 0 ? '#fff' : '#57534e', border: `1px solid ${i === 0 ? '#1a5f4a' : '#e7e5e4'}`, borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>{tab}</button>
        ))}
      </div>
      
      {upcomingSessions.map(session => (
        <div key={session.id} style={{ background: '#fff', borderRadius: '16px', border: '1px solid #e7e5e4', padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', background: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{session.initials}</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>{session.subject}: {session.topic}</h3>
                <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '8px' }}>with {session.tutor}</p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#57534e' }}>
                  <span>📅 {session.date}</span>
                  <span>🕐 {session.time}</span>
                  <span>📍 {session.venue}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <StatusBadge state={session.state} />
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a5f4a', marginTop: '12px' }}>{session.fee}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #e7e5e4' }}>
            <button onClick={() => setShowDetailPanel(true)} style={{ padding: '10px 20px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>View Details</button>
            <button style={{ padding: '10px 20px', background: '#fff', color: '#3b82f6', border: '1px solid #93c5fd', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>💬 Message Tutor</button>
            {session.state === 'PENDING_CONFIRM' && <button style={{ padding: '10px 20px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>💳 Pay Now</button>}
            <button style={{ padding: '10px 20px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontWeight: '500', cursor: 'pointer', marginLeft: 'auto' }}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );

  // MY TUTORING TAB
  const TutoringTab = () => (
    <div>
      {/* Tutor Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
        {[{ label: 'Rating', value: '⭐ 4.8' }, { label: 'Weekly Hours', value: '2/5' }, { label: 'Reliability', value: '98%' }, { label: 'Total Sessions', value: '24' }].map((s, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', padding: '20px', border: '1px solid #e7e5e4', textAlign: 'center' }}>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1a5f4a' }}>{s.value}</div>
            <div style={{ fontSize: '13px', color: '#57534e' }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {[{ label: 'Incoming Requests', badge: 2 }, { label: 'Upcoming' }, { label: 'Past' }, { label: 'Cancelled' }].map((tab, i) => (
          <button key={tab.label} style={{ padding: '10px 20px', background: i === 0 ? '#1a5f4a' : '#fff', color: i === 0 ? '#fff' : '#57534e', border: `1px solid ${i === 0 ? '#1a5f4a' : '#e7e5e4'}`, borderRadius: '8px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {tab.label}
            {tab.badge && <span style={{ background: '#ef4444', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '12px' }}>{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* Incoming Requests with Accept/Decline/Message (SRS 2.12.6.3) */}
      {incomingRequests.map(req => (
        <div key={req.id} style={{ background: '#fff', borderRadius: '16px', border: '2px solid #f59e0b', padding: '24px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ width: '56px', height: '56px', background: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '18px' }}>{req.initials}</div>
              <div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '4px' }}>{req.subject}: {req.topic}</h3>
                <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '4px' }}>from {req.student} • {req.level}</p>
                <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#57534e' }}>
                  <span>📅 {req.date}</span>
                  <span>🕐 {req.time}</span>
                </div>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <span style={{ background: req.urgency === 'Exam Soon' ? '#fef2f2' : '#fef3c7', color: req.urgency === 'Exam Soon' ? '#ef4444' : '#f59e0b', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600' }}>🔥 {req.urgency}</span>
              <div style={{ fontSize: '18px', fontWeight: '700', color: '#1a5f4a', marginTop: '12px' }}>Fee: {req.fee}</div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ flex: 1, padding: '14px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>✓ Accept Request</button>
            <button style={{ flex: 1, padding: '14px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', fontWeight: '500', cursor: 'pointer', fontSize: '15px' }}>✕ Decline</button>
            <button style={{ padding: '14px 24px', background: '#fff', color: '#3b82f6', border: '1px solid #93c5fd', borderRadius: '10px', fontWeight: '500', cursor: 'pointer', fontSize: '15px' }}>💬 Message</button>
          </div>
        </div>
      ))}
    </div>
  );

  // CHATS TAB (SRS 2.9)
  const ChatsTab = () => {
    const [selectedChat, setSelectedChat] = useState(1);
    
    const chatList = [
      { id: 1, name: 'Sarah Tan', initials: 'ST', lastMessage: 'Perfect! See you then! 📚', time: '10 min', unread: 2, session: 'Calculus • Tue 3 PM', status: 'confirmed' },
      { id: 2, name: 'James Lim', initials: 'JL', lastMessage: 'Thanks for confirming!', time: '2 hours', unread: 0, session: 'Physics • Thu 4 PM', status: 'confirmed' },
      { id: 3, name: 'Alice Wong', initials: 'AW', lastMessage: 'Looking forward to it', time: '1 day', unread: 0, session: 'Data Structures • Wed 2 PM', status: 'pending' },
    ];

    const messages = [
      { id: 1, sender: 'them', text: 'Hi! Looking forward to our session. Should we meet at the library entrance?', time: '10:30 AM' },
      { id: 2, sender: 'me', text: "Sounds good! I'll be there 5 mins early.", time: '10:35 AM' },
      { id: 3, sender: 'them', text: 'Perfect! Also, please bring your lecture notes if you have them 📚', time: '10:36 AM' },
      { id: 4, sender: 'me', text: 'Will do! See you then!', time: '10:38 AM' },
    ];

    const currentChat = chatList.find(c => c.id === selectedChat);

    return (
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '0', height: 'calc(100vh - 200px)', background: '#fff', borderRadius: '16px', border: '1px solid #e7e5e4', overflow: 'hidden' }}>
        {/* Chat List */}
        <div style={{ borderRight: '1px solid #e7e5e4', overflowY: 'auto' }}>
          <div style={{ padding: '20px', borderBottom: '1px solid #e7e5e4' }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '12px' }}>Messages</h3>
            <input type="text" placeholder="Search conversations..." style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #e7e5e4', fontSize: '14px', boxSizing: 'border-box' }} />
          </div>
          {chatList.map(chat => (
            <div key={chat.id} onClick={() => setSelectedChat(chat.id)} style={{ padding: '16px 20px', borderBottom: '1px solid #f5f5f4', cursor: 'pointer', background: selectedChat === chat.id ? '#f0fdf4' : '#fff', borderLeft: selectedChat === chat.id ? '3px solid #1a5f4a' : '3px solid transparent' }}>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '48px', background: '#f59e0b', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', flexShrink: 0 }}>{chat.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span style={{ fontWeight: '600', color: '#1c1917', fontSize: '14px' }}>{chat.name}</span>
                    <span style={{ fontSize: '12px', color: '#a8a29e' }}>{chat.time}</span>
                  </div>
                  <div style={{ fontSize: '13px', color: '#57534e', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{chat.lastMessage}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#a8a29e' }}>{chat.session}</span>
                    {chat.unread > 0 && <span style={{ background: '#1a5f4a', color: '#fff', padding: '2px 8px', borderRadius: '10px', fontSize: '11px', fontWeight: '600' }}>{chat.unread}</span>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {/* Chat Header */}
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '44px', height: '44px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>{currentChat?.initials}</div>
              <div>
                <div style={{ fontWeight: '600', color: '#1c1917' }}>{currentChat?.name}</div>
                <div style={{ fontSize: '13px', color: '#57534e' }}>{currentChat?.session}</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ background: currentChat?.status === 'confirmed' ? '#dcfce7' : '#fef3c7', color: currentChat?.status === 'confirmed' ? '#166534' : '#92400e', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500' }}>{currentChat?.status === 'confirmed' ? '✓ Confirmed' : '⏳ Pending'}</span>
              <button style={{ padding: '8px 16px', background: '#f5f5f4', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '13px', color: '#57534e' }}>View Session</button>
            </div>
          </div>

          {/* Messages Area */}
          <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#fafaf9' }}>
            {/* System Message */}
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <span style={{ background: '#e7e5e4', padding: '6px 14px', borderRadius: '12px', fontSize: '12px', color: '#57534e' }}>Session confirmed • Messages are for coordination only</span>
            </div>

            {messages.map(msg => (
              <div key={msg.id} style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexDirection: msg.sender === 'me' ? 'row-reverse' : 'row' }}>
                <div style={{ width: '32px', height: '32px', background: msg.sender === 'me' ? '#1a5f4a' : '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '11px', flexShrink: 0 }}>{msg.sender === 'me' ? 'JD' : currentChat?.initials}</div>
                <div style={{ textAlign: msg.sender === 'me' ? 'right' : 'left' }}>
                  <div style={{ background: msg.sender === 'me' ? '#1a5f4a' : '#fff', padding: '12px 16px', borderRadius: msg.sender === 'me' ? '12px 12px 4px 12px' : '12px 12px 12px 4px', maxWidth: '320px', display: 'inline-block', boxShadow: msg.sender === 'me' ? 'none' : '0 1px 2px rgba(0,0,0,0.05)' }}>
                    <p style={{ fontSize: '14px', color: msg.sender === 'me' ? '#fff' : '#1c1917', margin: 0 }}>{msg.text}</p>
                  </div>
                  <div style={{ fontSize: '11px', color: '#a8a29e', marginTop: '4px' }}>{msg.time}{msg.sender === 'me' && ' ✓'}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e7e5e4', background: '#fff' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
              <div style={{ flex: 1, background: '#f5f5f4', borderRadius: '12px', padding: '12px 16px' }}>
                <textarea rows={1} placeholder="Type a message..." style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', resize: 'none', outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <button style={{ width: '48px', height: '48px', background: '#1a5f4a', border: 'none', borderRadius: '12px', cursor: 'pointer', color: '#fff', fontSize: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // NOTIFICATIONS TAB
  const NotificationsTab = () => (
    <div>
      <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
        {['All', 'Reminders', 'Requests', 'Feedback', 'System'].map((filter, i) => (
          <button key={filter} style={{ padding: '10px 20px', background: i === 0 ? '#1a5f4a' : '#fff', color: i === 0 ? '#fff' : '#57534e', border: `1px solid ${i === 0 ? '#1a5f4a' : '#e7e5e4'}`, borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>{filter}</button>
        ))}
      </div>

      {[
        { icon: '⏰', title: 'Session Tomorrow', message: 'Calculus session with Sarah Tan at 3 PM', time: '2 hours ago', unread: true },
        { icon: '📩', title: 'New Tutoring Request', message: 'Alice Wong requested help with Data Structures', time: '5 hours ago', unread: true },
        { icon: '⭐', title: 'Feedback Received', message: 'You received a 5-star rating from John Doe', time: '1 day ago', unread: false },
        { icon: '💳', title: 'Payment Confirmed', message: 'Payment of $27.50 for Physics session confirmed', time: '2 days ago', unread: false },
      ].map((notif, i) => (
        <div key={i} style={{ background: '#fff', borderRadius: '12px', border: `1px solid ${notif.unread ? '#bbf7d0' : '#e7e5e4'}`, padding: '20px', marginBottom: '12px', display: 'flex', gap: '16px', alignItems: 'flex-start', borderLeft: notif.unread ? '4px solid #22c55e' : 'none' }}>
          <div style={{ width: '48px', height: '48px', background: notif.unread ? '#dcfce7' : '#f5f5f4', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px' }}>{notif.icon}</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
              <h4 style={{ fontWeight: '600', color: '#1c1917' }}>{notif.title}</h4>
              {notif.unread && <span style={{ width: '10px', height: '10px', background: '#22c55e', borderRadius: '50%' }}></span>}
            </div>
            <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '8px' }}>{notif.message}</p>
            <span style={{ fontSize: '13px', color: '#a8a29e' }}>{notif.time}</span>
          </div>
        </div>
      ))}
    </div>
  );

  // MESSAGING CHANNEL UI (SRS 2.9)
  const MessagingPanel = () => (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '400px', height: '100vh', background: '#fff', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', zIndex: 1001, display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{ padding: '20px 24px', borderBottom: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#1a5f4a' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>ST</div>
          <div>
            <div style={{ fontWeight: '600', color: '#fff' }}>Sarah Tan</div>
            <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.8)' }}>Calculus Session • Tue 3 PM</div>
          </div>
        </div>
        <button onClick={() => setShowMessaging(false)} style={{ background: 'rgba(255,255,255,0.2)', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', color: '#fff', fontSize: '16px' }}>✕</button>
      </div>

      {/* Messages Area */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto', background: '#f5f5f4' }}>
        {/* System Message */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <span style={{ background: '#e7e5e4', padding: '6px 12px', borderRadius: '12px', fontSize: '12px', color: '#57534e' }}>Session confirmed • Jan 14, 2025</span>
        </div>

        {/* Received Message */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>ST</div>
          <div>
            <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '12px 12px 12px 4px', maxWidth: '260px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '14px', color: '#1c1917', margin: 0 }}>Hi! Looking forward to our session. Should we meet at the library entrance?</p>
            </div>
            <span style={{ fontSize: '11px', color: '#a8a29e', marginTop: '4px', display: 'block' }}>10:30 AM</span>
          </div>
        </div>

        {/* Sent Message */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexDirection: 'row-reverse' }}>
          <div style={{ width: '32px', height: '32px', background: '#1a5f4a', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>JD</div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ background: '#1a5f4a', padding: '12px 16px', borderRadius: '12px 12px 4px 12px', maxWidth: '260px', display: 'inline-block' }}>
              <p style={{ fontSize: '14px', color: '#fff', margin: 0 }}>Sounds good! I'll be there 5 mins early. See you then!</p>
            </div>
            <span style={{ fontSize: '11px', color: '#a8a29e', marginTop: '4px', display: 'block' }}>10:35 AM ✓</span>
          </div>
        </div>

        {/* Received Message */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <div style={{ width: '32px', height: '32px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '12px', flexShrink: 0 }}>ST</div>
          <div>
            <div style={{ background: '#fff', padding: '12px 16px', borderRadius: '12px 12px 12px 4px', maxWidth: '260px', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '14px', color: '#1c1917', margin: 0 }}>Perfect! Also, please bring your lecture notes if you have them 📚</p>
            </div>
            <span style={{ fontSize: '11px', color: '#a8a29e', marginTop: '4px', display: 'block' }}>10:36 AM</span>
          </div>
        </div>
      </div>

      {/* Input Area */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid #e7e5e4', background: '#fff' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, background: '#f5f5f4', borderRadius: '12px', padding: '12px 16px' }}>
            <textarea rows={1} placeholder="Type a message..." style={{ width: '100%', border: 'none', background: 'transparent', fontSize: '14px', resize: 'none', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <button style={{ width: '44px', height: '44px', background: '#1a5f4a', border: 'none', borderRadius: '12px', cursor: 'pointer', color: '#fff', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>➤</button>
        </div>
        <p style={{ fontSize: '11px', color: '#a8a29e', marginTop: '8px', textAlign: 'center' }}>Messages are for session coordination only</p>
      </div>
    </div>
  );

  // SESSION DETAIL PANEL (SRS 2.9: Messaging Channel)
  const DetailPanel = () => (
    <div style={{ position: 'fixed', top: 0, right: 0, width: '500px', height: '100vh', background: '#fff', boxShadow: '-10px 0 40px rgba(0,0,0,0.1)', zIndex: 1000, overflowY: 'auto' }}>
      <div style={{ padding: '24px', borderBottom: '1px solid #e7e5e4', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1c1917' }}>Session Details</h2>
        <button onClick={() => setShowDetailPanel(false)} style={{ background: '#f5f5f4', border: 'none', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>✕</button>
      </div>
      <div style={{ padding: '24px' }}>
        <StatusBadge state="CONFIRMED" />
        <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#1c1917', marginTop: '16px', marginBottom: '8px' }}>Mathematics: Calculus Integration</h3>
        <p style={{ color: '#57534e', marginBottom: '24px' }}>University Level</p>

        <div style={{ background: '#f5f5f4', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Tutor</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '48px', height: '48px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>ST</div>
            <div>
              <div style={{ fontWeight: '600', color: '#1c1917' }}>Sarah Tan</div>
              <div style={{ fontSize: '13px', color: '#57534e' }}>⭐ 4.9 • 98% reliable</div>
            </div>
          </div>
        </div>

        <div style={{ background: '#f5f5f4', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Date & Time</div>
          <div style={{ fontWeight: '600', color: '#1c1917' }}>📅 Tuesday, 14 January 2025</div>
          <div style={{ color: '#57534e' }}>🕐 3:00 PM - 4:00 PM (1 hour)</div>
        </div>

        <div style={{ background: '#f5f5f4', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Venue</div>
          <div style={{ fontWeight: '600', color: '#1c1917' }}>📍 Clementi Public Library</div>
          <div style={{ color: '#57534e', marginBottom: '12px' }}>3155 Commonwealth Ave West</div>
          <div style={{ background: '#e7e5e4', height: '120px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a8a29e' }}>🗺️ OneMap</div>
          {/* <div style={{ display: 'flex', gap: '8px', marginTop: '12px', flexWrap: 'wrap' }}>
            {['♿ Wheelchair', '🛗 Lift', '📶 WiFi'].map(tag => <span key={tag} style={{ background: '#fff', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', color: '#57534e' }}>{tag}</span>)}
          </div> */}
        </div>

        <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '12px', color: '#a8a29e', textTransform: 'uppercase', fontWeight: '600', marginBottom: '8px' }}>Session Fee</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ color: '#57534e' }}>Paid</span>
            <span style={{ fontSize: '20px', fontWeight: '700', color: '#1a5f4a' }}>$27.50</span>
          </div>
        </div>

        {/* Action Buttons with Messaging (SRS 2.9) */}
       {/* Action Buttons with Messaging (SRS 2.9) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button onClick={() => setShowMessaging(true)} style={{ width: '100%', padding: '14px', background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>💬 Message Tutor</button>
          {/* Mark as Completed - For Tutor view (SRS 2.10.1) */}
          <button style={{ width: '100%', padding: '14px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>✓ Mark as Completed</button>
          {/* Leave Feedback - For Tutee after completion */}
          <button style={{ width: '100%', padding: '14px', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>⭐ Leave Feedback</button>
          <button style={{ width: '100%', padding: '14px', background: '#fff', color: '#1c1917', border: '1px solid #e7e5e4', borderRadius: '10px', fontWeight: '500', cursor: 'pointer' }}>📅 Reschedule</button>
          <button style={{ width: '100%', padding: '14px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', fontWeight: '500', cursor: 'pointer' }}>Cancel Session</button>
        </div>
      </div>
    </div>
  );

return (
    <>
      <DashboardLayout activeTab={activeTab} onTabChange={setActiveTab} badges={{ tutoring: 2, notifications: 2, chats: 3 }}>
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'learning' && <LearningTab />}
        {activeTab === 'tutoring' && <TutoringTab />}
        {activeTab === 'chats' && <ChatsTab />}
        {activeTab === 'notifications' && <NotificationsTab />}
      </DashboardLayout>
      {showDetailPanel && <DetailPanel />}
      {showDetailPanel && <div onClick={() => setShowDetailPanel(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 999 }}></div>}
      {showMessaging && <MessagingPanel />}
      {showMessaging && <div onClick={() => setShowMessaging(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 1000 }}></div>}
    </>
  );
};

export default Dashboard;
