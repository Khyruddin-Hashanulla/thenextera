import React from 'react';

const Architecture = () => {
  const content = {
    definition: "Database architecture refers to the design and structure of database systems, including how data is organized, stored, and accessed.",
    architecture: {
      title: "Types of Database Architecture",
      types: [
        {
          name: "1-Tier Architecture",
          description: "Database and application reside on the same machine"
        },
        {
          name: "2-Tier Architecture",
          description: "Client-server model with database on server and application on client"
        },
        {
          name: "3-Tier Architecture",
          description: "Presentation, application, and database layers are separated"
        }
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Definition */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <p className="text-gray-300 leading-relaxed">{content.definition}</p>
      </div>

      {/* Architecture Types */}
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">{content.architecture.title}</h3>
        <div className="space-y-4">
          {content.architecture.types.map((type, index) => (
            <div key={index} className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-purple-300 mb-2">{type.name}</h4>
              <p className="text-gray-300">{type.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Architecture;
