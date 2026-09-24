import React, { useState } from 'react';
import {
  X,
  Image,
  Utensils,
  Dumbbell,
  BarChart2,
  Plus,
  ChevronRight,
  MapPin,
  Flame,
  Globe,
  Award,
  CheckCircle2
} from 'lucide-react';
import riyaOatmealImg from '../../../assets/riya_oatmeal_bowl.jpg';
import plateScanImg from '../../../assets/scanner_food_plate.jpg';
import fitnessHeroImg from '../../../assets/fitness_hero_gym.jpg';

export function CreatePostModal({
  initialType = 'photo',
  onClose,
  onSubmitPost,
  onSwitchToPoll
}) {
  const [selectedType, setSelectedType] = useState(initialType);
  const [caption, setCaption] = useState('');
  const [selectedPhotos, setSelectedPhotos] = useState([riyaOatmealImg, plateScanImg]);
  const [location, setLocation] = useState('Nashik, India');
  const [visibility, setVisibility] = useState('Public');
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleSelectMode = (type) => {
    if (type === 'poll') {
      onSwitchToPoll();
      return;
    }
    setSelectedType(type);
  };

  const handlePost = () => {
    if (!caption.trim() && selectedPhotos.length === 0) return;
    onSubmitPost({
      caption,
      type: selectedType,
      image: selectedPhotos[0] || riyaOatmealImg,
      location
    });
  };

  return (
    <div className="comm-modal-backdrop" onClick={onClose}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="comm-action-toast">
          <CheckCircle2 size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="comm-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="comm-modal-header">
          <button
            type="button"
            className="comm-modal-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={19} strokeWidth={2.2} />
          </button>

          <h2 className="comm-modal-title">Create Post</h2>

          <button
            type="button"
            className="comm-modal-post-cta"
            onClick={handlePost}
            disabled={!caption.trim() && selectedPhotos.length === 0}
          >
            Post
          </button>
        </header>

        <div className="comm-modal-scrollable">
          {/* 4 Mode Selector Cards */}
          <div className="comm-type-selector-grid">
            <div
              className={`comm-type-card ${selectedType === 'photo' ? 'active' : ''}`}
              onClick={() => handleSelectMode('photo')}
            >
              <div className="type-icon-box photo"><Image size={18} /></div>
              <span className="type-card-label">Photo</span>
            </div>

            <div
              className={`comm-type-card ${selectedType === 'meal' ? 'active' : ''}`}
              onClick={() => handleSelectMode('meal')}
            >
              <div className="type-icon-box meal"><Utensils size={18} /></div>
              <span className="type-card-label">Meal</span>
            </div>

            <div
              className={`comm-type-card ${selectedType === 'workout' ? 'active' : ''}`}
              onClick={() => handleSelectMode('workout')}
            >
              <div className="type-icon-box workout"><Dumbbell size={18} /></div>
              <span className="type-card-label">Workout</span>
            </div>

            <div
              className="comm-type-card"
              onClick={() => handleSelectMode('poll')}
            >
              <div className="type-icon-box poll"><BarChart2 size={18} /></div>
              <span className="type-card-label">Poll</span>
            </div>
          </div>

          {/* Caption Textarea */}
          <div className="comm-caption-area-wrap">
            <textarea
              className="comm-caption-textarea"
              placeholder="Share your thoughts, healthy recipe tips, or workout wins..."
              rows={4}
              maxLength={500}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <span className="comm-char-counter">{caption.length}/500</span>
          </div>

          {/* Add Photos Section */}
          <section className="comm-form-section">
            <h3 className="comm-form-section-title">Add Photos</h3>
            <div className="comm-photo-preview-grid">
              {selectedPhotos.map((img, idx) => (
                <div key={idx} className="comm-photo-thumb-wrap">
                  <img src={img} alt="Upload preview" className="comm-photo-thumb" />
                  <button
                    type="button"
                    className="comm-photo-remove-btn"
                    onClick={() => setSelectedPhotos(selectedPhotos.filter((_, i) => i !== idx))}
                  >
                    <X size={12} strokeWidth={2.4} />
                  </button>
                </div>
              ))}

              <button
                type="button"
                className="comm-add-photo-btn"
                onClick={() => setSelectedPhotos([...selectedPhotos, fitnessHeroImg])}
                title="Add photo"
              >
                <Plus size={20} />
              </button>
            </div>
          </section>

          {/* Add Details Options List */}
          <section className="comm-form-section">
            <h3 className="comm-form-section-title">Add Details</h3>

            <div className="comm-detail-options-list">
              <div
                className="comm-detail-row"
                onClick={() => showToast('Food details attached')}
              >
                <div className="detail-icon-wrap"><Flame size={16} /></div>
                <span className="detail-row-label">Food details</span>
                <ChevronRight size={16} className="detail-chevron" />
              </div>

              <div
                className="comm-detail-row"
                onClick={() => showToast('Workout details attached')}
              >
                <div className="detail-icon-wrap"><Dumbbell size={16} /></div>
                <span className="detail-row-label">Workout details</span>
                <ChevronRight size={16} className="detail-chevron" />
              </div>

              <div
                className="comm-detail-row"
                onClick={() => showToast(`Location set to: ${location}`)}
              >
                <div className="detail-icon-wrap"><MapPin size={16} /></div>
                <div className="detail-text-col">
                  <span className="detail-row-label">Location (optional)</span>
                  <span className="detail-sub-val">{location}</span>
                </div>
                <ChevronRight size={16} className="detail-chevron" />
              </div>

              <div
                className="comm-detail-row"
                onClick={() => showToast('Linked to 21-Day Challenge!')}
              >
                <div className="detail-icon-wrap"><Award size={16} /></div>
                <span className="detail-row-label">Add to challenge</span>
                <ChevronRight size={16} className="detail-chevron" />
              </div>

              <div
                className="comm-detail-row"
                onClick={() => {
                  const nextVis = visibility === 'Public' ? 'Followers' : 'Public';
                  setVisibility(nextVis);
                  showToast(`Visibility set to: ${nextVis}`);
                }}
              >
                <div className="detail-icon-wrap"><Globe size={16} /></div>
                <div className="detail-text-col">
                  <span className="detail-row-label">Visibility</span>
                  <span className="detail-sub-val">{visibility}</span>
                </div>
                <ChevronRight size={16} className="detail-chevron" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default CreatePostModal;
