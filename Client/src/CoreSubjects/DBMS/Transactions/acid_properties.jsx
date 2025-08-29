import React from 'react';

const AcidProperties = () => {
  const content = {
    definition: "ACID properties are fundamental principles that ensure database transactions are processed reliably and maintain data integrity in concurrent environments.",
    properties: {
      title: "The Four ACID Properties:",
      details: [
        {
          name: "Atomicity",
          description: "All operations in a transaction succeed or fail together - no partial transactions",
          explanation: "A transaction is treated as a single unit of work. Either all operations complete successfully, or none of them do.",
          example: "Bank transfer: Debit from Account A and Credit to Account B must both succeed or both fail",
          implementation: [
            "Transaction logs maintain before/after images",
            "Rollback mechanisms undo partial changes",
            "Commit/Rollback commands ensure atomicity"
          ]
        },
        {
          name: "Consistency",
          description: "Database remains in a valid state before and after transaction execution",
          explanation: "All database rules, constraints, and triggers must be satisfied. Data integrity is maintained.",
          example: "Account balance cannot be negative, foreign key constraints must be maintained",
          types: [
            "Entity Integrity - Primary key constraints",
            "Referential Integrity - Foreign key constraints",
            "Domain Integrity - Data type and range constraints",
            "User-defined Integrity - Business rules and triggers"
          ]
        },
        {
          name: "Isolation",
          description: "Concurrent transactions do not interfere with each other",
          explanation: "Each transaction appears to execute in isolation, even when running concurrently with other transactions.",
          levels: [
            {
              name: "Read Uncommitted",
              description: "Lowest isolation, allows dirty reads",
              problems: ["Dirty Read", "Non-repeatable Read", "Phantom Read"]
            },
            {
              name: "Read Committed",
              description: "Prevents dirty reads",
              problems: ["Non-repeatable Read", "Phantom Read"]
            },
            {
              name: "Repeatable Read",
              description: "Prevents dirty and non-repeatable reads",
              problems: ["Phantom Read"]
            },
            {
              name: "Serializable",
              description: "Highest isolation, prevents all problems",
              problems: []
            }
          ]
        },
        {
          name: "Durability",
          description: "Committed transactions persist even after system failures",
          explanation: "Once a transaction is committed, its effects are permanently stored and survive system crashes.",
          implementation: [
            "Write-Ahead Logging (WAL) - Log changes before data",
            "Force-write policy - Flush logs to disk on commit",
            "Database checkpoints - Periodic data synchronization",
            "Recovery mechanisms - Redo/Undo operations"
          ]
        }
      ]
    },
    problems: {
      title: "Concurrency Problems ACID Solves:",
      issues: [
        {
          name: "Dirty Read",
          description: "Reading uncommitted data from another transaction",
          example: "T1 updates balance, T2 reads new balance, T1 rolls back",
          solution: "Read Committed isolation level or higher"
        },
        {
          name: "Non-repeatable Read",
          description: "Same query returns different results within a transaction",
          example: "T1 reads balance twice, T2 updates balance between reads",
          solution: "Repeatable Read isolation level or higher"
        },
        {
          name: "Phantom Read",
          description: "New rows appear in result set during transaction",
          example: "T1 counts rows, T2 inserts new row, T1 counts again",
          solution: "Serializable isolation level"
        },
        {
          name: "Lost Update",
          description: "One transaction overwrites another's changes",
          example: "T1 and T2 both update same record, one update is lost",
          solution: "Proper locking mechanisms"
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

      {/* ACID Properties */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">{content.properties.title}</h3>
        <div className="space-y-6">
          {content.properties.details.map((property, index) => (
            <div key={index} className="bg-blue-500/5 border border-blue-500/10 rounded-lg p-5">
              <h4 className="text-lg font-bold text-blue-300 mb-3">{property.name}</h4>
              <p className="text-gray-300 mb-3 font-medium">{property.description}</p>
              <p className="text-gray-400 mb-4 text-sm leading-relaxed">{property.explanation}</p>
              
              {property.example && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mb-4">
                  <p className="text-green-300 text-sm"><strong>Example:</strong> {property.example}</p>
                </div>
              )}

              {property.implementation && (
                <div className="space-y-2">
                  <h5 className="text-blue-200 font-semibold text-sm">Implementation:</h5>
                  <ul className="space-y-1">
                    {property.implementation.map((impl, implIndex) => (
                      <li key={implIndex} className="flex items-start space-x-2">
                        <span className="text-blue-400 text-xs mt-1">▸</span>
                        <span className="text-gray-300 text-sm">{impl}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.types && (
                <div className="space-y-2">
                  <h5 className="text-blue-200 font-semibold text-sm">Types:</h5>
                  <ul className="space-y-1">
                    {property.types.map((type, typeIndex) => (
                      <li key={typeIndex} className="flex items-start space-x-2">
                        <span className="text-blue-400 text-xs mt-1">▸</span>
                        <span className="text-gray-300 text-sm">{type}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.levels && (
                <div className="space-y-3">
                  <h5 className="text-blue-200 font-semibold text-sm">Isolation Levels:</h5>
                  <div className="grid gap-3">
                    {property.levels.map((level, levelIndex) => (
                      <div key={levelIndex} className="bg-blue-500/5 border border-blue-500/10 rounded p-3">
                        <h6 className="text-blue-200 font-medium text-sm mb-1">{level.name}</h6>
                        <p className="text-gray-400 text-xs mb-2">{level.description}</p>
                        {level.problems.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {level.problems.map((problem, problemIndex) => (
                              <span key={problemIndex} className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded">
                                {problem}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Concurrency Problems */}
      <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-red-400 mb-6">{content.problems.title}</h3>
        <div className="grid gap-4">
          {content.problems.issues.map((issue, index) => (
            <div key={index} className="bg-red-500/5 border border-red-500/10 rounded-lg p-4">
              <h4 className="text-lg font-bold text-red-300 mb-2">{issue.name}</h4>
              <p className="text-gray-300 mb-3 text-sm">{issue.description}</p>
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded p-3 mb-3">
                <p className="text-yellow-300 text-sm"><strong>Example:</strong> {issue.example}</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded p-3">
                <p className="text-green-300 text-sm"><strong>Solution:</strong> {issue.solution}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AcidProperties;
