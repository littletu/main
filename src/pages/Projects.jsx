import { useState, useMemo, useEffect } from 'react';

const ProjectRow = ({ project }) => {
  const [imgError, setImgError] = useState(false);

  const getInitials = (name) => {
    const words = name.split(' ').filter(w => w.trim().length > 0);
    if(words.length === 1) return words[0].substring(0, 1).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  return (
    <div className="project-row">
      <div className="company-logo-wrapper">
        {(project.customLogo || project.domain) && !imgError ? (
          <img 
            src={project.customLogo || `https://www.google.com/s2/favicons?domain=${project.domain}&sz=128`} 
            alt={`${project.name} Logo`} 
            className="company-logo"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="company-initial">{getInitials(project.name)}</span>
        )}
      </div>
      <div className="company-name">{project.name}</div>
    </div>
  );
};

export default function Projects() {
  const [projectsData, setProjectsData] = useState([]);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        setProjectsData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load projects', err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(() => {
    return ["全部", ...new Set(projectsData.map(p => p.category))];
  }, [projectsData]);

  const filteredProjects = useMemo(() => {
    return activeCategory === "全部" 
      ? projectsData 
      : projectsData.filter(p => p.category === activeCategory);
  }, [activeCategory, projectsData]);

  if (loading) {
    return <div className="page-container" style={{ textAlign: 'center', marginTop: '100px' }}>Loading projects...</div>;
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Projects</h1>

      <div className="content-layout">
        <aside className="categories-sidebar">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`category-item ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </aside>

        <main className="projects-list">
          {filteredProjects.map((project, index) => (
            <ProjectRow key={project.name + index} project={project} />
          ))}
        </main>
      </div>
    </div>
  );
}
