import React from 'react';

const About: React.FC = () => {
  const skills = [
    {
      category: 'Frontend',
      items: [
        { name: 'Next.js', level: 90 },
        { name: 'React', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'Tailwind CSS', level: 90 },
      ],
    },
    {
      category: 'Backend',
      items: [
        { name: 'Node.js', level: 88 },
        { name: 'Express.js', level: 85 },
        { name: 'MongoDB', level: 80 },
        { name: 'PostgreSQL', level: 75 },
      ],
    },
    {
      category: 'Tools & Others',
      items: [
        { name: 'Git', level: 85 },
        { name: 'Docker', level: 70 },
        { name: 'REST APIs', level: 90 },
        { name: 'GraphQL', level: 75 },
      ],
    },
  ];

  return (
    <section id="about" className="py-20 bg-gray-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">About </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-cyan-400">
              Me
            </span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-cyan-400 mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-lg p-8 hover:border-green-500/40 transition-all duration-300">
              <h3 className="text-2xl font-bold text-green-400 mb-4">Full Stack Developer</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                With over 2 years of professional experience, I specialize in building modern, 
                scalable web applications. My expertise lies in creating seamless user experiences 
                with cutting-edge technologies.
              </p>
              <p className="text-gray-300 leading-relaxed">
                I'm passionate about writing clean, maintainable code and staying up-to-date with 
                the latest industry trends. I thrive in collaborative environments and love tackling 
                complex problems with innovative solutions.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/50 border border-green-500/20 rounded-lg p-6 text-center hover:border-green-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">2+</div>
                <div className="text-gray-400 text-sm">Years Experience</div>
              </div>
              <div className="bg-gray-800/50 border border-green-500/20 rounded-lg p-6 text-center hover:border-green-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-green-400 mb-2">20+</div>
                <div className="text-gray-400 text-sm">Projects Completed</div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {skills.map((skillGroup, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold text-green-400 mb-4">{skillGroup.category}</h4>
                <div className="space-y-4">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <div key={skillIndex}>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300 font-medium">{skill.name}</span>
                        <span className="text-green-400 font-medium">{skill.level}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;