import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = ({ reviews, onReviewSubmit, onReviewAdded }) => {
  const [showForm, setShowForm] = useState(false);
  const [newReview, setNewReview] = useState({
    authorName: '',
    text: '',
    rating: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onReviewSubmit(newReview);
      setNewReview({ authorName: '', text: '', rating: 5 });
      setShowForm(false);
      onReviewAdded();
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const approvedReviews = reviews.filter(review => review.status === 'approved');

  return (
    <section className="testimonials-section">
      <div className="container">
        <h2 className="section-title">Отзывы наших гостей</h2>
        
        <div className="reviews-grid">
          {approvedReviews.map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="review-author">
                  <span className="author-avatar">
                    {review.authorName.charAt(0).toUpperCase()}
                  </span>
                  <div>
                    <span className="author-name">{review.authorName}</span>
                    <div className="review-rating">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </div>
                  </div>
                </div>
                <span className="review-date">
                  {new Date(review.createdAt).toLocaleDateString('ru-RU')}
                </span>
              </div>
              <p className="review-text">"{review.text}"</p>
            </div>
          ))}
        </div>

        <div className="testimonials-actions">
          <button 
            className="btn btn-secondary"
            onClick={() => setShowForm(true)}
          >
            Оставить отзыв
          </button>
        </div>

        {showForm && (
          <div className="review-form-overlay">
            <div className="review-form-modal">
              <div className="modal-header">
                <h3>Оставить отзыв</h3>
                <button 
                  className="close-btn"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>
              </div>
              
              <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                  <label htmlFor="authorName">Ваше имя *</label>
                  <input
                    type="text"
                    id="authorName"
                    value={newReview.authorName}
                    onChange={(e) => setNewReview(prev => ({
                      ...prev, authorName: e.target.value
                    }))}
                    required
                    placeholder="Как к вам обращаться?"
                  />
                </div>

                <div className="form-group">
                  <label>Оценка *</label>
                  <div className="rating-select">
                    {[1, 2, 3, 4, 5].map(rating => (
                      <button
                        key={rating}
                        type="button"
                        className={`rating-star ${rating <= newReview.rating ? 'active' : ''}`}
                        onClick={() => setNewReview(prev => ({
                          ...prev, rating
                        }))}
                      >
                        ★
                      </button>
                    ))}
                    <span className="rating-text">
                      {newReview.rating} {newReview.rating === 1 ? 'звезда' : 
                       newReview.rating < 5 ? 'звезды' : 'звёзд'}
                    </span>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="reviewText">Ваш отзыв *</label>
                  <textarea
                    id="reviewText"
                    rows="5"
                    value={newReview.text}
                    onChange={(e) => setNewReview(prev => ({
                      ...prev, text: e.target.value
                    }))}
                    required
                    placeholder="Поделитесь вашими впечатлениями о кофейне..."
                  />
                </div>

                <div className="form-actions">
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Отправка...' : 'Отправить отзыв'}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => setShowForm(false)}
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;