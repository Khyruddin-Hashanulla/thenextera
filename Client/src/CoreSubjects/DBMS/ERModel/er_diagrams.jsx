import React from 'react';

const ERDiagramsSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">ER Diagrams</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Learn how to create and interpret Entity-Relationship diagrams for effective database design.
        </p>
      </div>

      <div className="space-y-8">
        {/* ER Diagram Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is an ER Diagram?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              An <strong className="text-white">Entity-Relationship (ER) Diagram</strong> is a visual representation of the entities, 
              attributes, and relationships in a database system. It serves as a blueprint for database design.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Purpose:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Visualize database structure before implementation</li>
                <li>Communicate design to stakeholders</li>
                <li>Identify potential design issues early</li>
                <li>Guide the creation of relational tables</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ER Diagram Components */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">ER Diagram Components</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Basic Symbols */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-green-400 mb-4">Basic Symbols</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-8 border-2 border-gray-400 bg-gray-800 flex items-center justify-center text-xs text-white">
                    Entity
                  </div>
                  <span className="text-gray-300">Rectangle - Entity</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-8 border-2 border-gray-400 bg-gray-800 transform rotate-45 flex items-center justify-center text-xs text-white">
                    Rel
                  </div>
                  <span className="text-gray-300">Diamond - Relationship</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-6 border border-gray-400 bg-gray-800 rounded-full flex items-center justify-center text-xs text-white">
                    Attr
                  </div>
                  <span className="text-gray-300">Ellipse - Attribute</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-2 bg-gray-400"></div>
                  <span className="text-gray-300">Line - Connection</span>
                </div>
              </div>
            </div>

            {/* Special Symbols */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-purple-400 mb-4">Special Symbols</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-6 border-2 border-gray-400 bg-gray-800 rounded-full flex items-center justify-center text-xs text-white underline">
                    Key
                  </div>
                  <span className="text-gray-300">Underlined - Key Attribute</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-6 border border-gray-400 bg-gray-800 rounded-full flex items-center justify-center text-xs border-dashed text-white">
                    Derived
                  </div>
                  <span className="text-gray-300">Dashed Ellipse - Derived</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-6 border-2 border-gray-400 bg-gray-800 rounded-full flex items-center justify-center text-xs text-white">
                    Multi
                  </div>
                  <span className="text-gray-300">Double Ellipse - Multi-valued</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-16 h-2 bg-gray-400 border-t-2 border-gray-300"></div>
                  <span className="text-gray-300">Double Line - Total Participation</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Creation */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Creating an ER Diagram</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="space-y-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Step 1: Identify Entities</h4>
                <p className="text-gray-300 mb-2">Find the main objects or concepts in your system.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-cyan-400">Student, Course, Instructor, Department</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Step 2: Identify Attributes</h4>
                <p className="text-gray-300 mb-2">Determine properties for each entity.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Student:</strong> <span className="text-green-400">StudentID, Name, Email, DateOfBirth</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Step 3: Identify Relationships</h4>
                <p className="text-gray-300 mb-2">Find how entities are connected.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-purple-400">Student ENROLLS IN Course, Instructor TEACHES Course</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Step 4: Determine Cardinality</h4>
                <p className="text-gray-300 mb-2">Specify the nature of relationships (1:1, 1:M, M:M).</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-blue-400">Student ENROLLS IN Course (M:M)</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500">
                <h4 className="font-semibold text-pink-400 mb-2">Step 5: Add Participation Constraints</h4>
                <p className="text-gray-300 mb-2">Determine if participation is total or partial.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-pink-400">Every Course MUST BE TAUGHT BY an Instructor (total)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Example ER Diagram */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Example: University Database</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="bg-gray-800/70 p-6 rounded border border-gray-600">
              <h4 className="font-semibold text-cyan-400 mb-4">University Management System</h4>
              
              <div className="space-y-4 text-sm">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Entities */}
                  <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
                    <h5 className="font-semibold text-blue-400 mb-2">Entities:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• STUDENT</li>
                      <li>• COURSE</li>
                      <li>• INSTRUCTOR</li>
                      <li>• DEPARTMENT</li>
                    </ul>
                  </div>

                  {/* Relationships */}
                  <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
                    <h5 className="font-semibold text-green-400 mb-2">Relationships:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• ENROLLS (Student-Course)</li>
                      <li>• TEACHES (Instructor-Course)</li>
                      <li>• BELONGS_TO (Instructor-Dept)</li>
                      <li>• OFFERS (Department-Course)</li>
                    </ul>
                  </div>

                  {/* Cardinalities */}
                  <div className="bg-gray-900/50 p-3 rounded border border-gray-600">
                    <h5 className="font-semibold text-purple-400 mb-2">Cardinalities:</h5>
                    <ul className="space-y-1 text-gray-300">
                      <li>• ENROLLS: M:M</li>
                      <li>• TEACHES: M:M</li>
                      <li>• BELONGS_TO: M:1</li>
                      <li>• OFFERS: 1:M</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-900/50 rounded border border-gray-600">
                  <h5 className="font-semibold text-white mb-2">Sample Attributes:</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="text-gray-300">
                      <strong className="text-cyan-400">STUDENT:</strong> <u className="text-yellow-400">StudentID</u>, Name, Email, Major, GPA
                    </div>
                    <div className="text-gray-300">
                      <strong className="text-green-400">COURSE:</strong> <u className="text-yellow-400">CourseID</u>, Title, Credits, Description
                    </div>
                    <div className="text-gray-300">
                      <strong className="text-purple-400">INSTRUCTOR:</strong> <u className="text-yellow-400">InstructorID</u>, Name, Email, Office
                    </div>
                    <div className="text-gray-300">
                      <strong className="text-blue-400">DEPARTMENT:</strong> <u className="text-yellow-400">DeptID</u>, Name, Building, Budget
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Best Practices */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">ER Diagram Best Practices</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-400">Do's:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Use clear, descriptive names</li>
                  <li>Keep diagrams simple and readable</li>
                  <li>Verify all relationships make sense</li>
                  <li>Include all necessary attributes</li>
                  <li>Use consistent notation</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-red-400">Don'ts:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Don't overcomplicate the diagram</li>
                  <li>Don't forget key attributes</li>
                  <li>Don't ignore cardinality constraints</li>
                  <li>Don't create redundant relationships</li>
                  <li>Don't use ambiguous names</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Common Mistakes */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Common Mistakes to Avoid</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">1. Missing Key Attributes</h4>
                <p className="text-gray-300">Every entity must have at least one key attribute for unique identification.</p>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">2. Incorrect Cardinality</h4>
                <p className="text-gray-300">Carefully analyze real-world constraints before assigning cardinality ratios.</p>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">3. Redundant Relationships</h4>
                <p className="text-gray-300">Avoid creating multiple relationships that represent the same association.</p>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">4. Mixing Levels of Abstraction</h4>
                <p className="text-gray-300">Keep entities at the same conceptual level throughout the diagram.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ERDiagramsSubtopic;
