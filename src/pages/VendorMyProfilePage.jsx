 /* src/components/vendor/pages/VendorMyProfilePage.jsx */
import VendorCard from "../components/cards/VendorCard.jsx";
import { useState } from "react";

// Icons
const EditIco = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const BackIco = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>;

export default function VendorMyProfilePage({ vendor, reviews }) {
  const [showBusinessInfo, setShowBusinessInfo] = useState(false);

  return (
    <div className="vd-section" style={{ maxWidth: '600px', margin: '0 auto' }}>
      
      {/* Header Section */}
      <div className="vd-section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {showBusinessInfo && (
            <button 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '6px', 
                padding: '6px 12px',
                borderRadius: '6px',
                border: '1px solid var(--border)',
                background: 'var(--white)',
                color: 'var(--text)',
                fontSize: '13px',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onClick={() => setShowBusinessInfo(false)}
            >
              <BackIco /> Back
            </button>
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: 'var(--text)' }}>
              {showBusinessInfo ? 'Business Information' : 'My Public Profile'}
            </h2>
            <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: 'var(--muted)' }}>
              {showBusinessInfo ? 'Detailed business information' : 'This is exactly how buyers see your business on the platform'}
            </p>
          </div>
        </div>
        <button 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '6px', 
            padding: '8px 16px',
            borderRadius: '8px',
            border: 'none',
            background: 'var(--primary)',
            color: 'white',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'all 0.2s'
          }}
          onClick={() => {/* Handle edit */}}
        >
          <EditIco /> Edit Profile
        </button>
      </div>

      {/* Content */}
      {!showBusinessInfo ? (
        /* Vendor Card View */
        <div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <VendorCard 
              vendor={vendor || {}} 
              onView={() => setShowBusinessInfo(true)} 
            />
          </div>
          <p style={{ 
            textAlign: 'center', 
            marginTop: '16px', 
            fontSize: '13px', 
            color: 'var(--muted)' 
          }}>
            Click on the card to view detailed business information
          </p>
        </div>
      ) : (
        /* Business Information View */
        <div>
          <div style={{ 
            background: 'var(--white)', 
            border: '1px solid var(--border)', 
            borderRadius: '12px', 
            padding: '32px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            maxWidth: '100%'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { label: 'Business Name', value: vendor?.name || vendor?.businessName || "Your Business Name" },
                { label: 'Category', value: vendor?.category || "Fashion" },
                { label: 'Social Handle', value: vendor?.socialMediaUrl || "@yourbusiness" },
                { label: 'Phone', value: vendor?.phone || "+237 XXX XXX XXX" },
                { label: 'Email', value: vendor?.email || "your@email.com" },
                { label: 'WhatsApp', value: vendor?.whatsapp || "+237 XXX XXX XXX" },
              ].map((item, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'flex-start',
                  padding: '20px 0',
                  borderBottom: index < 5 ? '1px solid var(--border)' : 'none'
                }}>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    color: 'var(--muted)',
                    minWidth: '140px',
                    flexShrink: 0
                  }}>
                    {item.label}
                  </div>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '500', 
                    color: item.value.includes('Your') || item.value.includes('your') || item.value.includes('XXX') ? 'var(--muted)' : 'var(--text)',
                    textAlign: 'left',
                    wordBreak: 'break-word',
                    flex: 1,
                    paddingLeft: '20px'
                  }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}