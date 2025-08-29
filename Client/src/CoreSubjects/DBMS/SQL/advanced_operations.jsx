import React from 'react';

const AdvancedOperationsSubtopic = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">Advanced SQL Operations</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          Master complex SQL operations including subqueries, window functions, CTEs, and advanced data manipulation techniques.
        </p>
      </div>

      <div className="space-y-8">
        {/* Subqueries */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 mb-4">Subqueries</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Subqueries</strong> are queries nested inside another query. They can be used in SELECT, FROM, WHERE, and HAVING clauses.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-cyan-500">
                <h4 className="font-semibold text-cyan-400 mb-2">Types of Subqueries:</h4>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Scalar Subquery:</strong> Returns single value
                    </div>
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Row Subquery:</strong> Returns single row
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Column Subquery:</strong> Returns single column
                    </div>
                    <div className="text-sm text-gray-300">
                      <strong className="text-white">Table Subquery:</strong> Returns multiple rows/columns
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 1: Scalar Subquery in WHERE</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 2: Subquery with IN</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT product_name
FROM products
WHERE category_id IN (SELECT category_id 
                      FROM categories 
                      WHERE category_name = 'Electronics');`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 3: Correlated Subquery</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT e1.employee_name, e1.salary
FROM employees e1
WHERE e1.salary > (SELECT AVG(e2.salary)
                   FROM employees e2
                   WHERE e2.department = e1.department);`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Window Functions */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-purple-400 mb-4">Window Functions</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">Window Functions</strong> perform calculations across a set of rows related to the current row without collapsing the result set.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-purple-500">
                <h4 className="font-semibold text-purple-400 mb-2">Common Window Functions:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">ROW_NUMBER()</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">RANK()</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">DENSE_RANK()</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">NTILE()</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">LAG()</div>
                  <div className="bg-gray-900 text-green-400 p-2 rounded font-mono">LEAD()</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 1: ROW_NUMBER()</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) as row_num
FROM employees;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 2: RANK()</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name, salary,
       RANK() OVER (ORDER BY salary DESC) as rank_num
FROM employees;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 3: LAG()</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name, salary,
       LAG(salary, 1) OVER (ORDER BY salary DESC) as prev_salary
FROM employees;`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Common Table Expressions (CTEs) */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Common Table Expressions (CTEs)</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">CTEs</strong> provide a way to define temporary named result sets that can be referenced within a SELECT, INSERT, UPDATE, or DELETE statement.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                <h4 className="font-semibold text-blue-400 mb-2">Basic CTE Syntax:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`WITH cte_name (column1, column2, ...) AS (
  -- CTE query definition
  SELECT ...
)
SELECT * FROM cte_name;`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 1: Simple CTE</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`WITH high_earners AS (
  SELECT employee_name, salary
  FROM employees
  WHERE salary > 50000
)
SELECT department, COUNT(*) as high_earner_count
FROM high_earners
GROUP BY department;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-blue-500">
                  <h4 className="font-semibold text-blue-400 mb-2">Example 2: Recursive CTE</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`WITH RECURSIVE number_series AS (
  SELECT 1 as n
  UNION ALL
  SELECT n + 1
  FROM number_series
  WHERE n < 10
)
SELECT * FROM number_series;`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CASE Statements */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-yellow-400 mb-4">CASE Statements</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">CASE statements</strong> provide conditional logic in SQL queries, similar to if-else statements in programming languages.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                <h4 className="font-semibold text-yellow-400 mb-2">Simple CASE:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`SELECT
  employee_name,
  salary,
  CASE
    WHEN salary >= 80000 THEN 'High'
    WHEN salary >= 50000 THEN 'Medium'
    ELSE 'Low'
  END as salary_category
FROM employees;`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-400 mb-2">Example 1: CASE in Aggregation</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT
  department,
  COUNT(CASE WHEN salary >= 80000 THEN 1 END) as high_earners,
  COUNT(CASE WHEN salary BETWEEN 50000 AND 79999 THEN 1 END) as medium_earners,
  COUNT(CASE WHEN salary < 50000 THEN 1 END) as low_earners
