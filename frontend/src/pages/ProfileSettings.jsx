import React, { useState } from 'react';

// ============================================================
// SECTION 6: PROFILE & SETTINGS PAGE (UPDATED)
// Changes per SRS:
// - Language preference (2.1.1.3)
// - Planning area with "Other" (2.1.1.4)
// - School from predefined list with "Other" (2.1.1.4)
// - Tutor Mode toggle (2.2.2.9)
// - Accessibility accommodation (2.2.2.7)
// ============================================================

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [showOtherArea, setShowOtherArea] = useState(false);
  const [showOtherSchool, setShowOtherSchool] = useState(false);
  const [tutorModeActive, setTutorModeActive] = useState(true);

  const NavHeader = () => (
    <header style={{ background: 'linear-gradient(135deg, #1a5f4a 0%, #0d3d2e 100%)', padding: '0 32px', height: '72px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', background: '#f59e0b', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '20px' }}>P</div>
        <span style={{ color: '#fff', fontSize: '22px', fontWeight: '700' }}>PeerLearn</span>
      </div>
      <nav style={{ display: 'flex', gap: '8px' }}>
        {['🏠 Dashboard', '🎓 Get Help', '💡 Offer Help'].map((item, i) => (
          <button key={i} style={{ background: 'transparent', border: 'none', padding: '10px 20px', borderRadius: '8px', color: '#fff', fontSize: '15px', fontWeight: '500', cursor: 'pointer' }}>{item}</button>
        ))}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: '44px', height: '44px', borderRadius: '10px', cursor: 'pointer', fontSize: '20px' }}>🔔</button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.2)', padding: '6px 14px 6px 6px', borderRadius: '10px' }}>
          <div style={{ width: '34px', height: '34px', background: '#f59e0b', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '14px' }}>JD</div>
          <span style={{ color: '#fff', fontSize: '14px', fontWeight: '500' }}>John Doe</span>
        </div>
      </div>
    </header>
  );

  const PageHeader = () => (
    <div style={{ background: '#fff', borderBottom: '1px solid #e7e5e4' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 24px 0' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#1c1917', marginBottom: '8px' }}>Settings</h1>
        <p style={{ color: '#57534e', marginBottom: '24px' }}>Manage your account and preferences</p>
        <div style={{ display: 'flex', gap: '0' }}>
          {[{ id: 'profile', label: '👤 Profile' }, { id: 'tutor', label: '🎓 Tutor Settings' }, { id: 'preferences', label: '⚙️ Preferences' }, { id: 'account', label: '🔐 Account' }].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ background: 'transparent', border: 'none', padding: '16px 24px', fontSize: '15px', fontWeight: activeTab === tab.id ? '600' : '500', color: activeTab === tab.id ? '#1a5f4a' : '#57534e', cursor: 'pointer', borderBottom: activeTab === tab.id ? '3px solid #1a5f4a' : '3px solid transparent' }}>{tab.label}</button>
          ))}
        </div>
      </div>
    </div>
  );

  // Profile Tab (Updated with language, "Other" options)
  const ProfileTab = () => (
    <div>
      {/* Profile Picture */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '32px', padding: '24px', background: '#f5f5f4', borderRadius: '16px' }}>
        <div style={{ width: '100px', height: '100px', background: '#f59e0b', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold', fontSize: '36px' }}>JD</div>
        <div>
          <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '8px' }}>Profile Photo</h3>
          <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '12px' }}>JPG or PNG. Max 2MB.</p>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button style={{ padding: '10px 20px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Upload Photo</button>
            <button style={{ padding: '10px 20px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '8px', fontWeight: '500', cursor: 'pointer' }}>Remove</button>
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Full Name <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="text" defaultValue="John Doe" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box' }} />
          <p style={{ fontSize: '12px', color: '#a8a29e', marginTop: '4px' }}>1-100 characters</p>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Email Address <span style={{ color: '#ef4444' }}>*</span></label>
          <input type="email" defaultValue="john.doe@school.edu.sg" disabled style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', background: '#f5f5f4', color: '#a8a29e' }} />
          <p style={{ fontSize: '12px', color: '#a8a29e', marginTop: '4px' }}>Verified ✓</p>
        </div>
      </div>

      {/* Language Preference (SRS 2.1.1.3) */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Preferred Language <span style={{ color: '#ef4444' }}>*</span></label>
        <select style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', background: '#fff' }}>
          <option value="en">English</option>
          <option value="zh">Chinese (中文)</option>
          <option value="ms">Malay (Bahasa Melayu)</option>
          <option value="ta">Tamil (தமிழ்)</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
        {/* Planning Area with "Other" (SRS 2.1.1.4) */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Planning Area <span style={{ color: '#ef4444' }}>*</span></label>
          <select onChange={(e) => setShowOtherArea(e.target.value === 'other')} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', background: '#fff' }}>
            <option>Clementi</option>
            <option>Jurong East</option>
            <option>Jurong West</option>
            <option>Bukit Batok</option>
            <option>Woodlands</option>
            <option>Tampines</option>
            <option value="other">Other (specify below)</option>
          </select>
          {showOtherArea && <input type="text" placeholder="Enter planning area (1-100 chars)" maxLength={100} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', marginTop: '10px' }} />}
        </div>

        {/* School with "Other" (SRS 2.1.1.4) */}
        <div>
          <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>School / Institution</label>
          <select onChange={(e) => setShowOtherSchool(e.target.value === 'other')} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', background: '#fff' }}>
            <option>Nanyang Technological University (NTU)</option>
            <option>National University of Singapore (NUS)</option>
            <option>Singapore Management University (SMU)</option>
            <option>Singapore Polytechnic</option>
            <option>Ngee Ann Polytechnic</option>
            <option value="other">Other (specify below)</option>
          </select>
          {showOtherSchool && <input type="text" placeholder="Enter school (1-100 chars)" maxLength={100} style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', marginTop: '10px' }} />}
        </div>
      </div>

      {/* Accessibility Needs */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1c1917' }}>Accessibility Needs <span style={{ fontWeight: '400', color: '#a8a29e' }}>(optional)</span></label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {['Wheelchair accessible venues', 'Ground floor / lift access required', 'Hearing assistance needed', 'Visual assistance needed'].map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked={i === 0} style={{ width: '20px', height: '20px', accentColor: '#1a5f4a' }} />
              <span style={{ fontSize: '14px', color: '#57534e' }}>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      <button style={{ padding: '14px 32px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>Save Changes</button>
    </div>
  );

  // Tutor Settings Tab (Updated with Mode toggle, accessibility accommodation)
  const TutorTab = () => (
    <div>
      {/* Tutor Mode Toggle (SRS 2.2.2.9) */}
      <div style={{ background: tutorModeActive ? '#f0fdf4' : '#f5f5f4', border: `1px solid ${tutorModeActive ? '#bbf7d0' : '#e7e5e4'}`, borderRadius: '16px', padding: '20px 24px', marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '32px' }}>🎓</div>
          <div>
            <div style={{ fontWeight: '600', color: tutorModeActive ? '#166534' : '#57534e', fontSize: '16px' }}>{tutorModeActive ? 'Tutor Mode Active' : 'Tutor Mode Inactive'}</div>
            <div style={{ fontSize: '14px', color: '#57534e' }}>{tutorModeActive ? "You're visible to students looking for help" : "You won't appear in tutor recommendations until reactivated"}</div>
          </div>
        </div>
        <div onClick={() => setTutorModeActive(!tutorModeActive)} style={{ width: '50px', height: '28px', background: tutorModeActive ? '#22c55e' : '#e7e5e4', borderRadius: '14px', position: 'relative', cursor: 'pointer' }}>
          <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: tutorModeActive ? 'auto' : '2px', right: tutorModeActive ? '2px' : 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        {[{ label: 'Rating', value: '⭐ 4.8', sub: 'from 15 reviews' }, { label: 'Sessions', value: '24', sub: 'completed' }, { label: 'This Week', value: '2/5 hrs', sub: 'max: 5 hours' }, { label: 'Reliability', value: '98%', sub: 'completion rate' }].map((stat, i) => (
          <div key={i} style={{ background: '#f5f5f4', borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '13px', color: '#57534e', marginBottom: '4px' }}>{stat.label}</div>
            <div style={{ fontSize: '24px', fontWeight: '700', color: '#1c1917' }}>{stat.value}</div>
            <div style={{ fontSize: '12px', color: '#a8a29e' }}>{stat.sub}</div>
          </div>
        ))}
      </div>

      {/* Subjects & Topics */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#1c1917' }}>Subjects & Topics</label>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#1a5f4a', fontWeight: '500' }}>+ Edit Topics</button>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['Mathematics', 'Calculus', 'Integration', 'Differentiation', 'Linear Algebra'].map(topic => (
            <span key={topic} style={{ background: '#f5f5f4', padding: '8px 14px', borderRadius: '8px', fontSize: '14px', color: '#57534e' }}>{topic}</span>
          ))}
        </div>
      </div>

      {/* Max Hours (SRS 2.2.2.6) */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1c1917' }}>Maximum hours per week</label>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {['2 hrs', '3 hrs', '5 hrs', '8 hrs', '10 hrs', '15 hrs', '20 hrs'].map((hrs, i) => (
            <button key={hrs} style={{ padding: '12px 20px', background: i === 2 ? '#1a5f4a' : '#fff', color: i === 2 ? '#fff' : '#57534e', border: `2px solid ${i === 2 ? '#1a5f4a' : '#e7e5e4'}`, borderRadius: '10px', cursor: 'pointer', fontWeight: '500' }}>{hrs}</button>
          ))}
        </div>
      </div>

      {/* Preferred Areas */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '12px', color: '#1c1917' }}>Preferred tutoring areas</label>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
          {['Clementi', 'Jurong East', 'Jurong West', 'Bukit Batok', 'Queenstown', 'Other'].map((area, i) => (
            <button key={area} style={{ padding: '10px 16px', background: i < 2 ? '#1a5f4a' : '#fff', color: i < 2 ? '#fff' : '#57534e', border: `1px solid ${i < 2 ? '#1a5f4a' : '#e7e5e4'}`, borderRadius: '8px', cursor: 'pointer', fontWeight: '500' }}>{i < 2 && '✓ '}{area}</button>
          ))}
        </div>
      </div>

      {/* Accessibility Accommodation (SRS 2.2.2.7) */}
      <div style={{ marginBottom: '32px' }}>
        <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>
          Accessibility Accommodation
          <span style={{ fontWeight: '400', color: '#a8a29e', marginLeft: '8px' }}>(optional, 1-100 chars)</span>
        </label>
        <p style={{ fontSize: '13px', color: '#a8a29e', marginBottom: '12px' }}>Indicate if you can cater to tutees with accessibility needs.</p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '12px' }}>
          {['I can accommodate wheelchair users', 'I can use hearing assistance devices', 'I am flexible with venue accessibility requirements'].map((opt, i) => (
            <label key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked={i === 2} style={{ width: '20px', height: '20px', accentColor: '#1a5f4a' }} />
              <span style={{ fontSize: '14px', color: '#57534e' }}>{opt}</span>
            </label>
          ))}
        </div>
        <textarea rows={2} maxLength={100} placeholder="Additional notes (1-100 characters)" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box', resize: 'vertical', fontFamily: 'inherit' }} />
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#a8a29e', marginTop: '4px' }}>0 / 100</div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <button style={{ padding: '14px 24px', background: '#fff', color: '#1a5f4a', border: '2px solid #1a5f4a', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>📅 Edit Availability</button>
        <button style={{ padding: '14px 32px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
      </div>
    </div>
  );

  // Preferences Tab
  const PreferencesTab = () => (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '16px' }}>🔔 Notifications</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Email notifications for new session requests', checked: true },
            { label: 'Email notifications for session reminders', checked: true },
            { label: 'Email notifications for feedback received', checked: false },
            { label: 'Push notifications (browser)', checked: true },
          ].map((pref, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f5f5f4', borderRadius: '10px' }}>
              <span style={{ fontSize: '14px', color: '#1c1917' }}>{pref.label}</span>
              <div style={{ width: '50px', height: '28px', background: pref.checked ? '#22c55e' : '#e7e5e4', borderRadius: '14px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: pref.checked ? 'auto' : '2px', right: pref.checked ? '2px' : 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '16px' }}>🔒 Privacy</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { label: 'Show my full name to other users', checked: true },
            { label: 'Show my school/institution', checked: true },
            { label: 'Show my tutor rating publicly', checked: true },
            { label: 'Allow students to message me before booking', checked: true },
          ].map((pref, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f5f5f4', borderRadius: '10px' }}>
              <span style={{ fontSize: '14px', color: '#1c1917' }}>{pref.label}</span>
              <div style={{ width: '50px', height: '28px', background: pref.checked ? '#22c55e' : '#e7e5e4', borderRadius: '14px', position: 'relative', cursor: 'pointer' }}>
                <div style={{ width: '24px', height: '24px', background: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: pref.checked ? 'auto' : '2px', right: pref.checked ? '2px' : 'auto', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button style={{ padding: '14px 32px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Save Preferences</button>
    </div>
  );

  // Account Tab
  const AccountTab = () => (
    <div>
      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '16px' }}>🔐 Change Password</h3>
        <div style={{ maxWidth: '400px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Current Password</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>New Password</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box' }} />
            <div style={{ marginTop: '8px', fontSize: '12px', color: '#57534e' }}>
              <p style={{ marginBottom: '4px' }}>Password must contain:</p>
              <ul style={{ margin: 0, paddingLeft: '16px', lineHeight: '1.6' }}>
                <li>At least 8 characters</li>
                <li>At least 1 uppercase letter</li>
                <li>At least 1 lowercase letter</li>
                <li>At least 1 number or symbol</li>
              </ul>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: '#1c1917' }}>Confirm New Password</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%', padding: '14px 16px', borderRadius: '10px', border: '1px solid #e7e5e4', fontSize: '15px', boxSizing: 'border-box' }} />
          </div>
          <button style={{ padding: '12px 24px', background: '#1a5f4a', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Update Password</button>
        </div>
      </div>

      <div style={{ marginBottom: '40px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1c1917', marginBottom: '16px' }}>🔗 Connected Accounts</h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px', background: '#f5f5f4', borderRadius: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '24px' }}>🔵</span>
            <div>
              <div style={{ fontWeight: '600', color: '#1c1917' }}>Google</div>
              <div style={{ fontSize: '13px', color: '#57534e' }}>john.doe@gmail.com</div>
            </div>
          </div>
          <button style={{ padding: '8px 16px', background: '#fff', border: '1px solid #e7e5e4', borderRadius: '8px', fontSize: '13px', cursor: 'pointer', color: '#ef4444' }}>Disconnect</button>
        </div>
      </div>

      <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '16px', padding: '24px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#ef4444', marginBottom: '8px' }}>⚠️ Danger Zone</h3>
        <p style={{ fontSize: '14px', color: '#57534e', marginBottom: '16px' }}>Once you delete your account, there is no going back.</p>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ padding: '12px 24px', background: '#fff', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '10px', fontWeight: '500', cursor: 'pointer' }}>Deactivate Account</button>
          <button style={{ padding: '12px 24px', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}>Delete Account</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#fafaf9', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <NavHeader />
      <PageHeader />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>
        {activeTab === 'profile' && <ProfileTab />}
        {activeTab === 'tutor' && <TutorTab />}
        {activeTab === 'preferences' && <PreferencesTab />}
        {activeTab === 'account' && <AccountTab />}
      </div>
    </div>
  );
};

export default ProfileSettings;
