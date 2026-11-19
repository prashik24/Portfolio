import React, { useState } from 'react';

export default function Projects({ projects, onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section className="projects-section" id="projects">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <i className="ri-code-box-line"></i> Portfolio Showcase
          </div>
          <h2 className="section-title">Engineered Projects</h2>
          <p className="section-subtitle">
            Production-ready web applications, microservice architectures, and AI platforms built with high reliability and clean code.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Projects
          </button>
          <button 
            className={`filter-btn ${filter === 'fullstack' ? 'active' : ''}`}
            onClick={() => setFilter('fullstack')}
          >
            Full-Stack &amp; AI
          </button>
          <button 
            className={`filter-btn ${filter === 'frontend' ? 'active' : ''}`}
            onClick={() => setFilter('frontend')}
          >
            Frontend &amp; Components
          </button>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filtered.map(project => (
            <article className="project-card" key={project.id}>
              <div className="project-preview">
                <div className="mockup-header-bar">
                  <div className="mockup-dots">
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                    <span className="mockup-dot"></span>
                  </div>
                  <div className="mockup-url">
                    {project.deployment?.liveUrl ? project.deployment.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '') : `github.com/prashik24/${project.id}`}
                  </div>
                  <div></div>
                </div>

                <div className="project-img-holder">
                  <img src={project.image} alt={`${project.title} Screenshot`} loading="lazy" />
                </div>

                {project.deployment && (
                  <a 
                    href={project.deployment.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="project-deploy-badge"
                    title={`Live on ${project.deployment.platform}`}
                  >
                    <span className="live-dot"></span> Live • {project.deployment.platform}
                  </a>
                )}
              </div>

              <div className="project-body">
                <div className="project-header-row">
                  <div className="project-title">
                    <h3>{project.title}</h3>
                  </div>
                  <span className="project-category-pill">{project.categoryLabel}</span>
                </div>

                <p className="project-desc">{project.shortDescription}</p>

                <div className="tech-stack-chips">
                  {project.technologies.map(t => (
                    <span className="tech-chip" key={t}>{t}</span>
                  ))}
                </div>

                <ul className="project-bullets">
                  {project.highlights.slice(0, 3).map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>

                <div className="project-footer">
                  <div className="project-links">
                    <a 
                      href={project.links.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-btn primary"
                    >
                      <i className="ri-external-link-line"></i> Live Demo
                    </a>
                    <a 
                      href={project.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="project-link-btn"
                    >
                      <i className="ri-github-line"></i> GitHub Repo
                    </a>
                  </div>
                  <button 
                    className="project-deep-dive-btn" 
                    onClick={() => onSelectProject(project)}
                  >
                    Details <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
