import React from 'react';
import './BlogPage.css';

const BlogPage = () => {
  return (
    <div className="blog-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Блог</h1>
          <p className="page-subtitle">Статьи и новости о кофе и книгах</p>
        </div>
        
        <div className="blog-content">
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>Статьи скоро появятся</h3>
            <p>Мы готовим интересные материалы для наших читателей</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;