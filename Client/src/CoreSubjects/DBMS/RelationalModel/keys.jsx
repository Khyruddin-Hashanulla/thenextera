import React from 'react';

const KeysSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Keys in Relational Model</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Understanding different types of keys and their roles in maintaining data integrity and relationships in relational databases.
        </p>
      </div>

      <div className="space-y-8">
        {/* Key Definition */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is a Key?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">key</strong> is a set of one or more attributes that uniquely identifies a tuple (row) in a relation (table). 
              Keys are fundamental to the relational model and ensure data integrity.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Key Properties:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li><strong className="text-cyan-400">Uniqueness:</strong> No two tuples can have the same key value</li>
                <li><strong className="text-cyan-400">Minimality:</strong> No proper subset of the key can uniquely identify tuples</li>
                <li><strong className="text-cyan-400">Non-null:</strong> Key attributes cannot contain null values</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Super Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Super Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">super key</strong> is a set of attributes that can uniquely identify each tuple in a relation. 
              It may contain additional attributes beyond what is necessary for unique identification.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
              <h4 className="font-semibold text-green-400 mb-2">Example: Student Table</h4>
              <div className="bg-gray-900/50 p-3 rounded mb-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-cyan-400">StudentID</th>
                      <th className="text-left p-2 text-cyan-400">Name</th>
                      <th className="text-left p-2 text-cyan-400">Email</th>
                      <th className="text-left p-2 text-cyan-400">Phone</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700"><td className="p-2">101</td><td className="p-2">Alice</td><td className="p-2">alice@email.com</td><td className="p-2">555-1234</td></tr>
                    <tr className="border-b border-gray-700"><td className="p-2">102</td><td className="p-2">Bob</td><td className="p-2">bob@email.com</td><td className="p-2">555-5678</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white">Super Keys:</strong> <span className="text-green-400">&#123;StudentID&#125;, &#123;Email&#125;, &#123;StudentID, Name&#125;, &#123;StudentID, Email&#125;, &#123;StudentID, Name, Email&#125;</span>
              </p>
            </div>
          </div>
        </section>

        {/* Candidate Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Candidate Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">candidate key</strong> is a minimal super key. It's the smallest set of attributes that can uniquely identify each tuple. 
              A relation can have multiple candidate keys.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
              <h4 className="font-semibold text-purple-400 mb-2">Characteristics:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                <li>Uniquely identifies each tuple</li>
                <li>No proper subset can uniquely identify tuples (minimal)</li>
                <li>Cannot contain null values</li>
              </ul>
              <div className="bg-gray-900/50 p-3 rounded">
                <strong className="text-white">From the Student example:</strong><br/>
                <strong className="text-white">Candidate Keys:</strong> <span className="text-purple-400">&#123;StudentID&#125;, &#123;Email&#125;</span>
                <br/>
                <span className="text-sm text-gray-400">Both can uniquely identify students, and neither can be reduced further.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Primary Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Primary Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">primary key</strong> is the candidate key chosen by the database designer to uniquely identify tuples in a relation. 
              Each table can have only one primary key.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Primary Key Rules:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Must be unique for each row</li>
                  <li>Cannot contain NULL values</li>
                  <li>Should be stable (rarely changes)</li>
                  <li>Should be simple (preferably single attribute)</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Example:</h4>
                <div className="bg-gray-900/50 p-3 rounded">
                  <strong className="text-white">Student Table:</strong> <span className="text-yellow-400">StudentID (Primary Key)</span><br/>
                  <strong className="text-white">Course Table:</strong> <span className="text-yellow-400">CourseID (Primary Key)</span><br/>
                  <strong className="text-white">Employee Table:</strong> <span className="text-yellow-400">EmployeeID (Primary Key)</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Foreign Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Foreign Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">foreign key</strong> is an attribute (or set of attributes) in one table that refers to the primary key 
              of another table. It establishes relationships between tables.
            </p>
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Foreign Key Constraints:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li><strong className="text-red-400">Referential Integrity:</strong> Foreign key value must exist in referenced table</li>
                  <li><strong className="text-red-400">Can be NULL:</strong> Unless specified otherwise</li>
                  <li><strong className="text-red-400">Can be duplicate:</strong> Multiple rows can have same foreign key value</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Example: Enrollment System</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">Student Table:</strong>
                    <table className="w-full text-xs mt-2">
                      <thead><tr className="border-b border-gray-600"><th className="text-left text-cyan-400">StudentID (PK)</th><th className="text-left text-cyan-400">Name</th></tr></thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-700"><td>101</td><td>Alice</td></tr>
                        <tr className="border-b border-gray-700"><td>102</td><td>Bob</td></tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">Enrollment Table:</strong>
                    <table className="w-full text-xs mt-2">
                      <thead><tr className="border-b border-gray-600"><th className="text-left text-red-400">StudentID (FK)</th><th className="text-left text-cyan-400">CourseID</th></tr></thead>
                      <tbody className="text-gray-300">
                        <tr className="border-b border-gray-700"><td>101</td><td>CS101</td></tr>
                        <tr className="border-b border-gray-700"><td>102</td><td>CS101</td></tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Composite Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Composite Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">composite key</strong> is a key that consists of two or more attributes. 
              It's used when no single attribute can uniquely identify a tuple.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-400 mb-2">Example: Order Details Table</h4>
              <div className="bg-gray-900/50 p-3 rounded mb-3">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-600">
                      <th className="text-left p-2 text-cyan-400">OrderID</th>
                      <th className="text-left p-2 text-cyan-400">ProductID</th>
                      <th className="text-left p-2 text-cyan-400">Quantity</th>
                      <th className="text-left p-2 text-cyan-400">Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-300">
                    <tr className="border-b border-gray-700"><td className="p-2">1001</td><td className="p-2">P001</td><td className="p-2">2</td><td className="p-2">$50</td></tr>
                    <tr className="border-b border-gray-700"><td className="p-2">1001</td><td className="p-2">P002</td><td className="p-2">1</td><td className="p-2">$30</td></tr>
                    <tr className="border-b border-gray-700"><td className="p-2">1002</td><td className="p-2">P001</td><td className="p-2">3</td><td className="p-2">$50</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-gray-400">
                <strong className="text-white">Composite Primary Key:</strong> <span className="text-blue-400">&#123;OrderID, ProductID&#125;</span>
                <br/>Neither OrderID nor ProductID alone can uniquely identify a row.
              </p>
            </div>
          </div>
        </section>

        {/* Alternate Key */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Alternate Key</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              An <strong className="text-white">alternate key</strong> is a candidate key that is not chosen as the primary key. 
              These keys can still uniquely identify tuples but are not the primary means of identification.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-400 mb-2">Example:</h4>
              <div className="bg-gray-900/50 p-3 rounded">
                <strong className="text-white">Employee Table:</strong><br/>
                <strong className="text-white">Primary Key:</strong> <span className="text-yellow-400">EmployeeID</span><br/>
                <strong className="text-white">Alternate Keys:</strong> <span className="text-orange-400">Email, SSN</span><br/>
                <span className="text-sm text-gray-400">
                  Email and SSN can uniquely identify employees but EmployeeID is chosen as primary key.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Key Selection Guidelines */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Key Selection Guidelines</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-400">Choose Primary Key that is:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Short and simple</li>
                  <li>Stable (doesn't change often)</li>
                  <li>Meaningful to users</li>
                  <li>Numeric when possible</li>
                  <li>Never null</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-red-400">Avoid Primary Keys that are:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Long text strings</li>
                  <li>Frequently changing values</li>
                  <li>Composite when simple key exists</li>
                  <li>Containing sensitive information</li>
                  <li>Nullable attributes</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default KeysSubtopic;
