import React from 'react';

const ProcessConceptSubtopic = ({ title, content }) => {
  // Provide default values to prevent undefined errors
  const safeContent = content || {};
  const safeTitle = title || "Process Concept";

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 p-4 sm:p-6 rounded-lg">
      <h3 className="text-lg sm:text-xl font-semibold text-cyan-400 mb-3 sm:mb-4">{safeTitle}</h3>
      
      {safeContent.definition && (
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-white mb-2 text-sm sm:text-base">Definition</h4>
          <p className="text-gray-300 leading-relaxed text-sm sm:text-base">{safeContent.definition}</p>
        </div>
      )}

      {safeContent.concepts && (
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{safeContent.concepts.title}</h4>
          <div className="space-y-3 sm:space-y-4">
            {safeContent.concepts.details && safeContent.concepts.details.map((detail, index) => (
              <div key={index} className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded">
                <h5 className="font-semibold text-cyan-300 mb-2 text-sm">{detail.name}</h5>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">{detail.description}</p>
                
                {detail.states && (
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                    {detail.states.map((state, idx) => (
                      <li key={idx}>{state}</li>
                    ))}
                  </ul>
                )}
                
                {detail.components && (
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                    {detail.components.map((component, idx) => (
                      <li key={idx}>{component}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {safeContent.operations && (
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{safeContent.operations.title}</h4>
          <div className="space-y-3 sm:space-y-4">
            {safeContent.operations.types && safeContent.operations.types.map((operation, index) => (
              <div key={index} className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded">
                <h5 className="font-semibold text-green-300 mb-2 text-sm">{operation.name}</h5>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">{operation.description}</p>
                {operation.methods && (
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                    {operation.methods.map((method, idx) => (
                      <li key={idx}>{method}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {safeContent.scheduling && (
        <div className="mb-4 sm:mb-6">
          <h4 className="font-semibold text-white mb-2 sm:mb-3 text-sm sm:text-base">{safeContent.scheduling.title}</h4>
          <div className="space-y-3 sm:space-y-4">
            {safeContent.scheduling.algorithms && safeContent.scheduling.algorithms.map((algorithm, index) => (
              <div key={index} className="bg-gray-700/50 border border-gray-600 p-3 sm:p-4 rounded">
                <h5 className="font-semibold text-purple-300 mb-2 text-sm">{algorithm.name}</h5>
                <p className="text-gray-300 text-xs sm:text-sm mb-2">{algorithm.description}</p>
                {algorithm.characteristics && (
                  <ul className="list-disc list-inside text-xs sm:text-sm text-gray-300 space-y-1">
                    {algorithm.characteristics.map((char, idx) => (
                      <li key={idx}>{char}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fallback content when no props are passed */}
      {!safeContent.definition && !safeContent.concepts && !safeContent.operations && !safeContent.scheduling && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-sm sm:text-base">Process concept content will be displayed here.</p>
        </div>
      )}
    </div>
  );
};

export default ProcessConceptSubtopic;
