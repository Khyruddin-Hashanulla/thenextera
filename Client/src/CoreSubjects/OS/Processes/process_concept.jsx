import React from 'react';
import ProcessConceptSubtopic from './ProcessConceptSubtopic';

const ProcessConcept = () => {
  const content = {
    definition: "A process is a program in execution. It includes the program code, current activity, program counter, stack, data section, and heap.",
    concepts: {
      title: "Process Fundamentals",
      details: [
        {
          name: "Process States",
          description: "Different states a process can be in during its lifecycle",
          states: [
            "New - Process is being created",
            "Ready - Process is waiting to be assigned to processor",
            "Running - Instructions are being executed",
            "Waiting - Process is waiting for some event to occur",
            "Terminated - Process has finished execution"
          ]
        },
        {
          name: "Process Control Block (PCB)",
          description: "Data structure containing information about the process",
          components: [
            "Process ID (PID)",
            "Process State",
            "Program Counter",
            "CPU Registers",
            "Memory Management Information",
            "Accounting Information",
            "I/O Status Information"
          ]
        }
      ]
    },
    operations: {
      title: "Process Operations",
      types: [
        {
          name: "Process Creation",
          description: "Creating new processes in the system",
          methods: ["fork() system call", "exec() family", "CreateProcess() in Windows"]
        },
        {
          name: "Process Termination",
          description: "Ending process execution",
          methods: ["Normal completion", "Error conditions", "Fatal error", "Killed by another process"]
        }
      ]
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Definition */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 sm:p-6">
        <p className="text-gray-100 leading-relaxed text-sm sm:text-base">{content.definition}</p>
      </div>

      {/* Process Concepts */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-blue-400 mb-4 sm:mb-6">{content.concepts.title}</h3>
        <div className="space-y-4 sm:space-y-6">
          {content.concepts.details.map((concept, index) => (
            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-3 sm:p-5">
              <h4 className="text-base sm:text-lg font-bold text-blue-300 mb-2 sm:mb-3">{concept.name}</h4>
              <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">{concept.description}</p>
              
              {concept.states && (
                <ul className="space-y-1 sm:space-y-2">
                  {concept.states.map((state, stateIndex) => (
                    <li key={stateIndex} className="flex items-start space-x-2">
                      <span className="text-blue-400 text-xs mt-1 flex-shrink-0">▸</span>
                      <span className="text-gray-300 text-xs sm:text-sm">{state}</span>
                    </li>
                  ))}
                </ul>
              )}

              {concept.components && (
                <ul className="space-y-1 sm:space-y-2">
                  {concept.components.map((component, compIndex) => (
                    <li key={compIndex} className="flex items-start space-x-2">
                      <span className="text-blue-400 text-xs mt-1 flex-shrink-0">▸</span>
                      <span className="text-gray-300 text-xs sm:text-sm">{component}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Process Operations */}
      <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-semibold text-green-400 mb-4 sm:mb-6">{content.operations.title}</h3>
        <div className="space-y-3 sm:space-y-4">
          {content.operations.types.map((operation, index) => (
            <div key={index} className="bg-gray-700 border border-gray-600 rounded-lg p-3 sm:p-4">
              <h4 className="text-base sm:text-lg font-bold text-green-300 mb-2">{operation.name}</h4>
              <p className="text-gray-300 mb-2 sm:mb-3 text-sm sm:text-base">{operation.description}</p>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {operation.methods.map((method, methodIndex) => (
                  <span key={methodIndex} className="px-2 sm:px-3 py-1 bg-gray-600 text-green-300 text-xs sm:text-sm rounded-full">
                    {method}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Process Concept Subtopic */}
      <ProcessConceptSubtopic title="Process Concept Details" content={content} />
    </div>
  );
};

export default ProcessConcept;
