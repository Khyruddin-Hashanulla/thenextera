import React from 'react';

const RelationshipsSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Relationships</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Understanding relationships between entities, cardinality constraints, and participation in ER modeling.
        </p>
      </div>

      <div className="space-y-8">
        {/* Relationship Definition */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is a Relationship?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">relationship</strong> is an association between two or more entities. It represents how entities 
              are connected or interact with each other in the real world.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Examples:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><strong className="text-cyan-400">Student</strong> ENROLLS IN <strong className="text-cyan-400">Course</strong></li>
                <li><strong className="text-cyan-400">Employee</strong> WORKS FOR <strong className="text-cyan-400">Department</strong></li>
                <li><strong className="text-cyan-400">Customer</strong> PLACES <strong className="text-cyan-400">Order</strong></li>
                <li><strong className="text-cyan-400">Author</strong> WRITES <strong className="text-cyan-400">Book</strong></li>
              </ul>
            </div>
          </div>
        </section>

        {/* Relationship Types by Degree */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Relationship Types by Degree</h2>
          <div className="space-y-6">
            {/* Unary Relationship */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-green-400 mb-3">1. Unary (Recursive) Relationship</h3>
              <p className="text-gray-300 mb-3">A relationship between entities of the same entity set.</p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Example:</strong> <span className="text-green-400">Employee SUPERVISES Employee</span>
                <br/>
                <span className="text-sm text-gray-400">An employee can supervise other employees in the same company.</span>
              </div>
            </div>

            {/* Binary Relationship */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">2. Binary Relationship</h3>
              <p className="text-gray-300 mb-3">A relationship between entities of two different entity sets.</p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Example:</strong> <span className="text-purple-400">Student ENROLLS IN Course</span>
                <br/>
                <span className="text-sm text-gray-400">Students can enroll in multiple courses.</span>
              </div>
            </div>

            {/* Ternary Relationship */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">3. Ternary Relationship</h3>
              <p className="text-gray-300 mb-3">A relationship among entities of three different entity sets.</p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Example:</strong> <span className="text-yellow-400">Student TAKES Course FROM Instructor</span>
                <br/>
                <span className="text-sm text-gray-400">A student takes a specific course from a specific instructor.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Cardinality Constraints */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Cardinality Constraints</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Cardinality</strong> specifies the number of relationship instances that an entity can participate in.
            </p>
            
            <div className="space-y-6">
              {/* One-to-One */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">One-to-One (1:1)</h4>
                <p className="text-gray-300 mb-2">Each entity in both sets can be associated with at most one entity in the other set.</p>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Example:</strong> <span className="text-blue-400">Person HAS Passport</span>
                  <br/>
                  <span className="text-sm text-gray-400">Each person has exactly one passport, and each passport belongs to exactly one person.</span>
                </div>
              </div>

              {/* One-to-Many */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">One-to-Many (1:M)</h4>
                <p className="text-gray-300 mb-2">Each entity in one set can be associated with multiple entities in the other set.</p>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Example:</strong> <span className="text-green-400">Department HAS Employees</span>
                  <br/>
                  <span className="text-sm text-gray-400">One department can have many employees, but each employee belongs to one department.</span>
                </div>
              </div>

              {/* Many-to-One */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Many-to-One (M:1)</h4>
                <p className="text-gray-300 mb-2">Multiple entities in one set can be associated with one entity in the other set.</p>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Example:</strong> <span className="text-purple-400">Students BELONG TO Class</span>
                  <br/>
                  <span className="text-sm text-gray-400">Many students can belong to one class, but each student belongs to one class.</span>
                </div>
              </div>

              {/* Many-to-Many */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500">
                <h4 className="font-semibold text-pink-400 mb-2">Many-to-Many (M:M)</h4>
                <p className="text-gray-300 mb-2">Entities in both sets can be associated with multiple entities in the other set.</p>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Example:</strong> <span className="text-pink-400">Students ENROLL IN Courses</span>
                  <br/>
                  <span className="text-sm text-gray-400">Students can enroll in multiple courses, and courses can have multiple students.</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Participation Constraints */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Participation Constraints</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Participation constraints</strong> specify whether the existence of an entity depends on its participation in a relationship.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Total Participation */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Total Participation</h4>
                <p className="text-gray-300 mb-2">Every entity must participate in the relationship.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-red-400">Every Employee MUST WORK FOR a Department</span>
                  <br/>
                  <strong className="text-white">Notation:</strong> <span className="text-red-400">Double line (==)</span>
                </div>
              </div>

              {/* Partial Participation */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Partial Participation</h4>
                <p className="text-gray-300 mb-2">Some entities may not participate in the relationship.</p>
                <div className="bg-gray-900/50 p-3 rounded text-sm">
                  <strong className="text-white">Example:</strong> <span className="text-orange-400">Not every Employee MANAGES a Project</span>
                  <br/>
                  <strong className="text-white">Notation:</strong> <span className="text-orange-400">Single line (-)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Relationship Attributes */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Relationship Attributes</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              Relationships can have their own attributes that describe properties of the relationship itself.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
              <h4 className="font-semibold text-yellow-400 mb-2">Examples:</h4>
              <ul className="space-y-2 text-gray-300">
                <li><strong className="text-cyan-400">Student ENROLLS IN Course:</strong> EnrollmentDate, Grade</li>
                <li><strong className="text-green-400">Employee WORKS ON Project:</strong> HoursWorked, StartDate</li>
                <li><strong className="text-purple-400">Customer PLACES Order:</strong> OrderDate, TotalAmount</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ER Diagram Notation */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">ER Diagram Notation for Relationships</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-white">Symbols:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><strong className="text-cyan-400">Diamond:</strong> Relationship</li>
                  <li><strong className="text-green-400">Line:</strong> Connection between entities</li>
                  <li><strong className="text-purple-400">1, M, N:</strong> Cardinality labels</li>
                  <li><strong className="text-red-400">Double line:</strong> Total participation</li>
                  <li><strong className="text-orange-400">Single line:</strong> Partial participation</li>
                </ul>
              </div>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Example Notation:</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <p><span className="text-cyan-400">[STUDENT]</span> ——— <span className="text-yellow-400">&lt;ENROLLS&gt;</span> ——— <span className="text-cyan-400">[COURSE]</span></p>
                  <p className="ml-8 text-purple-400">M &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; N</p>
                  <p className="mt-2 text-gray-400">Many students can enroll in many courses</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default RelationshipsSubtopic;
