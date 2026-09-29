import React, { useState } from 'react';
import {
  X,
  Image as ImageIcon,
  BarChart2,
  MapPin,
  Globe,
  Users,
  CheckCircle2
} from 'lucide-react';
import riyaAvatarImg from '../../../assets/riya_avatar.jpg';
import riyaOatmealImg from '../../../assets/riya_oatmeal_bowl.jpg';
import plateScanImg from '../../../assets/scanner_food_plate.jpg';

export function CreatePostModal({
  initialType = 'photo',
  onClose,
  onSubmitPost,
  onSwitchToPoll
}) {
  const [caption, setCaption] = useState('');
  const [attachedPhoto, setAttachedPhoto] = useState(null); // Clean text-only default
  const [attachedLocation, setAttachedLocation] = useState(null);
  const [visibility, setVisibility] = useState('Public'); // 'Public' | 'Followers'
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2000);
  };

  const handleTogglePhoto = () => {
    if (attachedPhoto) {
      setAttachedPhoto(null);
      showToast('Photo removed');
    } else {
      setAttachedPhoto(riyaOatmealImg);
      showToast('Photo attached');
    }
  };

  const handleToggleLocation = () => {
    if (attachedLocation) {
      setAttachedLocation(null);
      showToast('Location removed');
    } else {
      setAttachedLocation('Nashik, India');
      showToast('Location added');
    }
  };

  const handlePost = () => {
    if (!caption.trim() && !attachedPhoto) return;
    onSubmitPost({
      caption,
      type: attachedPhoto ? 'photo' : 'text',
      image: attachedPhoto,
      location: attachedLocation
    });
  };

  const canPost = caption.trim().length > 0 || attachedPhoto !== null;

  return (
    <>
      {/* Dim backdrop (click to close) */}
      <div className="comm-modal-backdrop" onClick={onClose} />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="comm-action-toast">
          <CheckCircle2 size={16} color="#10B981" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sheet — anchored at bottom, expands upward from nav bar position */}
      <div className="comm-composer-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <header className="comm-composer-header">
          <button
            type="button"
            className="comm-composer-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <h2 className="comm-composer-title">New Post</h2>

          <button
            type="button"
            className="comm-composer-post-btn"
            onClick={handlePost}
            disabled={!canPost}
          >
            Post
          </button>
        </header>

        {/* Composer Main Content Area */}
        <div className="comm-composer-body">
          {/* Author Identity Row */}
          <div className="comm-composer-author-row">
            <img src={riyaAvatarImg} alt="Riya Sharma" className="comm-composer-avatar" />
            <div className="comm-composer-author-info">
              <span className="comm-composer-name">Riya Sharma</span>
              <button
                type="button"
                className="comm-composer-visibility-pill"
                onClick={() => {
                  const nextVis = visibility === 'Public' ? 'Followers' : 'Public';
                  setVisibility(nextVis);
                  showToast(`Visible to: ${nextVis}`);
                }}
              >
                {visibility === 'Public' ? <Globe size={11} /> : <Users size={11} />}
                <span>{visibility}</span>
                <span className="visibility-caret">▾</span>
              </button>
            </div>
          </div>

          {/* Hero Photo Preview — shown FIRST before the text input */}
          {attachedPhoto && (
            <div className="comm-composer-photo-preview-wrap">
              <img src={attachedPhoto} alt="Attachment Preview" className="comm-composer-photo-img" />
              <button
                type="button"
                className="comm-composer-photo-close-btn"
                onClick={() => setAttachedPhoto(null)}
                title="Remove photo"
                aria-label="Remove photo"
              >
                <X size={14} strokeWidth={2.4} />
              </button>
            </div>
          )}

          {/* Caption Text Input Area */}
          <div className="comm-composer-input-wrap">
            <textarea
              className="comm-composer-textarea"
              placeholder={attachedPhoto ? "Add a caption…" : "What's on your mind today, Riya?"}
              rows={attachedPhoto ? 2 : 4}
              maxLength={500}
              autoFocus
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
          </div>
        </div>


        {/* Bottom Attachment Action Toolbar */}
        <footer className="comm-composer-footer-bar">
          <div className="comm-composer-tool-icons">
            {/* 1. Photo Attachment Toggle */}
            <button
              type="button"
              className={`comm-tool-icon-btn ${attachedPhoto ? 'active' : ''}`}
              onClick={handleTogglePhoto}
              title="Attach Photo"
              aria-label="Attach Photo"
            >
              <ImageIcon size={19} />
            </button>

            {/* 2. Poll Option */}
            <button
              type="button"
              className="comm-tool-icon-btn"
              onClick={onSwitchToPoll}
              title="Create Poll"
              aria-label="Create Poll"
            >
              <BarChart2 size={19} />
            </button>

            {/* 3. Location Tag Toggle */}
            <button
              type="button"
              className={`comm-tool-icon-btn ${attachedLocation ? 'active' : ''}`}
              onClick={handleToggleLocation}
              title="Attach Location"
              aria-label="Attach Location"
            >
              <MapPin size={19} />
            </button>
          </div>

          <div className="comm-composer-footer-right">
            <span className="comm-composer-char-count">{caption.length}/500</span>
          </div>
        </footer>
      </div>
    </>
  );
}

export default CreatePostModal;
