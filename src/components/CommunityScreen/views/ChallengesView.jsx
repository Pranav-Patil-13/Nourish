import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Users,
  Check,
  Award,
  Sparkles,
  Flame
} from 'lucide-react';
import { CHALLENGES_LIST } from '../data/communityData';

export function ChallengesView({ onBack }) {
  const [activeTab, setActiveTab] = useState('Active'); // 'Active' | 'Completed'
  const [challenges, setChallenges] = useState(CHALLENGES_LIST);

  const toggleJoin = (id) => {
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isJoined: !c.isJoined } : c))
    );
  };

  return (
    <div className="comm-challenges-view">
      {/* Header */}
      <header className="comm-challenges-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div className="challenges-header-text">
          <h1 className="comm-page-title">Challenges</h1>
        </div>
      </header>

      {/* Segmented Switcher: Active | Completed */}
      <div className="comm-challenges-tabs-row" role="tablist">
        {['Active', 'Completed'].map((tab) => (
          <button
            key={tab}
            type="button"
            className={`challenges-tab-pill ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
            role="tab"
            aria-selected={activeTab === tab}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="comm-challenges-scrollable">
        {challenges.map((ch) => (
          <div key={ch.id} className="comm-challenge-card">
            <div className="challenge-card-media-wrap">
              <img src={ch.image} alt={ch.title} className="challenge-cover-img" />
              <div className="challenge-media-overlay" />
              <span className="challenge-category-badge">{ch.category}</span>
            </div>

            <div className="challenge-card-details">
              <h2 className="challenge-title">{ch.title}</h2>
              <p className="challenge-desc">{ch.desc}</p>

              <div className="challenge-meta-row">
                <div className="meta-item">
                  <Calendar size={13} />
                  <span>{ch.dateRange}</span>
                </div>
                <div className="meta-item">
                  <Users size={13} />
                  <span>{ch.participantsCount}</span>
                </div>
              </div>

              <button
                type="button"
                className={`challenge-join-btn ${ch.isJoined ? 'joined' : ''}`}
                onClick={() => toggleJoin(ch.id)}
              >
                {ch.isJoined ? (
                  <>
                    <Check size={14} strokeWidth={3} />
                    <span>Joined</span>
                  </>
                ) : (
                  <span>Join Challenge</span>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChallengesView;
