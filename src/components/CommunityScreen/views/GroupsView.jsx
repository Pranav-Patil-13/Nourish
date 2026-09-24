import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Check,
  ChevronRight,
  MapPin,
  Sparkles
} from 'lucide-react';
import { GROUPS_LIST } from '../data/communityData';

const GROUPS_FILTER_CHIPS = ['All', 'Nearby', 'Interests'];

export function GroupsView({ onBack, onSelectGroup }) {
  const [activeChip, setActiveChip] = useState('All');
  const [groups, setGroups] = useState(GROUPS_LIST);

  const toggleGroupJoin = (e, id) => {
    e.stopPropagation();
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, isJoined: !g.isJoined } : g))
    );
  };

  const filteredGroups = activeChip === 'All'
    ? groups
    : groups.filter((g) => g.category.toLowerCase() === activeChip.toLowerCase());

  return (
    <div className="comm-groups-view">
      {/* Header */}
      <header className="comm-groups-header">
        <button
          type="button"
          className="sub-back-circle-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft size={19} strokeWidth={2.2} />
        </button>

        <div className="groups-header-text">
          <h1 className="comm-page-title">Groups</h1>
        </div>
      </header>

      {/* Filter Chips Scroller */}
      <div className="comm-groups-chips-row" role="tablist">
        {GROUPS_FILTER_CHIPS.map((chip) => (
          <button
            key={chip}
            type="button"
            className={`comm-groups-chip ${activeChip === chip ? 'active' : ''}`}
            onClick={() => setActiveChip(chip)}
            role="tab"
            aria-selected={activeChip === chip}
          >
            {chip}
          </button>
        ))}
      </div>

      <div className="comm-groups-scrollable">
        {filteredGroups.map((group) => (
          <div
            key={group.id}
            className="comm-group-card"
            onClick={() => onSelectGroup(group)}
            role="button"
            tabIndex={0}
          >
            <div className="group-card-thumb-wrap">
              <img src={group.coverImage} alt={group.name} className="group-card-thumb" />
            </div>

            <div className="group-card-info">
              <h2 className="group-card-name">{group.name}</h2>
              <span className="group-card-members">{group.membersCount}</span>
              <p className="group-card-desc">{group.description}</p>
            </div>

            <button
              type="button"
              className={`group-join-btn ${group.isJoined ? 'joined' : ''}`}
              onClick={(e) => toggleGroupJoin(e, group.id)}
            >
              {group.isJoined ? (
                <>
                  <Check size={12} strokeWidth={3} />
                  <span>Joined</span>
                </>
              ) : (
                <span>Join</span>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GroupsView;
