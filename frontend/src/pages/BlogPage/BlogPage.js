import React, { useState, useEffect } from 'react';
import './BlogPage.css';

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки данных
    setTimeout(() => {
      setPosts([
        {
          id: 1,
          title: "Искусство латте-арта: от базовых техник к сложным рисункам",
          excerpt: "Рассказываем о том, как создавать красивые рисунки на кофе и какие инструменты для этого нужны...",
          date: "2024-01-20",
          author: "Анна, бариста",
          category: "Кофе",
          readTime: "5 мин",
          image: "/api/placeholder/400/250"
        },
        {
          id: 2,
          title: "Топ-10 книг для чтения за чашкой кофе",
          excerpt: "Подборка книг, которые идеально подходят для неспешного чтения в уютной кофейне...",
          date: "2024-01-15",
          author: "Максим, библиотекарь",
          category: "Книги",
          readTime: "7 мин",
          image: "/api/placeholder/400/250"
        },
        {
          id: 3,
          title: "История кофе: от эфиопских пастухов до современных бариста",
          excerpt: "Путешествие сквозь века: как кофе завоевал мир и стал частью нашей культуры...",
          date: "2024-01-10",
          author: "Ирина, историк",
          category: "История",
          readTime: "10 мин",
          image: "/api/placeholder/400/250"
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return <div className="loading">Загрузка статей...</div>;
  }

  return (
    <div className="blog-page">
      <div className="container">
        <div className="blog-header">
          <h1 className="page-title">Блог кофейни</h1>
          <p className="page-subtitle">Статьи о кофе, книгах и уютной атмосфере</p>
        </div>

        <div className="blog-content">
          <div className="posts-grid">
            {posts.map(post => (
              <article key={post.id} className="post-card">
                <div className="post-image">
                  <div className="image-placeholder">
                    <span>{post.title}</span>
                  </div>
                  <div className="post-category">{post.category}</div>
                </div>
                <div className="post-content">
                  <div className="post-meta">
                    <span className="post-date">
                      {new Date(post.date).toLocaleDateString('ru-RU')}
                    </span>
                    <span className="post-read-time">{post.readTime}</span>
                  </div>
                  <h2 className="post-title">{post.title}</h2>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-footer">
                    <span className="post-author">Автор: {post.author}</span>
                    <button className="read-more-btn">Читать далее</button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <aside className="blog-sidebar">
            <div className="sidebar-widget">
              <h3>Категории</h3>
              <ul className="categories-list">
                <li><a href="#">Кофе</a></li>
                <li><a href="#">Книги</a></li>
                <li><a href="#">Рецепты</a></li>
                <li><a href="#">События</a></li>
                <li><a href="#">История</a></li>
              </ul>
            </div>

            <div className="sidebar-widget">
              <h3>Популярные теги</h3>
              <div className="tags-cloud">
                <span className="tag">латте-арт</span>
                <span className="tag">рецепты</span>
                <span className="tag">литература</span>
                <span className="tag">бистро</span>
                <span className="tag">мероприятия</span>
                <span className="tag">авторский кофе</span>
              </div>
            </div>

            <div className="sidebar-widget newsletter-widget">
              <h3>Рассылка</h3>
              <p>Подпишитесь на новости о мероприятиях и новых статьях</p>
              <form className="newsletter-form">
                <input type="email" placeholder="Ваш email" />
                <button type="submit" className="btn btn-primary">Подписаться</button>
              </form>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;