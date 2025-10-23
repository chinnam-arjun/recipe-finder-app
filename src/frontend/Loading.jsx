import React from 'react';
import '../styles/Loading.css';

const SkeletonCard = () => (
  <div className="skeleton-card" aria-hidden>
    <div className="skeleton-image" />
    <div className="skeleton-title" />
  </div>
);

const Loading = ({ count = 8, message = 'Loading recipes...' }) => {
  return (
    <div className="loading-root">
      <div className="loading-header">
        <div className="spinner" aria-hidden />
        <div className="loading-message">{message}</div>
      </div>

      <div className="skeleton-grid" role="status" aria-live="polite">
        {Array.from({ length: count }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
};

export default Loading;
