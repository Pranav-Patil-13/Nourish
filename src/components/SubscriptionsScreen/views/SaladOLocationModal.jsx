import React, { useState } from 'react';
import { X, Search, MapPin, Clock, Check } from 'lucide-react';
import { SALADO_OUTLETS, SALADO_CITIES } from '../data/subscriptionsData';

export function SaladOLocationModal({ currentOutlet, onSelectOutlet, onClose }) {
  const [selectedCity, setSelectedCity] = useState(currentOutlet?.city || 'Nashik');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOutlets = SALADO_OUTLETS.filter((outlet) => {
    const matchesCity = selectedCity === 'All' || outlet.city.toLowerCase() === selectedCity.toLowerCase();
    const matchesQuery = !searchQuery.trim() ||
      outlet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      outlet.pincode.includes(searchQuery.trim()) ||
      outlet.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  return (
    <div className="salado-modal-backdrop" onClick={onClose}>
      <div className="salado-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="salado-modal-header">
          <div className="salado-modal-title-wrap">
            <h2 className="salado-modal-title">Select SaladO Outlet</h2>
          </div>
          <button
            type="button"
            className="salado-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </header>

        {/* Search Input */}
        <div className="salado-search-wrap">
          <Search size={17} className="salado-search-icon" />
          <input
            type="text"
            className="salado-search-input"
            placeholder="Search by area, pincode or outlet name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              type="button"
              className="salado-search-clear"
              onClick={() => setSearchQuery('')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* City Filter Chips */}
        <div className="salado-cities-row">
          <button
            type="button"
            className={`salado-city-chip ${selectedCity === 'All' ? 'active' : ''}`}
            onClick={() => setSelectedCity('All')}
          >
            All Outlets
          </button>
          {SALADO_CITIES.map((city) => (
            <button
              type="button"
              key={city}
              className={`salado-city-chip ${selectedCity === city ? 'active' : ''}`}
              onClick={() => setSelectedCity(city)}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Outlets Listing */}
        <div className="salado-outlets-list">
          {filteredOutlets.length > 0 ? (
            filteredOutlets.map((outlet) => {
              const isSelected = currentOutlet?.id === outlet.id;
              return (
                <div
                  key={outlet.id}
                  className={`salado-outlet-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => {
                    onSelectOutlet(outlet);
                    onClose();
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="salado-outlet-card-info">
                    <div className="salado-outlet-card-top">
                      <h4 className="salado-outlet-card-name">{outlet.name}</h4>
                      {isSelected && (
                        <span className="salado-outlet-check-badge">
                          <Check size={13} strokeWidth={2.5} />
                        </span>
                      )}
                    </div>
                    <p className="salado-outlet-card-addr">{outlet.address}</p>
                    <div className="salado-outlet-card-meta">
                      <span className="salado-meta-item">
                        <MapPin size={12} className="meta-icon" /> {outlet.distance}
                      </span>
                      <span className="salado-meta-dot">·</span>
                      <span className="salado-meta-item">
                        <Clock size={12} className="meta-icon" /> {outlet.deliveryTime}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="salado-empty-outlets">
              <MapPin size={32} className="salado-empty-icon" />
              <p className="salado-empty-title">No SaladO outlet in this area yet</p>
              <p className="salado-empty-desc">
                We are actively expanding across India. Try selecting Nashik, Pune, Mumbai, or Bengaluru.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SaladOLocationModal;
