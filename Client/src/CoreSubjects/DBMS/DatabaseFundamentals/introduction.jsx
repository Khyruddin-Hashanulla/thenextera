import React from 'react';

const Introduction = () => {
  const content = {
    definition: "A Database Management System (DBMS) is software that enables users to create, manage, and manipulate databases efficiently and securely.",
    introduction: {
      title: "What is a Database?",
      description: "A database is an organized collection of structured information, or data, typically stored electronically in a computer system.",
      keyPoints: [
        "Organized collection of data",
        "Stored electronically",
        "Managed by DBMS software",
        "Supports multiple users",
        "Ensures data integrity and security"
      ]
    }
  };

  return (
    <div className="space-y-6">
      {/* Definition */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
        <p className="text-gray-300 leading-relaxed">{content.definition}</p>
      </div>

      {/* Introduction Section */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">{content.introduction.title}</h3>
        <p className="text-gray-300 mb-4">{content.introduction.description}</p>
        <ul className="space-y-2">
          {content.introduction.keyPoints.map((point, index) => (
            <li key={index} className="flex items-start space-x-3">
              <span className="text-blue-400 font-bold">•</span>
              <span className="text-gray-300">{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Introduction;
