import React from 'react';

const JoinsSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">SQL Joins</h1>
        <p className="text-lg text-gray-300 leading-relaxed">
          Master SQL joins to combine data from multiple tables: INNER, LEFT, RIGHT, and FULL OUTER joins.
        </p>
      </div>

      <div className="space-y-8">
        {/* Joins Overview */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">What are SQL Joins?</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">SQL Joins</strong> are used to combine rows from two or more tables based on a related column between them. 
              Joins allow you to retrieve data from multiple tables in a single query.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">Why Use Joins?</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1">
                <li>Retrieve related data from normalized tables</li>
                <li>Avoid data duplication</li>
                <li>Create comprehensive reports</li>
                <li>Maintain referential integrity</li>
                <li>Optimize database design</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Sample Tables */}
        <section>
          <h2 className="text-2xl font-semibold text-cyan-400 mb-4">Sample Tables</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">Let's use these sample tables to demonstrate different types of joins:</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Students Table:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-2 text-cyan-400">student_id</th>
                        <th className="border border-gray-600 p-2 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-2 text-cyan-400">dept_id</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-2">1</td><td className="border border-gray-600 p-2">Alice</td><td className="border border-gray-600 p-2">101</td></tr>
                      <tr><td className="border border-gray-600 p-2">2</td><td className="border border-gray-600 p-2">Bob</td><td className="border border-gray-600 p-2">102</td></tr>
                      <tr><td className="border border-gray-600 p-2">3</td><td className="border border-gray-600 p-2">Charlie</td><td className="border border-gray-600 p-2">101</td></tr>
                      <tr><td className="border border-gray-600 p-2">4</td><td className="border border-gray-600 p-2">Diana</td><td className="border border-gray-600 p-2">103</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border border-gray-600">
                <h4 className="font-semibold text-white mb-2">Departments Table:</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-2 text-cyan-400">dept_id</th>
                        <th className="border border-gray-600 p-2 text-cyan-400">dept_name</th>
                        <th className="border border-gray-600 p-2 text-cyan-400">location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-2">101</td><td className="border border-gray-600 p-2">Computer Science</td><td className="border border-gray-600 p-2">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-2">102</td><td className="border border-gray-600 p-2">Mathematics</td><td className="border border-gray-600 p-2">Building B</td></tr>
                      <tr><td className="border border-gray-600 p-2">104</td><td className="border border-gray-600 p-2">Physics</td><td className="border border-gray-600 p-2">Building C</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INNER JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">INNER JOIN</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">INNER JOIN</strong> returns only the rows that have matching values in both tables.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre">
{`SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Example:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name, d.location
FROM students s
INNER JOIN departments d
ON s.dept_id = d.dept_id;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">dept_name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">Mathematics</td><td className="border border-gray-600 p-1">Building B</td></tr>
                      <tr><td className="border border-gray-600 p-1">Charlie</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-300 mt-1">Note: Diana is excluded because dept_id 103 doesn't exist in departments table</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEFT JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-purple-400 mb-4">LEFT JOIN (LEFT OUTER JOIN)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">LEFT JOIN</strong> returns all rows from the left table and matching rows from the right table. 
              If no match, NULL values are returned for right table columns.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre">
{`SELECT columns
FROM table1
LEFT JOIN table2
ON table1.column = table2.column;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Example:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name, d.location
FROM students s
LEFT JOIN departments d
ON s.dept_id = d.dept_id;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">dept_name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">Mathematics</td><td className="border border-gray-600 p-1">Building B</td></tr>
                      <tr><td className="border border-gray-600 p-1">Charlie</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Diana</td><td className="border border-gray-600 p-1">NULL</td><td className="border border-gray-600 p-1">NULL</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-300 mt-1">Note: All students are included, Diana has NULL values for department info</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-yellow-400 mb-4">RIGHT JOIN (RIGHT OUTER JOIN)</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">RIGHT JOIN</strong> returns all rows from the right table and matching rows from the left table. 
              If no match, NULL values are returned for left table columns.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre">
{`SELECT columns
FROM table1
RIGHT JOIN table2
ON table1.column = table2.column;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Example:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name, d.location
FROM students s
RIGHT JOIN departments d
ON s.dept_id = d.dept_id;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">dept_name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Charlie</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">Mathematics</td><td className="border border-gray-600 p-1">Building B</td></tr>
                      <tr><td className="border border-gray-600 p-1">NULL</td><td className="border border-gray-600 p-1">Physics</td><td className="border border-gray-600 p-1">Building C</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-300 mt-1">Note: All departments are included, Physics has NULL for student name</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FULL OUTER JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-red-400 mb-4">FULL OUTER JOIN</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">FULL OUTER JOIN</strong> returns all rows from both tables. If there's no match, 
              NULL values are returned for the missing side.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre">
{`SELECT columns
FROM table1
FULL OUTER JOIN table2
ON table1.column = table2.column;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Example:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name, d.location
FROM students s
FULL OUTER JOIN departments d
ON s.dept_id = d.dept_id;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">dept_name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">location</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Charlie</td><td className="border border-gray-600 p-1">Computer Science</td><td className="border border-gray-600 p-1">Building A</td></tr>
                      <tr><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">Mathematics</td><td className="border border-gray-600 p-1">Building B</td></tr>
                      <tr><td className="border border-gray-600 p-1">Diana</td><td className="border border-gray-600 p-1">NULL</td><td className="border border-gray-600 p-1">NULL</td></tr>
                      <tr><td className="border border-gray-600 p-1">NULL</td><td className="border border-gray-600 p-1">Physics</td><td className="border border-gray-600 p-1">Building C</td></tr>
                    </tbody>
                  </table>
                  <p className="text-xs text-gray-300 mt-1">Note: All records from both tables are included with NULLs where no match exists</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CROSS JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-400 mb-4">CROSS JOIN</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">CROSS JOIN</strong> returns the Cartesian product of both tables - every row from the first table 
              combined with every row from the second table.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                  <pre className="whitespace-pre">
{`SELECT columns
FROM table1
CROSS JOIN table2;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Example:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name
FROM students s
CROSS JOIN departments d;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong> 4 students × 3 departments = 12 rows
                  <p className="text-xs text-gray-300 mt-1">
                    Each student will be paired with each department (Alice-CS, Alice-Math, Alice-Physics, Bob-CS, Bob-Math, etc.)
                  </p>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">⚠️ Warning:</h4>
                <p className="text-gray-300 text-sm">
                  CROSS JOIN can produce very large result sets. Use with caution on large tables!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SELF JOIN */}
        <section>
          <h2 className="text-2xl font-semibold text-orange-400 mb-4">SELF JOIN</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">SELF JOIN</strong> is used to join a table with itself. This is useful for hierarchical data 
              or when you need to compare rows within the same table.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Example: Employee-Manager Relationship</h4>
                <div className="bg-gray-700/50 p-3 rounded mb-3">
                  <strong className="text-white">Employees Table:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">emp_id</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">name</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">manager_id</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">1</td><td className="border border-gray-600 p-1">John</td><td className="border border-gray-600 p-1">NULL</td></tr>
                      <tr><td className="border border-gray-600 p-1">2</td><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">1</td></tr>
                      <tr><td className="border border-gray-600 p-1">3</td><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">1</td></tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm mb-3">
                  <pre className="whitespace-pre">
{`SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m
ON e.manager_id = m.emp_id;`}
                  </pre>
                </div>
                
                <div className="bg-gray-700/50 p-3 rounded">
                  <strong className="text-white">Result:</strong>
                  <table className="w-full text-xs mt-2 border-collapse border border-gray-600">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="border border-gray-600 p-1 text-cyan-400">employee</th>
                        <th className="border border-gray-600 p-1 text-cyan-400">manager</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-300">
                      <tr><td className="border border-gray-600 p-1">John</td><td className="border border-gray-600 p-1">NULL</td></tr>
                      <tr><td className="border border-gray-600 p-1">Alice</td><td className="border border-gray-600 p-1">John</td></tr>
                      <tr><td className="border border-gray-600 p-1">Bob</td><td className="border border-gray-600 p-1">John</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Multiple Joins */}
        <section>
          <h2 className="text-2xl font-semibold text-pink-400 mb-4">Multiple Joins</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              You can join multiple tables in a single query by chaining JOIN clauses.
            </p>
            
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-pink-500">
              <h4 className="font-semibold text-pink-400 mb-2">Example: Students, Departments, and Courses</h4>
              <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-sm">
                <pre className="whitespace-pre">
{`SELECT s.name, d.dept_name, c.course_name
FROM students s
INNER JOIN departments d ON s.dept_id = d.dept_id
INNER JOIN enrollments e ON s.student_id = e.student_id
INNER JOIN courses c ON e.course_id = c.course_id;`}
                </pre>
              </div>
            </div>
          </div>
        </section>

        {/* Join Performance Tips */}
        <section>
          <h2 className="text-2xl font-semibold text-blue-400 mb-4">Performance Tips</h2>
          <div className="bg-gray-700/50 p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">✅ Best Practices:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Use indexes on join columns</li>
                  <li>Join on primary/foreign keys when possible</li>
                  <li>Use INNER JOIN when you don't need unmatched rows</li>
                  <li>Filter early with WHERE clauses</li>
                  <li>Use table aliases for readability</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Avoid:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Joining on non-indexed columns</li>
                  <li>Using functions in JOIN conditions</li>
                  <li>Unnecessary CROSS JOINs</li>
                  <li>Too many joins in one query</li>
                  <li>Joining large tables without filters</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default JoinsSubtopic;
