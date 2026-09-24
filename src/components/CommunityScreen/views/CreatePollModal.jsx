import React, { useState } from 'react';
import { X, Plus, Trash2, Check, Clock, ShieldCheck, ListPlus } from 'lucide-react';

export default function CreatePollModal({ onClose, onSubmitPoll }) {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([
    { id: '1', text: '' },
    { id: '2', text: '' }
  ]);
  const [duration, setDuration] = useState('3 days');
  const [allowMultiple, setAllowMultiple] = useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleAddOption = () => {
    if (options.length < 5) {
      setOptions([...options, { id: String(Date.now()), text: '' }]);
    }
  };

  const handleRemoveOption = (indexToRemove) => {
    if (options.length > 2) {
      setOptions(options.filter((_, idx) => idx !== indexToRemove));
    }
  };

  const handleOptionChange = (text, index) => {
    const updated = [...options];
    updated[index].text = text;
    setOptions(updated);
  };

  const isFormValid =
    question.trim().length > 3 &&
    options.filter((opt) => opt.text.trim().length > 0).length >= 2;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    const pollData = {
      id: `poll-${Date.now()}`,
      question: question.trim(),
      options: options.filter((o) => o.text.trim().length > 0),
      duration,
      allowMultiple,
      isAnonymous,
      createdAt: new Date().toISOString()
    };
    if (onSubmitPoll) {
      onSubmitPoll(pollData);
    }
    onClose();
  };

  return (
    <div className="comm-modal-overlay" onClick={onClose}>
      <div className="comm-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="comm-modal-header">
          <button
            type="button"
            className="comm-icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <h3 className="comm-modal-title">Create Poll</h3>
          <button
            type="button"
            className={`comm-header-action-btn ${isFormValid ? 'active' : 'disabled'}`}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Post
          </button>
        </div>

        {/* Modal Body */}
        <div className="comm-modal-body">
          {/* Question Input */}
          <div className="comm-form-group">
            <label className="comm-form-label">Poll Question</label>
            <textarea
              className="comm-poll-textarea"
              placeholder="Ask the community a question (e.g. Best source of plant protein?)..."
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={3}
              maxLength={200}
            />
            <div className="comm-char-count">{question.length}/200</div>
          </div>

          {/* Dynamic Options List */}
          <div className="comm-form-group">
            <label className="comm-form-label">Options</label>
            <div className="comm-poll-options-list">
              {options.map((opt, idx) => (
                <div key={opt.id} className="comm-poll-option-row">
                  <span className="comm-poll-option-idx">{idx + 1}</span>
                  <input
                    type="text"
                    className="comm-poll-option-input"
                    placeholder={`Option ${idx + 1}`}
                    value={opt.text}
                    onChange={(e) => handleOptionChange(e.target.value, idx)}
                    maxLength={60}
                  />
                  {options.length > 2 && (
                    <button
                      type="button"
                      className="comm-poll-remove-btn"
                      onClick={() => handleRemoveOption(idx)}
                      aria-label="Remove option"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {options.length < 5 && (
              <button
                type="button"
                className="comm-poll-add-btn"
                onClick={handleAddOption}
              >
                <Plus size={16} /> Add Option
              </button>
            )}
          </div>

          {/* Poll Settings */}
          <div className="comm-poll-settings-card">
            <div className="comm-poll-setting-row">
              <div className="comm-poll-setting-info">
                <Clock size={18} className="comm-setting-icon" />
                <div>
                  <div className="comm-setting-title">Poll Duration</div>
                  <div className="comm-setting-sub">How long the poll stays open</div>
                </div>
              </div>
              <select
                className="comm-poll-select"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                <option value="1 day">1 day</option>
                <option value="3 days">3 days</option>
                <option value="7 days">7 days</option>
                <option value="2 weeks">2 weeks</option>
              </select>
            </div>

            <div className="comm-poll-setting-row">
              <div className="comm-poll-setting-info">
                <ListPlus size={18} className="comm-setting-icon" />
                <div>
                  <div className="comm-setting-title">Multiple Answers</div>
                  <div className="comm-setting-sub">Voters can pick more than one</div>
                </div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${allowMultiple ? 'active' : ''}`}
                onClick={() => setAllowMultiple(!allowMultiple)}
                aria-label="Toggle multiple answers"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>

            <div className="comm-poll-setting-row">
              <div className="comm-poll-setting-info">
                <ShieldCheck size={18} className="comm-setting-icon" />
                <div>
                  <div className="comm-setting-title">Anonymous Voting</div>
                  <div className="comm-setting-sub">Hide voter names from results</div>
                </div>
              </div>
              <button
                type="button"
                className={`comm-toggle-switch ${isAnonymous ? 'active' : ''}`}
                onClick={() => setIsAnonymous(!isAnonymous)}
                aria-label="Toggle anonymous voting"
              >
                <span className="comm-toggle-slider" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="comm-modal-footer">
          <button
            type="button"
            className="comm-primary-btn"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            <Check size={18} /> Publish Poll
          </button>
        </div>
      </div>
    </div>
  );
}
