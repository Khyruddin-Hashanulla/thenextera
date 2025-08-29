import React from 'react';

const BasicQueriesSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Basic SQL Queries</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Master the fundamental SQL operations: SELECT, INSERT, UPDATE, and DELETE for effective database manipulation.
        </p>
      </div>

      <div className="space-y-8">
        {/* SQL Overview */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">What is SQL?</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">SQL (Structured Query Language)</strong> is a standardized language for managing and manipulating relational databases. 
              It allows you to create, read, update, and delete data efficiently.
            </p>
            <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
              <h4 className="font-semibold text-white mb-2">SQL Categories:</h4>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm sm:text-base">
                <li><strong className="text-cyan-400">DDL (Data Definition Language):</strong> CREATE, ALTER, DROP</li>
                <li><strong className="text-green-400">DML (Data Manipulation Language):</strong> SELECT, INSERT, UPDATE, DELETE</li>
                <li><strong className="text-purple-400">DCL (Data Control Language):</strong> GRANT, REVOKE</li>
                <li><strong className="text-yellow-400">TCL (Transaction Control Language):</strong> COMMIT, ROLLBACK</li>
              </ul>
            </div>
          </div>
        </section>

        {/* SELECT Statement */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">SELECT Statement</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">SELECT</strong> statement is used to retrieve data from one or more tables in a database.
            </p>
            
            <div className="space-y-4">
              {/* Basic SELECT */}
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">Basic Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre className="whitespace-pre">
{`SELECT column1, column2, ...
FROM table_name
WHERE condition
ORDER BY column_name;`}
                  </pre>
                </div>
              </div>

              {/* Examples */}
              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 1: Select All Columns</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>SELECT * FROM employees;</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 2: Select Specific Columns</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>SELECT first_name, last_name, salary FROM employees;</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 3: Select with Alias</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>SELECT first_name AS "First Name", last_name AS "Last Name" FROM employees;</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 4: Select Distinct Values</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>SELECT DISTINCT department FROM employees;</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* WHERE Clause */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">WHERE Clause & Operators</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">WHERE</strong> clause is used to filter records based on specified conditions.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Comparison Operators:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">= (equal)</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">&lt;&gt; or != (not equal)</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">&gt; (greater than)</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">&lt; (less than)</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">&gt;= (greater than or equal)</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">&lt;= (less than or equal)</div>
                </div>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Logical Operators:</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">AND</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">OR</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">NOT</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">IN</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">BETWEEN</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">LIKE</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INSERT Statement */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">INSERT Statement</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">INSERT</strong> statement is used to add new records to a table.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Basic Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre className="whitespace-pre">
{`INSERT INTO table_name (column1, column2, column3, ...)
VALUES (value1, value2, value3, ...);`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Examples:</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-white">Insert single record:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      INSERT INTO students (name, email, age)
VALUES ('John Doe', 'john@email.com', 20);
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Insert multiple records:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      INSERT INTO students (name, email, age)
VALUES ('Alice Smith', 'alice@email.com', 19),
      ('Bob Johnson', 'bob@email.com', 21);
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Insert all columns:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      INSERT INTO students
VALUES (1, 'Jane Doe', 'jane@email.com', 22, 'CS');
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UPDATE Statement */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">UPDATE Statement</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">UPDATE</strong> statement is used to modify existing records in a table.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Basic Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre className="whitespace-pre">
{`UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">Examples:</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-white">Update single column:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      UPDATE students
SET email = 'newemail@example.com'
WHERE student_id = 1;
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Update multiple columns:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      UPDATE students
SET age = 23, department = 'IT'
WHERE name = 'John Doe';
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Update with condition:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      UPDATE students
SET age = age + 1
WHERE age &lt; 25;
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Important Warning:</h4>
                <p className="text-gray-300 text-sm">
                  Always use WHERE clause with UPDATE. Without it, ALL records in the table will be updated!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DELETE Statement */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">DELETE Statement</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              The <strong className="text-white">DELETE</strong> statement is used to remove existing records from a table.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Basic Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre className="whitespace-pre">
{`DELETE FROM table_name
WHERE condition;`}
                  </pre>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">Examples:</h4>
                <div className="space-y-3">
                  <div>
                    <strong className="text-white">Delete specific record:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      DELETE FROM students
WHERE student_id = 1;
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Delete with condition:</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      DELETE FROM students
WHERE age &lt; 18;
                    </div>
                  </div>
                  <div>
                    <strong className="text-white">Delete all records (use with caution):</strong>
                    <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm mt-1">
                      DELETE FROM students;
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-orange-500">
                <h4 className="font-semibold text-orange-400 mb-2">⚠️ Important Warning:</h4>
                <p className="text-gray-300 text-sm">
                  Always use WHERE clause with DELETE. Without it, ALL records in the table will be deleted!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Aggregate Functions */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">Aggregate Functions</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Aggregate functions</strong> perform calculations on multiple rows and return a single result.
            </p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Common Functions:</h4>
                <ul className="space-y-2 text-gray-300">
                  <li><strong className="text-indigo-400">COUNT():</strong> Count number of rows</li>
                  <li><strong className="text-indigo-400">SUM():</strong> Sum of numeric values</li>
                  <li><strong className="text-indigo-400">AVG():</strong> Average of numeric values</li>
                  <li><strong className="text-indigo-400">MAX():</strong> Maximum value</li>
                  <li><strong className="text-indigo-400">MIN():</strong> Minimum value</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Examples:</h4>
                <div className="space-y-2">
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    SELECT COUNT(*) FROM students;
                  </div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    SELECT AVG(age) FROM students;
                  </div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                    SELECT MAX(age), MIN(age) FROM students;
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* GROUP BY and HAVING */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">GROUP BY & HAVING</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-gray-500">
                <h4 className="font-semibold text-gray-400 mb-2">GROUP BY Clause:</h4>
                <p className="text-gray-300 mb-2">Groups rows that have the same values in specified columns.</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                  SELECT department, COUNT(*)
FROM students
GROUP BY department;
                </div>
              </div>

              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-gray-500">
                <h4 className="font-semibold text-gray-400 mb-2">HAVING Clause:</h4>
                <p className="text-gray-300 mb-2">Filters groups based on aggregate function results.</p>
                <div className="bg-gray-900 text-green-400 p-2 rounded font-mono text-xs sm:text-sm">
                  SELECT department, COUNT(*)
FROM students
GROUP BY department
HAVING COUNT(*) &gt; 5;
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BasicQueriesSubtopic;
