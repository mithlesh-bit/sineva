import React from 'react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

const Projects: React.FC = () => {
  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-featured e-commerce platform built with Next.js and Node.js. Includes user authentication, payment integration, and admin dashboard.',
      technologies: ['Next.js', 'Node.js', 'MongoDB', 'Stripe'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
    {
      title: 'Real-time Chat Application',
      description: 'A WebSocket-based chat application with rooms, direct messaging, and file sharing capabilities. Built for scalability.',
      technologies: ['React', 'Socket.io', 'Express', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
    {
      title: 'Task Management System',
      description: 'A collaborative project management tool with kanban boards, team collaboration, and real-time updates.',
      technologies: ['Next.js', 'TypeScript', 'Prisma', 'tRPC'],
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
    {
      title: 'Analytics Dashboard',
      description: 'A comprehensive analytics dashboard with data visualization, custom reports, and export functionality.',
      technologies: ['React', 'D3.js', 'Node.js', 'Redis'],
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
    {
      title: 'Social Media API',
      description: 'RESTful API for a social media platform with user profiles, posts, comments, and real-time notifications.',
      technologies: ['Node.js', 'Express', 'MongoDB', 'JWT'],
      image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8f2c293?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
    {
      title: 'Weather Forecast App',
      description: 'A beautiful weather application with location-based forecasts, interactive maps, and weather alerts.',
      technologies: ['Next.js', 'TypeScript', 'OpenWeather API', 'Mapbox'],
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop',
      github: '#',
      demo: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 bg-gray-950 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Featured </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Projects
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-lg overflow-hidden hover:border-green-500/40 hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-60"></div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 bg-gray-700/50 border border-green-500/30 rounded text-green-400 text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="flex items-center gap-2 text-gray-400 hover:text-green-400 transition-colors text-sm"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;