import React from 'react';

const FunctionalDependenciesSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Functional Dependencies</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Understanding functional dependencies and their role in database design and normalization.
        </p>
      </div>

      <div className="space-y-8">
        {/* FD Definition */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What is a Functional Dependency?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">functional dependency (FD)</strong> is a constraint that describes the relationship between attributes in a relation. 
              If attribute A functionally determines attribute B, then for any two tuples with the same value of A, 
              they must have the same value of B.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Notation:</h4>
              <div className="bg-gray-900/50 p-3 rounded">
                <strong className="text-cyan-400">A → B</strong> <span className="text-gray-300">(read as "A determines B" or "B depends on A")</span>
                <br/>
                <span className="text-sm text-gray-400">Where A is the determinant and B is the dependent</span>
              </div>
            </div>
          </div>
        </section>

        {/* FD Examples */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Examples of Functional Dependencies</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Student Table Example:</h4>
                <div className="bg-gray-900/50 p-3 rounded mb-3">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-left p-2 text-cyan-400">StudentID</th>
                        <th className="text-left p-2 text-cyan-400">Name</th>
                        <th className="text-left p-2 text-cyan-400">Email</th>
                        <th className="text-left p-2 text-cyan-400">Department</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr className="border-b border-gray-700"><td className="p-2">101</td><td className="p-2">Alice</td><td className="p-2">alice@email.com</td><td className="p-2">CS</td></tr>
                      <tr className="border-b border-gray-700"><td className="p-2">102</td><td className="p-2">Bob</td><td className="p-2">bob@email.com</td><td className="p-2">IT</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-2 text-sm">
                  <p><strong className="text-green-400">StudentID → Name</strong> <span className="text-gray-400">(Student ID determines Name)</span></p>
                  <p><strong className="text-green-400">StudentID → Email</strong> <span className="text-gray-400">(Student ID determines Email)</span></p>
                  <p><strong className="text-green-400">StudentID → Department</strong> <span className="text-gray-400">(Student ID determines Department)</span></p>
                  <p><strong className="text-green-400">Email → StudentID</strong> <span className="text-gray-400">(Email determines Student ID)</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of FDs */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Types of Functional Dependencies</h2>
          <div className="space-y-6">
            {/* Trivial FD */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-purple-400 mb-3">1. Trivial Functional Dependency</h3>
              <p className="text-gray-300 mb-3">
                A functional dependency A → B is trivial if B is a subset of A.
              </p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Examples:</strong>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li><span className="text-purple-400">&#123;StudentID, Name&#125; → StudentID</span> (trivial)</li>
                  <li><span className="text-purple-400">&#123;StudentID, Name&#125; → Name</span> (trivial)</li>
                  <li><span className="text-purple-400">&#123;StudentID, Name&#125; → &#123;StudentID, Name&#125;</span> (trivial)</li>
                </ul>
              </div>
            </div>

            {/* Non-trivial FD */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-yellow-400 mb-3">2. Non-trivial Functional Dependency</h3>
              <p className="text-gray-300 mb-3">
                A functional dependency A → B is non-trivial if B is not a subset of A.
              </p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Examples:</strong>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li><span className="text-yellow-400">StudentID → Name</span> (non-trivial)</li>
                  <li><span className="text-yellow-400">StudentID → Email</span> (non-trivial)</li>
                  <li><span className="text-yellow-400">&#123;CourseID, StudentID&#125; → Grade</span> (non-trivial)</li>
                </ul>
              </div>
            </div>

            {/* Completely Non-trivial FD */}
            <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
              <h3 className="text-xl font-semibold text-red-400 mb-3">3. Completely Non-trivial Functional Dependency</h3>
              <p className="text-gray-300 mb-3">
                A functional dependency A → B is completely non-trivial if A and B have no attributes in common.
              </p>
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <strong className="text-white">Examples:</strong>
                <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                  <li><span className="text-red-400">StudentID → Name</span> (completely non-trivial)</li>
                  <li><span className="text-red-400">Email → Department</span> (completely non-trivial)</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Armstrong's Axioms */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Armstrong's Axioms</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Armstrong's Axioms</strong> are inference rules used to derive new functional dependencies from existing ones.
            </p>
            
            <div className="space-y-4">
              {/* Primary Rules */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Primary Rules:</h4>
                <div className="space-y-3">
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">1. Reflexivity (Trivial Rule):</strong><br/>
                    <span className="text-blue-400">If Y ⊆ X, then X → Y</span><br/>
                    <span className="text-sm text-gray-400">Example: &#123;A, B&#125; → A</span>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">2. Augmentation:</strong><br/>
                    <span className="text-blue-400">If X → Y, then XZ → YZ</span><br/>
                    <span className="text-sm text-gray-400">Example: If A → B, then AC → BC</span>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">3. Transitivity:</strong><br/>
                    <span className="text-blue-400">If X → Y and Y → Z, then X → Z</span><br/>
                    <span className="text-sm text-gray-400">Example: If A → B and B → C, then A → C</span>
                  </div>
                </div>
              </div>

              {/* Secondary Rules */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Secondary Rules (Derived):</h4>
                <div className="space-y-3">
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">4. Union:</strong><br/>
                    <span className="text-green-400">If X → Y and X → Z, then X → YZ</span><br/>
                    <span className="text-sm text-gray-400">Example: If A → B and A → C, then A → BC</span>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">5. Decomposition:</strong><br/>
                    <span className="text-green-400">If X → YZ, then X → Y and X → Z</span><br/>
                    <span className="text-sm text-gray-400">Example: If A → BC, then A → B and A → C</span>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded">
                    <strong className="text-white">6. Pseudo-transitivity:</strong><br/>
                    <span className="text-green-400">If X → Y and WY → Z, then WX → Z</span><br/>
                    <span className="text-sm text-gray-400">Example: If A → B and CB → D, then CA → D</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Closure of Attributes */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Closure of Attributes</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">closure of a set of attributes X</strong> (denoted X⁺) is the set of all attributes that can be 
              functionally determined by X using the given functional dependencies.
            </p>
            
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
              <h4 className="font-semibold text-orange-400 mb-2">Algorithm to find X⁺:</h4>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Start with X⁺ = X</li>
                <li>For each FD Y → Z in the given set:</li>
                <li className="ml-4">If Y ⊆ X⁺, then add Z to X⁺</li>
                <li>Repeat step 2 until no more attributes can be added</li>
              </ol>
            </div>

            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500 mt-4">
              <h4 className="font-semibold text-orange-400 mb-2">Example:</h4>
              <div className="bg-gray-900/50 p-3 rounded">
                <strong className="text-white">Given FDs:</strong> <span className="text-orange-400">A → B, B → C, C → D</span><br/>
                <strong className="text-white">Find A⁺:</strong><br/>
                <div className="ml-4 mt-2 space-y-1 text-sm">
                  <p><span className="text-white">Step 1:</span> <span className="text-orange-400">A⁺ = &#123;A&#125;</span></p>
                  <p><span className="text-white">Step 2:</span> <span className="text-orange-400">A → B, so A⁺ = &#123;A, B&#125;</span></p>
                  <p><span className="text-white">Step 3:</span> <span className="text-orange-400">B → C, so A⁺ = &#123;A, B, C&#125;</span></p>
                  <p><span className="text-white">Step 4:</span> <span className="text-orange-400">C → D, so A⁺ = &#123;A, B, C, D&#125;</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Canonical Cover */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Canonical Cover</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              A <strong className="text-white">canonical cover</strong> is a minimal set of functional dependencies that is equivalent to the original set. 
              It has no redundant dependencies and each dependency is in standard form.
            </p>
            
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-400 mb-2">Properties of Canonical Cover:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>No extraneous attributes in any FD</li>
                <li>Each left side of FD is unique</li>
                <li>No redundant functional dependencies</li>
              </ul>
            </div>

            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500 mt-4">
              <h4 className="font-semibold text-pink-400 mb-2">Algorithm to find Canonical Cover:</h4>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Put FDs in standard form (single attribute on right side)</li>
                <li>Minimize left sides of FDs (remove extraneous attributes)</li>
                <li>Remove redundant FDs</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Practical Applications */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Practical Applications</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-semibold text-green-400">Uses of Functional Dependencies:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Database normalization</li>
                  <li>Identifying candidate keys</li>
                  <li>Detecting data redundancy</li>
                  <li>Query optimization</li>
                  <li>Schema design validation</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-blue-400">Benefits:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Reduces data redundancy</li>
                  <li>Prevents update anomalies</li>
                  <li>Ensures data consistency</li>
                  <li>Improves storage efficiency</li>
                  <li>Maintains data integrity</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FunctionalDependenciesSubtopic;
