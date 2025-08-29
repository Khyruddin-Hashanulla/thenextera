import React from 'react';

const DataModels = () => {
  const content = {
    definition: "Data models define how data is structured, stored, and manipulated in a database system.",
    models: {
      title: "Types of Data Models",
      types: [
        {
          name: "Hierarchical Model",
          description: "Tree-like structure with parent-child relationships",
          examples: ["File systems", "XML documents"]
        },
        {
          name: "Network Model",
          description: "Graph structure allowing multiple parent-child relationships",
          examples: ["CODASYL", "Integrated Data Store"]
        },
        {
          name: "Relational Model",
          description: "Data organized in tables with rows and columns",
          examples: ["MySQL", "PostgreSQL", "Oracle"]
        },
        {
          name: "Object-Oriented Model",
          description: "Data represented as objects with attributes and methods",
          examples: ["db4o", "ObjectDB"]
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

      {/* Data Models */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-emerald-400 mb-4">{content.models.title}</h3>
        <div className="space-y-4">
          {content.models.types.map((model, index) => (
            <div key={index} className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4">
              <h4 className="text-lg font-semibold text-emerald-300 mb-2">{model.name}</h4>
              <p className="text-gray-300 mb-3">{model.description}</p>
              {model.examples && (
                <div className="flex flex-wrap gap-2">
                  {model.examples.map((example, exIndex) => (
                    <span key={exIndex} className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-sm rounded-full">
                      {example}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DataModels;