FROM employees
GROUP BY department;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-yellow-500">
                  <h4 className="font-semibold text-yellow-400 mb-2">Example 2: CASE with UPDATE</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`UPDATE employees
SET bonus = CASE
  WHEN performance_rating = 'Excellent' THEN salary * 0.15
  WHEN performance_rating = 'Good' THEN salary * 0.10
  WHEN performance_rating = 'Average' THEN salary * 0.05
  ELSE 0
END;`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* UNION Operations */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-red-400 mb-4">UNION Operations</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              <strong className="text-white">UNION operations</strong> combine the results of multiple SELECT statements into a single result set.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">UNION vs UNION ALL:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1 mb-3">
                  <li><strong className="text-white">UNION:</strong> Removes duplicate rows</li>
                  <li><strong className="text-white">UNION ALL:</strong> Keeps all rows including duplicates</li>
                </ul>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`-- UNION (removes duplicates)
SELECT employee_name FROM employees WHERE department = 'IT'
UNION
SELECT employee_name FROM employees WHERE salary > 60000;

-- UNION ALL (keeps duplicates)
SELECT employee_name FROM employees WHERE department = 'IT'
UNION ALL
SELECT employee_name FROM employees WHERE salary > 60000;`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-400 mb-2">Example 1: INTERSECT</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name FROM employees WHERE department = 'IT'
INTERSECT
SELECT employee_name FROM employees WHERE salary > 60000;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                  <h4 className="font-semibold text-red-400 mb-2">Example 2: EXCEPT</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name FROM employees WHERE department = 'IT'
EXCEPT
SELECT employee_name FROM employees WHERE salary > 60000;`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pivot and Unpivot */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-indigo-400 mb-4">Data Transformation</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <p className="text-gray-300 mb-4">
              Transform data between row and column formats using pivot operations and conditional aggregation.
            </p>
            
            <div className="space-y-4">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                <h4 className="font-semibold text-indigo-400 mb-2">Manual Pivot with CASE:</h4>
                <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                  <pre>{`SELECT department,
       SUM(CASE WHEN EXTRACT(MONTH FROM hire_date) = 1 THEN 1 ELSE 0 END) as Jan,
       SUM(CASE WHEN EXTRACT(MONTH FROM hire_date) = 2 THEN 1 ELSE 0 END) as Feb,
       SUM(CASE WHEN EXTRACT(MONTH FROM hire_date) = 3 THEN 1 ELSE 0 END) as Mar
FROM employees
GROUP BY department;`}</pre>
                </div>
              </div>

              <div className="space-y-3">
                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-indigo-400 mb-2">Example 1: Dynamic Columns with JSON</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name,
       JSON_OBJECT(
         'salary', salary,
         'department', department,
         'hire_date', hire_date
       ) as employee_info
FROM employees;`}</pre>
                  </div>
                </div>

                <div className="bg-gray-800/70 p-4 rounded border-l-4 border-indigo-500">
                  <h4 className="font-semibold text-indigo-400 mb-2">Example 2: Unpivot with CROSS JOIN</h4>
                  <div className="bg-gray-900 text-green-400 p-3 rounded font-mono text-xs sm:text-sm overflow-x-auto">
                    <pre>{`SELECT employee_name, attribute, value
FROM employees
CROSS JOIN LATERAL (
  VALUES ('salary', salary),
         ('department', department),
         ('hire_date', hire_date)
) AS attributes (attribute, value);`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Performance Optimization */}
        <section>
          <h2 className="text-xl sm:text-2xl font-semibold text-blue-400 mb-4">Performance Tips</h2>
          <div className="bg-gray-700/50 p-4 sm:p-6 rounded-lg border border-gray-600">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-green-500">
                <h4 className="font-semibold text-green-400 mb-2">✅ Best Practices:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Use CTEs for complex queries instead of nested subqueries</li>
                  <li>Prefer EXISTS over IN for subqueries</li>
                  <li>Use window functions instead of self-joins when possible</li>
                  <li>Index columns used in WHERE and JOIN conditions</li>
                  <li>Use UNION ALL instead of UNION when duplicates don't matter</li>
                </ul>
              </div>
              
              <div className="bg-gray-800/70 p-4 rounded border-l-4 border-red-500">
                <h4 className="font-semibold text-red-400 mb-2">⚠️ Avoid:</h4>
                <ul className="list-disc list-inside text-gray-300 space-y-1">
                  <li>Correlated subqueries in large datasets</li>
                  <li>Functions in WHERE clauses on large tables</li>
                  <li>SELECT * in subqueries</li>
                  <li>Too many levels of nested subqueries</li>
                  <li>Unnecessary DISTINCT operations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdvancedOperationsSubtopic;
