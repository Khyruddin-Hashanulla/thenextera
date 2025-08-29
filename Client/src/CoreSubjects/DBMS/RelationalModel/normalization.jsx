import React from 'react';

const NormalizationSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Normalization</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Understanding database normalization forms and the process of organizing data to reduce redundancy and improve data integrity.
        </p>
      </div>

      <div className="space-y-8">
        {/* Normalization Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is Normalization?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Normalization</strong> is the process of organizing data in a database to reduce redundancy and 
              improve data integrity. It involves decomposing tables into smaller, well-structured tables and 
              defining relationships between them.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Goals of Normalization:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Eliminate data redundancy</li>
                <li>Prevent update, insert, and delete anomalies</li>
                <li>Ensure data consistency and integrity</li>
                <li>Optimize storage space</li>
                <li>Make database maintenance easier</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Data Anomalies */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Data Anomalies</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              Unnormalized databases suffer from various anomalies that can lead to data inconsistency and integrity issues.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">1. Update Anomaly</h4>
                <p className="text-gray-300 mb-2">When updating data requires changes in multiple places, leading to inconsistency if not all instances are updated.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-gray-300">If a student's address is stored in multiple records, updating the address requires changing all occurrences.</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">2. Insert Anomaly</h4>
                <p className="text-gray-300 mb-2">Inability to add data without having to add irrelevant or incomplete information.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-gray-300">Cannot add a new course without enrolling at least one student.</span>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">3. Delete Anomaly</h4>
                <p className="text-gray-300 mb-2">Losing important data when deleting a record that contains other valuable information.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-gray-300">Deleting the last student enrolled in a course also deletes course information.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* First Normal Form (1NF) */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">First Normal Form (1NF)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A table is in <strong className="text-white">First Normal Form (1NF)</strong> if it contains only atomic (indivisible) values 
              and each column contains values of a single type.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">1NF Rules:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Each column must contain atomic (single) values</li>
                  <li>No repeating groups or arrays</li>
                  <li>Each column must contain values of the same data type</li>
                  <li>Each column must have a unique name</li>
                  <li>Order of rows and columns doesn't matter</li>
                </ul>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Example: Converting to 1NF</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong className="text-red-400">❌ Not in 1NF:</strong>
                    <div className="bg-gray-900/50 p-3 rounded mt-2">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">Courses</th></tr></thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700"><td>101</td><td>Math, Physics</td></tr>
                          <tr className="border-b border-gray-700"><td>102</td><td>Chemistry</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <strong className="text-green-400">✅ In 1NF:</strong>
                    <div className="bg-gray-900/50 p-3 rounded mt-2">
                      <table className="w-full text-xs">
                        <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">Course</th></tr></thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700"><td>101</td><td>Math</td></tr>
                          <tr className="border-b border-gray-700"><td>101</td><td>Physics</td></tr>
                          <tr className="border-b border-gray-700"><td>102</td><td>Chemistry</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Second Normal Form (2NF) */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Second Normal Form (2NF)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A table is in <strong className="text-white">Second Normal Form (2NF)</strong> if it is in 1NF and all non-key attributes 
              are fully functionally dependent on the primary key (no partial dependencies).
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">2NF Rules:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Must be in 1NF</li>
                  <li>No partial dependencies on composite primary key</li>
                  <li>All non-key attributes must depend on the entire primary key</li>
                </ul>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Example: Converting to 2NF</h4>
                <div className="space-y-4">
                  <div>
                    <strong className="text-red-400">❌ Not in 2NF (has partial dependency):</strong>
                    <div className="bg-gray-900/50 p-3 rounded mt-2">
                      <strong className="text-white">Enrollment Table:</strong>
                      <table className="w-full text-xs mt-1">
                        <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">CourseID</th><th className="text-cyan-400">Grade</th><th className="text-cyan-400">CourseName</th><th className="text-cyan-400">Credits</th></tr></thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700"><td>101</td><td>CS101</td><td>A</td><td>Programming</td><td>3</td></tr>
                          <tr className="border-b border-gray-700"><td>102</td><td>CS101</td><td>B</td><td>Programming</td><td>3</td></tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-red-400 mt-1">CourseName and Credits depend only on CourseID, not on the full key (StudentID, CourseID)</p>
                    </div>
                  </div>
                  
                  <div>
                    <strong className="text-green-400">✅ In 2NF (decomposed):</strong>
                    <div className="grid md:grid-cols-2 gap-2 mt-2">
                      <div className="bg-gray-900/50 p-3 rounded">
                        <strong className="text-white">Enrollment Table:</strong>
                        <table className="w-full text-xs mt-1">
                          <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">CourseID</th><th className="text-cyan-400">Grade</th></tr></thead>
                          <tbody className="text-gray-300">
                            <tr className="border-b border-gray-700"><td>101</td><td>CS101</td><td>A</td></tr>
                            <tr className="border-b border-gray-700"><td>102</td><td>CS101</td><td>B</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-gray-900/50 p-3 rounded">
                        <strong className="text-white">Course Table:</strong>
                        <table className="w-full text-xs mt-1">
                          <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">CourseID</th><th className="text-cyan-400">CourseName</th><th className="text-cyan-400">Credits</th></tr></thead>
                          <tbody className="text-gray-300">
                            <tr className="border-b border-gray-700"><td>CS101</td><td>Programming</td><td>3</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Third Normal Form (3NF) */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Third Normal Form (3NF)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A table is in <strong className="text-white">Third Normal Form (3NF)</strong> if it is in 2NF and has no transitive dependencies 
              (non-key attributes should not depend on other non-key attributes).
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">3NF Rules:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Must be in 2NF</li>
                  <li>No transitive dependencies</li>
                  <li>Non-key attributes should depend only on the primary key</li>
                </ul>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Example: Converting to 3NF</h4>
                <div className="space-y-4">
                  <div>
                    <strong className="text-red-400">❌ Not in 3NF (has transitive dependency):</strong>
                    <div className="bg-gray-900/50 p-3 rounded mt-2">
                      <strong className="text-white">Student Table:</strong>
                      <table className="w-full text-xs mt-1">
                        <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">Name</th><th className="text-cyan-400">DeptID</th><th className="text-cyan-400">DeptName</th><th className="text-cyan-400">DeptHead</th></tr></thead>
                        <tbody className="text-gray-300">
                          <tr className="border-b border-gray-700"><td>101</td><td>Alice</td><td>CS</td><td>Computer Science</td><td>Dr. Smith</td></tr>
                          <tr className="border-b border-gray-700"><td>102</td><td>Bob</td><td>IT</td><td>Information Tech</td><td>Dr. Jones</td></tr>
                        </tbody>
                      </table>
                      <p className="text-xs text-red-400 mt-1">DeptName and DeptHead depend on DeptID, not directly on StudentID (transitive dependency)</p>
                    </div>
                  </div>
                  
                  <div>
                    <strong className="text-green-400">✅ In 3NF (decomposed):</strong>
                    <div className="grid md:grid-cols-2 gap-2 mt-2">
                      <div className="bg-gray-900/50 p-3 rounded">
                        <strong className="text-white">Student Table:</strong>
                        <table className="w-full text-xs mt-1">
                          <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">StudentID</th><th className="text-cyan-400">Name</th><th className="text-cyan-400">DeptID</th></tr></thead>
                          <tbody className="text-gray-300">
                            <tr className="border-b border-gray-700"><td>101</td><td>Alice</td><td>CS</td></tr>
                            <tr className="border-b border-gray-700"><td>102</td><td>Bob</td><td>IT</td></tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="bg-gray-900/50 p-3 rounded">
                        <strong className="text-white">Department Table:</strong>
                        <table className="w-full text-xs mt-1">
                          <thead><tr className="border-b border-gray-600"><th className="text-cyan-400">DeptID</th><th className="text-cyan-400">DeptName</th><th className="text-cyan-400">DeptHead</th></tr></thead>
                          <tbody className="text-gray-300">
                            <tr className="border-b border-gray-700"><td>CS</td><td>Computer Science</td><td>Dr. Smith</td></tr>
                            <tr className="border-b border-gray-700"><td>IT</td><td>Information Tech</td><td>Dr. Jones</td></tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* BCNF */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Boyce-Codd Normal Form (BCNF)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Boyce-Codd Normal Form (BCNF)</strong> is a stricter version of 3NF. A table is in BCNF if 
              it is in 3NF and every determinant is a candidate key.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">BCNF Rules:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Must be in 3NF</li>
                  <li>Every determinant must be a candidate key</li>
                  <li>No functional dependency where the determinant is not a superkey</li>
                </ul>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">When 3NF ≠ BCNF:</h4>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Example:</strong> <span className="text-gray-300">Course-Instructor Table</span><br/>
                  <strong className="text-white">FDs:</strong> <span className="text-blue-400">&#123;Course, Instructor&#125; → Room, Instructor → Room</span><br/>
                  <span className="text-sm text-gray-400">
                    This is in 3NF but not BCNF because "Instructor → Room" has a determinant (Instructor) that's not a candidate key.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Higher Normal Forms */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Higher Normal Forms</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">4NF (Fourth Normal Form)</h4>
                <p className="text-gray-300 mb-2">Eliminates multi-valued dependencies.</p>
                <div className="bg-gray-900/50 p-2 rounded text-sm">
                  <span className="text-gray-300">A table is in 4NF if it's in BCNF and has no multi-valued dependencies.</span>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">5NF (Fifth Normal Form)</h4>
                <p className="text-gray-300 mb-2">Eliminates join dependencies.</p>
                <div className="bg-gray-900/50 p-2 rounded text-sm">
                  <span className="text-gray-300">A table is in 5NF if it's in 4NF and cannot be decomposed further without loss of information.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Normalization Process */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Normalization Process</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500">
                <h4 className="font-semibold text-pink-400 mb-2">Step-by-Step Process:</h4>
                <ol className="list-decimal list-inside text-gray-300 space-y-2">
                  <li><strong className="text-white">Identify the unnormalized table</strong> - Start with the original table structure</li>
                  <li><strong className="text-white">Apply 1NF</strong> - Remove repeating groups and ensure atomic values</li>
                  <li><strong className="text-white">Apply 2NF</strong> - Remove partial dependencies by creating separate tables</li>
                  <li><strong className="text-white">Apply 3NF</strong> - Remove transitive dependencies</li>
                  <li><strong className="text-white">Apply BCNF</strong> - Ensure all determinants are candidate keys</li>
                  <li><strong className="text-white">Verify relationships</strong> - Establish proper foreign key relationships</li>
                </ol>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages and Disadvantages */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Advantages vs Disadvantages</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-green-400 mb-3">✅ Advantages:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Reduces data redundancy</li>
                <li>Prevents update anomalies</li>
                <li>Improves data consistency</li>
                <li>Saves storage space</li>
                <li>Easier maintenance</li>
                <li>Better data integrity</li>
              </ul>
            </div>
            
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-red-400 mb-3">❌ Disadvantages:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>More complex queries (joins)</li>
                <li>Slower query performance</li>
                <li>More tables to manage</li>
                <li>Increased complexity</li>
                <li>May require denormalization for performance</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default NormalizationSubtopic;
