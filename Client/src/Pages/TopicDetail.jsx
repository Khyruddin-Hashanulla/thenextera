import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaCircle,
  FaBook,
  FaClock,
  FaGraduationCap,
  FaChevronLeft,
  FaChevronRight,
  FaSpinner,
  FaExclamationTriangle,
  FaDatabase,
} from "react-icons/fa";

const TopicDetail = () => {
  const { subjectId, topicId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [topic, setTopic] = useState(null);
  const [subject, setSubject] = useState(null);
  const [currentSection, setCurrentSection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);

  // Updated mock data with section-based structure matching SubjectDetail.jsx
  const mockSubjects = {
    1: {
      id: 1,
      name: "Database Management Systems (DBMS)",
      icon: FaDatabase,
      sections: [
        {
          id: 1,
          title: "Database Fundamentals",
          topics: [
            {
              id: 1,
              title: "Introduction to Database & DBMS",
              completed: true,
              duration: "45 min",
              content: {
                definition:
                  "A database is a collection of related data which represents some aspect of the real world. A database system is designed to be built and populated with data for a certain task.",
                dbms: "Database Management System (DBMS) is a software for storing and retrieving users' data while considering appropriate security measures. It consists of a group of programs which manipulate the database. The DBMS accepts the request for data from an application and instructs the operating system to provide the specific data. In large systems, a DBMS helps users and other third-party software to store and retrieve data.",
                problems: {
                  title:
                    "Database management systems were developed to handle the following difficulties of typical File-processing systems supported by conventional operating systems:",
                  list: [
                    "Data redundancy and inconsistency",
                    "Difficulty in accessing data",
                    "Data isolation – multiple files and formats",
                    "Integrity problems",
                    "Atomicity of updates",
                    "Concurrent access by multiple users",
                    "Security problems",
                  ],
                },
              },
            },
            {
              id: 2,
              title: "Database Architecture",
              completed: true,
              duration: "50 min",
              content: {
                definition:
                  "Database architecture describes the design of a database system, including its components and how they interact. It defines the structure, organization, and relationships between different elements of a database management system.",
                types: {
                  title: "Types of Database Architecture:",
                  architectures: [
                    {
                      name: "Single-Tier Architecture (1-Tier)",
                      description:
                        "The database is directly available to the user. The user can directly sit on the DBMS and use it. Any changes done here will directly be done on the database itself.",
                    },
                    {
                      name: "Two-Tier Architecture (2-Tier)",
                      description:
                        "The application layer sits between the user and the database. The user cannot directly access the database. The application layer acts as a mediator between the user and the database.",
                    },
                    {
                      name: "Three-Tier Architecture (3-Tier)",
                      description:
                        "Contains three layers: Presentation Layer (User Interface), Application Layer (Business Logic), and Database Layer (Data Storage). This provides better security, scalability, and maintainability.",
                    },
                  ],
                },
                levels: {
                  title:
                    "Levels of Database Architecture (Three-Schema Architecture):",
                  schemas: [
                    {
                      name: "External Level (View Level)",
                      description:
                        "Describes how users view the data. Different users may have different views of the same database. It provides data independence and security by hiding irrelevant data from users.",
                    },
                    {
                      name: "Conceptual Level (Logical Level)",
                      description:
                        "Describes what data is stored in the database and the relationships among the data. It represents the entire database for a community of users, hiding physical storage details.",
                    },
                    {
                      name: "Internal Level (Physical Level)",
                      description:
                        "Describes how data is physically stored in the database. It deals with storage structures, access paths, indexes, and data compression techniques.",
                    },
                  ],
                },
                components: {
                  title: "Key Components of Database Architecture:",
                  list: [
                    "Database Engine - Core service for accessing and processing data",
                    "Database Schema - Logical structure and organization of data",
                    "Query Processor - Interprets and executes database queries",
                    "Transaction Manager - Ensures ACID properties of transactions",
                    "Storage Manager - Manages physical storage of data",
                    "Buffer Manager - Manages memory allocation for database operations",
                    "Security Manager - Handles authentication and authorization",
                    "Recovery Manager - Handles backup and recovery operations",
                  ],
                },
              },
            },
            {
              id: 3,
              title: "Data Models",
              completed: false,
              duration: "40 min",
              content: {
                importance: {
                  title: "Importance of Data Models:",
                  points: [
                    "Provide a clear understanding of data requirements",
                    "Facilitate communication between stakeholders",
                    "Ensure data consistency and integrity",
                    "Guide database design and implementation",
                    "Support data independence and abstraction",
                  ],
                },
                types: {
                  title: "Types of Data Models:",
                  models: [
                    {
                      name: "Hierarchical Model",
                      description:
                        "Organizes data in a tree-like structure where each record has one parent and can have multiple children. Data is accessed through a predefined path from root to leaf.",
                      characteristics: [
                        "Tree-like structure with parent-child relationships",
                        "One-to-many relationships between parent and child nodes",
                        "Root node at the top with no parent",
                        "Each child node has exactly one parent",
                        "Navigation follows predefined paths",
                      ],
                      advantages: [
                        "Simple and easy to understand structure",
                        "Fast data retrieval for hierarchical queries",
                        "Data integrity through parent-child relationships",
                        "Efficient storage for tree-structured data",
                      ],
                      disadvantages: [
                        "Inflexible structure - difficult to reorganize",
                        "Data redundancy issues",
                        "Limited query capabilities",
                        "Difficulty in representing many-to-many relationships",
                      ],
                      examples: [
                        "IBM IMS",
                        "Windows Registry",
                        "XML documents",
                      ],
                    },
                    {
                      name: "Network Model",
                      description:
                        "Extends the hierarchical model by allowing each record to have multiple parents, creating a graph-like structure with more flexible relationships.",
                      characteristics: [
                        "Graph-like structure with multiple parent-child relationships",
                        "Records can have multiple parents and children",
                        "Uses sets to define relationships",
                        "More flexible than hierarchical model",
                        "Supports many-to-many relationships",
                      ],
                      advantages: [
                        "More flexible than hierarchical model",
                        "Supports complex relationships",
                        "Better representation of real-world scenarios",
                        "Efficient for complex queries",
                      ],
                      disadvantages: [
                        "Complex structure and navigation",
                        "Requires detailed knowledge of database structure",
                        "Difficult to maintain and modify",
                        "Programming complexity",
                      ],
                      examples: ["IDMS", "Integrated Data Store", "CODASYL"],
                    },
                    {
                      name: "Relational Model",
                      description:
                        "Organizes data in tables (relations) with rows and columns. Based on mathematical set theory and first-order predicate logic.",
                      characteristics: [
                        "Data stored in tables (relations)",
                        "Each table has rows (tuples) and columns (attributes)",
                        "Primary keys uniquely identify rows",
                        "Foreign keys establish relationships between tables",
                        "Supports SQL for data manipulation",
                      ],
                      advantages: [
                        "Simple and intuitive table structure",
                        "Data independence and flexibility",
                        "Powerful query language (SQL)",
                        "ACID properties for transactions",
                        "Mature technology with wide support",
                      ],
                      disadvantages: [
                        "Performance issues with complex queries",
                        "Object-relational impedance mismatch",
                        "Limited support for complex data types",
                        "Scalability challenges for very large datasets",
                      ],
                      examples: ["MySQL", "PostgreSQL", "Oracle", "SQL Server"],
                    },
                    {
                      name: "Object-Oriented Model",
                      description:
                        "Combines database capabilities with object-oriented programming concepts, storing objects directly in the database.",
                      characteristics: [
                        "Objects with attributes and methods",
                        "Inheritance and polymorphism support",
                        "Complex data types and relationships",
                        "Object identity and encapsulation",
                        "Direct storage of programming objects",
                      ],
                      advantages: [
                        "Natural fit for object-oriented applications",
                        "Support for complex data types",
                        "Inheritance and code reusability",
                        "Rich modeling capabilities",
                      ],
                      disadvantages: [
                        "Limited adoption and tool support",
                        "Performance overhead",
                        "Complexity in query optimization",
                        "Lack of standardization",
                      ],
                      examples: ["ObjectDB", "Versant", "ZODB"],
                    },
                    {
                      name: "Object-Relational Model",
                      description:
                        "Hybrid approach that extends relational databases with object-oriented features, combining the best of both worlds.",
                      characteristics: [
                        "Tables with object-oriented extensions",
                        "User-defined types and functions",
                        "Inheritance in table structures",
                        "Complex data types support",
                        "SQL extensions for object features",
                      ],
                      advantages: [
                        "Backward compatibility with relational systems",
                        "Support for complex data types",
                        "Gradual migration path",
                        "Combines relational and object benefits",
                      ],
                      disadvantages: [
                        "Increased complexity",
                        "Performance overhead",
                        "Learning curve for developers",
                        "Potential for design inconsistencies",
                      ],
                      examples: ["PostgreSQL", "Oracle", "IBM DB2"],
                    },
                    {
                      name: "NoSQL Models",
                      description:
                        "Non-relational database models designed for distributed data storage, scalability, and flexibility with various data structures.",
                      characteristics: [
                        "Schema-less or flexible schema",
                        "Horizontal scalability",
                        "Distributed architecture",
                        "High availability and partition tolerance",
                        "Optimized for specific use cases",
                      ],
                      advantages: [
                        "High scalability and performance",
                        "Flexible data models",
                        "Cost-effective for large datasets",
                        "Better handling of unstructured data",
                      ],
                      disadvantages: [
                        "Limited ACID properties",
                        "Eventual consistency challenges",
                        "Less mature ecosystem",
                        "Query complexity for some operations",
                      ],
                      types: [
                        {
                          name: "Document Store",
                          description:
                            "Stores data as documents (JSON, BSON, XML)",
                          examples: ["MongoDB", "CouchDB", "Amazon DocumentDB"],
                        },
                        {
                          name: "Key-Value Store",
                          description:
                            "Simple key-value pairs for fast lookups",
                          examples: ["Redis", "Amazon DynamoDB", "Riak"],
                        },
                        {
                          name: "Column Family",
                          description:
                            "Stores data in column families for analytics",
                          examples: ["Cassandra", "HBase", "Amazon SimpleDB"],
                        },
                        {
                          name: "Graph Database",
                          description:
                            "Optimized for graph structures and relationships",
                          examples: ["Neo4j", "Amazon Neptune", "ArangoDB"],
                        },
                      ],
                    },
                  ],
                },
                evolution: {
                  title: "Evolution of Data Models",
                  timeline: [
                    {
                      era: "1960s",
                      model: "Hierarchical Model",
                      description:
                        "First database model with tree-like structure for mainframe systems",
                    },
                    {
                      era: "1970s",
                      model: "Network Model",
                      description:
                        "Extended hierarchical model with graph-like relationships",
                    },
                    {
                      era: "1970s",
                      model: "Relational Model",
                      description:
                        "Revolutionary table-based approach by Edgar F. Codd",
                    },
                    {
                      era: "1980s",
                      model: "Object-Oriented Model",
                      description:
                        "Integration of OOP concepts with database systems",
                    },
                    {
                      era: "1990s",
                      model: "Object-Relational Model",
                      description:
                        "Hybrid approach combining relational and object features",
                    },
                    {
                      era: "2000s",
                      model: "NoSQL Models",
                      description:
                        "Distributed, scalable models for big data and web applications",
                    },
                  ],
                },
                selection: {
                  title: "Choosing the Right Data Model",
                  factors: [
                    "Data structure and complexity requirements",
                    "Scalability and performance needs",
                    "Consistency vs. availability trade-offs",
                    "Development team expertise",
                    "Integration with existing systems",
                    "Budget and licensing considerations",
                    "Future growth and evolution plans",
                  ],
                },
                realWorld: {
                  title: "Real-World Applications",
                  examples: [
                    {
                      domain: "E-commerce",
                      model: "Relational + NoSQL",
                      reason:
                        "Product catalogs in document stores, transactions in relational databases",
                    },
                    {
                      domain: "Social Networks",
                      model: "Graph + Document",
                      reason:
                        "User relationships in graph databases, posts/content in document stores",
                    },
                    {
                      domain: "Banking",
                      model: "Relational",
                      reason:
                        "ACID compliance, complex transactions, regulatory requirements",
                    },
                    {
                      domain: "Content Management",
                      model: "Document Store",
                      reason:
                        "Flexible content structure, rapid development, schema evolution",
                    },
                    {
                      domain: "IoT Applications",
                      model: "Time-Series + Column",
                      reason:
                        "High-volume sensor data, time-based queries, analytics",
                    },
                    {
                      domain: "Gaming",
                      model: "Key-Value + Document",
                      reason:
                        "Fast lookups for player data, flexible game state storage",
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          id: 2,
          title: "ER Diagrams",
          topics: [
            {
              id: 4,
              title: "Entity Sets",
              completed: false,
              duration: "60 min",
              content: {
                definition:
                  "ER diagram or Entity Relationship diagram is a conceptual model that gives the graphical representation of the logical structure of the database. It shows all the constraints and relationships that exist among the different components.",
                components:
                  "An ER diagram is mainly composed of following three components- Entity Sets, Attributes and Relationship Set. Roll_no is a primary key that can identify each entity uniquely. Thus, by using a student's roll number, a student can be identified uniquely.",
                entitySets: {
                  title:
                    "Entity Set: An entity set is a set of the same type of entities.",
                  strong: {
                    title: "Strong Entity Set:",
                    points: [
                      "A strong entity set is an entity set that contains sufficient attributes to uniquely identify all its entities.",
                      "In other words, a primary key exists for a strong entity set.",
                      "Primary key of a strong entity set is represented by underlining it.",
                    ],
                  },
                  weak: {
                    title: "Weak Entity Set:",
                    points: [
                      "A weak entity set is an entity set that does not contain sufficient attributes to uniquely identify its entities.",
                      "In other words, a primary key does not exist for a weak entity set.",
                      "However, it contains a partial key called a discriminator.",
                      "Discriminator can identify a group of entities from the entity set.",
                      "Discriminator is represented by underlining with a dashed line.",
                    ],
                  },
                },
                attributes: {
                  title:
                    "Attributes: Properties that describe an entity or relationship.",
                  types: [
                    {
                      name: "Simple Attribute",
                      description:
                        "Cannot be divided into smaller parts. Example: Age, Name",
                    },
                    {
                      name: "Composite Attribute",
                      description:
                        "Can be divided into smaller sub-parts. Example: Address (Street, City, State, ZIP)",
                    },
                    {
                      name: "Single-valued Attribute",
                      description:
                        "Contains single value for each entity. Example: Student ID",
                    },
                    {
                      name: "Multi-valued Attribute",
                      description:
                        "Contains multiple values for each entity. Example: Phone Numbers",
                    },
                    {
                      name: "Derived Attribute",
                      description:
                        "Value is derived from other attributes. Example: Age from Date of Birth",
                    },
                    {
                      name: "Key Attribute",
                      description:
                        "Used to uniquely identify entities in an entity set. Underlined in ER diagrams",
                    },
                  ],
                },
                relationships: {
                  title:
                    "Relationship: A relationship is defined as an association among several entities.",
                  types: [
                    {
                      name: "Unary Relationship Set",
                      description:
                        "Unary relationship set is a relationship set where only one entity set participates in a relationship set.",
                    },
                    {
                      name: "Binary Relationship Set",
                      description:
                        "Binary relationship set is a relationship set where two entity sets participate in a relationship set.",
                    },
                    {
                      name: "Ternary Relationship Set",
                      description:
                        "Ternary relationship set is a relationship set where three entity sets participate in a relationship set.",
                    },
                    {
                      name: "N-ary Relationship Set",
                      description:
                        "N-ary relationship set is a relationship set where 'n' entity sets participate in a relationship set.",
                    },
                  ],
                },
              },
            },
            {
              id: 5,
              title: "Relationships",
              completed: false,
              duration: "45 min",
              content: {
                definition:
                  "Cardinality and participation constraints are essential concepts in ER modeling that define how entities relate to each other in a database system.",
                cardinality: {
                  title:
                    "Cardinality Constraints: Define the number of entities that can participate in a relationship.",
                  types: [
                    {
                      name: "One-to-One (1:1)",
                      description:
                        "Each entity in A is associated with at most one entity in B, and vice versa.",
                      example:
                        "Person Passport: Each person has one passport, each passport belongs to one person",
                    },
                    {
                      name: "One-to-Many (1:M)",
                      description:
                        "Each entity in A can be associated with multiple entities in B, but each entity in B is associated with at most one entity in A.",
                      example:
                        "Department Employee: One department has many employees, each employee belongs to one department",
                    },
                    {
                      name: "Many-to-One (M:1)",
                      description:
                        "Multiple entities in A can be associated with one entity in B.",
                      example:
                        "Student University: Many students belong to one university",
                    },
                    {
                      name: "Many-to-Many (M:M)",
                      description:
                        "Entities in A can be associated with multiple entities in B, and vice versa.",
                      example:
                        "Student Course: Students can enroll in multiple courses, courses can have multiple students",
                    },
                  ],
                },
                participation: {
                  title:
                    "Participation Constraints: Define whether all entities must participate in a relationship.",
                  types: [
                    {
                      name: "Total Participation (Existence Dependency)",
                      description:
                        "Every entity in the entity set must participate in the relationship. Represented by double lines.",
                      example: "Every employee must work for a department",
                      notation: "Double line connecting entity to relationship",
                    },
                    {
                      name: "Partial Participation",
                      description:
                        "Some entities may not participate in the relationship. Represented by single lines.",
                      example: "Not all employees manage a department",
                      notation: "Single line connecting entity to relationship",
                    },
                  ],
                },
                notation: {
                  title: "ER Diagram Notation:",
                  symbols: [
                    "Rectangle: Entity Set",
                    "Diamond: Relationship Set",
                    "Oval: Attribute",
                    "Double Rectangle: Weak Entity Set",
                    "Double Diamond: Identifying Relationship",
                    "Underline: Primary Key",
                    "Dashed Underline: Partial Key",
                    "Double Line: Total Participation",
                    "Single Line: Partial Participation",
                  ],
                },
              },
            },
            {
              id: 6,
              title: "Cardinality",
              completed: false,
              duration: "55 min",
              content: {
                definition:
                  "The process of converting an Entity-Relationship (ER) diagram into a relational database schema involves systematic transformation of entities, attributes, and relationships into tables.",
                steps: {
                  title: "ER to Relational Mapping Steps:",
                  process: [
                    {
                      step: "Step 1: Map Strong Entity Sets",
                      description:
                        "Create a table for each strong entity set with all simple attributes as columns. Choose primary key.",
                      example:
                        "Entity 'Student' Table 'Student' with columns (student_id, name, age, email)",
                    },
                    {
                      step: "Step 2: Map Weak Entity Sets",
                      description:
                        "Create table with discriminator + primary key of owner entity as composite primary key.",
                      example:
                        "Weak entity 'Dependent' Table with (employee_id, dependent_name, relationship)",
                    },
                    {
                      step: "Step 3: Map 1:1 Relationships",
                      description:
                        "Add foreign key in either table or create separate relationship table.",
                      example:
                        "Person-Passport: Add passport_id in Person table or vice versa",
                    },
                    {
                      step: "Step 4: Map 1:M Relationships",
                      description:
                        "Add foreign key on the 'many' side referencing the 'one' side.",
                      example:
                        "Department-Employee: Add dept_id in Employee table",
                    },
                    {
                      step: "Step 5: Map M:M Relationships",
                      description:
                        "Create separate junction table with foreign keys from both entities.",
                      example:
                        "Student-Course: Create 'Enrollment' table with (student_id, course_id)",
                    },
                    {
                      step: "Step 6: Map Multivalued Attributes",
                      description:
                        "Create separate table with foreign key to main entity.",
                      example:
                        "Employee phone numbers: 'Employee_Phone' table with (emp_id, phone_number)",
                    },
                    {
                      step: "Step 7: Map Composite Attributes",
                      description:
                        "Break into simple attributes or keep as single column based on usage.",
                      example:
                        "Address: Separate columns (street, city, state, zip) or single address column",
                    },
                  ],
                },
                examples: {
                  title: "Mapping Examples:",
                  cases: [
                    {
                      name: "University Database",
                      entities: "Student, Course, Department, Professor",
                      relationships:
                        "Student enrolls in Course (M:M), Professor teaches Course (1:M), Department offers Course (1:M)",
                      tables:
                        "Student, Course, Department, Professor, Enrollment (Student_ID, Course_ID, Grade)",
                    },
                    {
                      name: "Library System",
                      entities: "Book, Member, Author",
                      relationships:
                        "Member borrows Book (M:M), Author writes Book (M:M)",
                      tables:
                        "Book, Member, Author, Borrowing (Member_ID, Book_ID, Date), Book_Author (Book_ID, Author_ID)",
                    },
                  ],
                },
                considerations: {
                  title: "Design Considerations:",
                  points: [
                    "Maintain referential integrity with foreign key constraints",
                    "Consider normalization to reduce redundancy",
                    "Choose appropriate data types and sizes",
                    "Add indexes for frequently queried columns",
                    "Handle NULL values appropriately",
                    "Consider performance implications of design choices",
                  ],
                },
              },
            },
          ],
        },
        {
          id: 3,
          title: "Relational Model",
          topics: [
            {
              id: 7,
              title: "Keys and Constraints",
              completed: false,
              duration: "55 min",
              content: {
                definition:
                  "The relational model represents data as a collection of relations (tables). Each relation consists of a set of tuples (rows) and attributes (columns).",
                concepts: {
                  title: "Key Concepts:",
                  list: [
                    "Relation (Table) - A collection of related data entries",
                    "Tuple (Row) - A single record in a relation",
                    "Attribute (Column) - A property of the relation",
                    "Domain - Set of allowable values for an attribute",
                    "Schema - Structure of the relation",
                    "Instance - Actual data in the relation at a given time",
                  ],
                },
                keys: {
                  title: "Keys in Relational Model:",
                  types: [
                    {
                      name: "Super Key",
                      description:
                        "A set of attributes that can uniquely identify a tuple in a relation.",
                    },
                    {
                      name: "Candidate Key",
                      description:
                        "A minimal super key - no proper subset is a super key.",
                    },
                    {
                      name: "Primary Key",
                      description:
                        "A candidate key chosen to uniquely identify tuples in a relation.",
                    },
                    {
                      name: "Foreign Key",
                      description:
                        "An attribute that references the primary key of another relation.",
                    },
                    {
                      name: "Alternate Key",
                      description:
                        "Candidate keys that are not chosen as primary key.",
                    },
                  ],
                },
                integrity: {
                  title: "Integrity Constraints:",
                  constraints: [
                    {
                      name: "Entity Integrity",
                      description: "Primary key cannot be NULL or duplicate.",
                    },
                    {
                      name: "Referential Integrity",
                      description:
                        "Foreign key must reference an existing primary key value or be NULL.",
                    },
                    {
                      name: "Domain Integrity",
                      description:
                        "Attribute values must be from the specified domain.",
                    },
                    {
                      name: "Key Integrity",
                      description: "Key constraints must be satisfied.",
                    },
                  ],
                },
              },
            },
            {
              id: 8,
              title: "Functional Dependencies",
              completed: false,
              duration: "50 min",
              content: {
                definition:
                  "A functional dependency is a constraint that describes the relationship between attributes in a relation. It specifies that the value of one attribute (or set of attributes) determines the value of another attribute.",
                concept: {
                  title: "Understanding Functional Dependencies:",
                  explanation:
                    "If X Y (read as 'X functionally determines Y'), then for any two tuples t1 and t2 in a relation, if t1[X] = t2[X], then t1[Y] = t2[Y]. This means that whenever we have the same value for X, we must have the same value for Y.",
                  notation:
                    "X Y means X functionally determines Y, where X is the determinant and Y is the dependent.",
                },
                types: {
                  title: "Types of Functional Dependencies:",
                  categories: [
                    {
                      name: "Trivial Functional Dependency",
                      description:
                        "A functional dependency X Y is trivial if Y is a subset of X.",
                      example:
                        "If X = {A, B} and Y = {A}, then X Y is trivial because A is part of X.",
                      characteristics: [
                        "Always satisfied",
                        "Not useful for database design",
                        "Y X",
                      ],
                    },
                    {
                      name: "Non-trivial Functional Dependency",
                      description:
                        "A functional dependency X Y is non-trivial if Y is not a subset of X.",
                      example:
                        "Student_ID Student_Name (Student_Name is not part of Student_ID)",
                      characteristics: [
                        "Provides meaningful constraints",
                        "Useful for normalization",
                        "Y X",
                      ],
                    },
                    {
                      name: "Completely Non-trivial Functional Dependency",
                      description:
                        "X Y is completely non-trivial if X Y = (no common attributes).",
                      example: "Employee_ID {Name, Salary, Department}",
                      characteristics: [
                        "Most restrictive type",
                        "No overlap between X and Y",
                        "Strongest constraint",
                      ],
                    },
                    {
                      name: "Partial Functional Dependency",
                      description:
                        "A non-prime attribute is functionally dependent on a proper subset of a candidate key.",
                      example:
                        "In relation R(A,B,C) with key {A,B}, if A C, then C is partially dependent on {A,B}",
                      characteristics: [
                        "Violates 2NF",
                        "Causes redundancy",
                        "Source of update anomalies",
                      ],
                    },
                    {
                      name: "Full Functional Dependency",
                      description:
                        "A non-prime attribute is functionally dependent on the entire candidate key, not on any proper subset.",
                      example:
                        "Student_ID, Course_ID Grade (Grade depends on both Student_ID and Course_ID)",
                      characteristics: [
                        "Satisfies 2NF requirement",
                        "No redundancy from partial dependencies",
                      ],
                    },
                    {
                      name: "Transitive Functional Dependency",
                      description:
                        "If X Y and Y Z, then X Z is a transitive dependency (where Y is not a candidate key).",
                      example: "Student_ID Department_ID Department_Name",
                      characteristics: [
                        "Violates 3NF",
                        "Indirect dependency",
                        "Causes update anomalies",
                      ],
                    },
                  ],
                },
                rules: {
                  title: "Armstrong's Axioms (Inference Rules):",
                  description:
                    "These are sound and complete rules for inferring functional dependencies.",
                  axioms: [
                    {
                      name: "Reflexivity (Trivial Rule)",
                      rule: "If Y X, then X Y",
                      example:
                        "If X = {A, B, C}, then X A, X B, X C, X {A,B}, etc.",
                    },
                    {
                      name: "Augmentation",
                      rule: "If X Y, then XZ YZ for any set Z",
                      example: "If A B, then AC BC",
                    },
                    {
                      name: "Transitivity",
                      rule: "If X Y and Y Z, then X Z",
                      example: "If A B and B C, then A C",
                    },
                  ],
                  derived: [
                    {
                      name: "Union",
                      rule: "If X Y and X Z, then X YZ",
                      example: "If A B and A C, then A BC",
                    },
                    {
                      name: "Decomposition",
                      rule: "If X YZ, then X Y and X Z",
                      example: "If A BC, then A B and A C",
                    },
                    {
                      name: "Pseudo-transitivity",
                      rule: "If X Y and WY Z, then WX Z",
                      example: "If A B and CB D, then CA D",
                    },
                  ],
                },
                closure: {
                  title: "Attribute Closure:",
                  definition:
                    "The closure of a set of attributes X (denoted X+) is the set of all attributes that can be functionally determined by X.",
                  algorithm: [
                    "Start with X+ = X",
                    "For each functional dependency Y Z in F:",
                    "  If Y X+, then X+ = X+ Z",
                    "Repeat until no more attributes can be added to X+",
                  ],
                  uses: [
                    "Determine if X Y holds (check if Y X+)",
                    "Find candidate keys",
                    "Check if a set of FDs is equivalent to another",
                    "Minimize sets of functional dependencies",
                  ],
                },
                examples: {
                  title: "Practical Examples:",
                  scenarios: [
                    {
                      relation:
                        "Student(StudentID, Name, Email, DeptID, DeptName, DeptHead)",
                      dependencies: [
                        "StudentID Name, Email, DeptID",
                        "DeptID DeptName, DeptHead",
                        "Email StudentID (assuming unique emails)",
                      ],
                      analysis:
                        "StudentID DeptName is transitive (via DeptID), violating 3NF",
                    },
                    {
                      relation:
                        "Course(CourseID, CourseName, InstructorID, InstructorName, Credits)",
                      dependencies: [
                        "CourseID CourseName, InstructorID, Credits",
                        "InstructorID InstructorName",
                      ],
                      analysis:
                        "CourseID InstructorName is transitive, needs normalization",
                    },
                  ],
                },
                applications: {
                  title: "Applications in Database Design:",
                  uses: [
                    "Database normalization to eliminate redundancy",
                    "Identifying candidate keys and primary keys",
                    "Schema decomposition and synthesis",
                    "Query optimization and indexing strategies",
                    "Data integrity constraint specification",
                    "Database reverse engineering and documentation",
                  ],
                },
              },
            },
            {
              id: 9,
              title: "Normalization",
              completed: false,
              duration: "65 min",
              content: {
                definition:
                  "Normalization is the process of organizing data in a database to reduce redundancy and improve data integrity. It involves decomposing tables into smaller, well-structured tables.",
                objectives: {
                  title: "Objectives of Normalization:",
                  list: [
                    "Eliminate redundant data",
                    "Reduce storage space",
                    "Prevent update anomalies",
                    "Ensure data consistency",
                    "Improve data integrity",
                  ],
                },
                normalForms: {
                  title: "Normal Forms:",
                  forms: [
                    {
                      name: "First Normal Form (1NF)",
                      description:
                        "A relation is in 1NF if it contains only atomic (indivisible) values and each attribute contains values of a single type.",
                    },
                    {
                      name: "Second Normal Form (2NF)",
                      description:
                        "A relation is in 2NF if it is in 1NF and every non-prime attribute is fully functionally dependent on the primary key.",
                    },
                    {
                      name: "Third Normal Form (3NF)",
                      description:
                        "A relation is in 3NF if it is in 2NF and no transitive dependency exists for non-prime attributes.",
                    },
                    {
                      name: "Boyce-Codd Normal Form (BCNF)",
                      description:
                        "A relation is in BCNF if it is in 3NF and for every functional dependency A B, A is a super key.",
                    },
                    {
                      name: "Fourth Normal Form (4NF)",
                      description:
                        "A relation is in 4NF if it is in BCNF and has no multi-valued dependencies.",
                    },
                  ],
                },
                dependencies: {
                  title: "Functional Dependencies:",
                  description:
                    "A functional dependency A B means that if two tuples have the same value for attribute A, they must have the same value for attribute B.",
                  types: [
                    "Trivial Dependency - B is a subset of A",
                    "Non-trivial Dependency - B is not a subset of A",
                    "Partial Dependency - Non-prime attribute depends on part of candidate key",
                    "Transitive Dependency - A B and B C, then A C",
                  ],
                },
              },
            },
          ],
        },
        {
          id: 4,
          title: "SQL Operations",
          topics: [
            {
              id: 10,
              title: "SQL Basics & DDL",
              completed: false,
              duration: "70 min",
              content: {
                definition:
                  "SQL (Structured Query Language) is a standard language for managing and manipulating relational databases. It provides commands for creating, querying, updating, and managing database structures and data.",
                categories: {
                  title: "SQL Command Categories:",
                  types: [
                    {
                      name: "DDL (Data Definition Language)",
                      description: "Commands to define database structure",
                      commands: ["CREATE", "ALTER", "DROP", "TRUNCATE"],
                    },
                    {
                      name: "DML (Data Manipulation Language)",
                      description: "Commands to manipulate data",
                      commands: ["SELECT", "INSERT", "UPDATE", "DELETE"],
                    },
                    {
                      name: "DCL (Data Control Language)",
                      description: "Commands to control access to data",
                      commands: ["GRANT", "REVOKE"],
                    },
                    {
                      name: "TCL (Transaction Control Language)",
                      description: "Commands to manage transactions",
                      commands: ["COMMIT", "ROLLBACK", "SAVEPOINT"],
                    },
                  ],
                },
                basicQueries: {
                  title: "Basic SQL Queries:",
                  examples: [
                    {
                      name: "SELECT Statement",
                      description: "Retrieve data from tables",
                      syntax:
                        "SELECT column1, column2 FROM table_name WHERE condition;",
                    },
                    {
                      name: "INSERT Statement",
                      description: "Add new records to a table",
                      syntax:
                        "INSERT INTO table_name (column1, column2) VALUES (value1, value2);",
                    },
                    {
                      name: "UPDATE Statement",
                      description: "Modify existing records",
                      syntax:
                        "UPDATE table_name SET column1 = value1 WHERE condition;",
                    },
                    {
                      name: "DELETE Statement",
                      description: "Remove records from a table",
                      syntax: "DELETE FROM table_name WHERE condition;",
                    },
                  ],
                },
                clauses: {
                  title: "Important SQL Clauses:",
                  list: [
                    "WHERE - Filter records based on conditions",
                    "ORDER BY - Sort results in ascending or descending order",
                    "GROUP BY - Group rows with same values",
                    "HAVING - Filter groups based on conditions",
                    "JOIN - Combine rows from multiple tables",
                    "DISTINCT - Return unique values only",
                    "LIMIT - Restrict number of records returned",
                  ],
                },
              },
            },
            {
              id: 11,
              title: "DML Operations & Joins",
              completed: false,
              duration: "60 min",
              content: {
                definition:
                  "Data Manipulation Language (DML) operations and JOIN statements are fundamental for querying and manipulating data in relational databases.",
                dmlOperations: {
                  title: "DML Operations:",
                  operations: [
                    {
                      name: "SELECT",
                      description: "Retrieve data from one or more tables",
                      syntax:
                        "SELECT column1, column2 FROM table_name WHERE condition;",
                      examples: [
                        "SELECT * FROM students;",
                        "SELECT name, age FROM students WHERE age > 18;",
                        "SELECT COUNT(*) FROM students GROUP BY department;",
                      ],
                    },
                    {
                      name: "INSERT",
                      description: "Add new records to a table",
                      syntax:
                        "INSERT INTO table_name (column1, column2) VALUES (value1, value2);",
                      examples: [
                        "INSERT INTO students (name, age, email) VALUES ('John Doe', 20, 'john@email.com');",
                        "INSERT INTO students VALUES (1, 'Jane Smith', 19, 'jane@email.com');",
                        "INSERT INTO students (name, age) SELECT name, age FROM temp_students;",
                      ],
                    },
                    {
                      name: "UPDATE",
                      description: "Modify existing records in a table",
                      syntax:
                        "UPDATE table_name SET column1 = value1 WHERE condition;",
                      examples: [
                        "UPDATE students SET age = 21 WHERE student_id = 1;",
                        "UPDATE students SET email = 'newemail@domain.com' WHERE name = 'John Doe';",
                        "UPDATE students SET age = age + 1 WHERE department = 'CS';",
                      ],
                    },
                    {
                      name: "DELETE",
                      description: "Remove records from a table",
                      syntax: "DELETE FROM table_name WHERE condition;",
                      examples: [
                        "DELETE FROM students WHERE student_id = 1;",
                        "DELETE FROM students WHERE age < 18;",
                        "DELETE FROM students WHERE graduation_date < '2020-01-01';",
                      ],
                    },
                  ],
                },
                joins: {
                  title: "JOIN Operations:",
                  description:
                    "JOINs are used to combine rows from two or more tables based on related columns.",
                  types: [
                    {
                      name: "INNER JOIN",
                      description:
                        "Returns records that have matching values in both tables",
                      syntax:
                        "SELECT columns FROM table1 INNER JOIN table2 ON table1.column = table2.column;",
                      example:
                        "SELECT s.name, c.course_name FROM students s INNER JOIN courses c ON s.course_id = c.course_id;",
                      result: "Only students who are enrolled in courses",
                    },
                    {
                      name: "LEFT JOIN (LEFT OUTER JOIN)",
                      description:
                        "Returns all records from left table and matched records from right table",
                      syntax:
                        "SELECT columns FROM table1 LEFT JOIN table2 ON table1.column = table2.column;",
                      example:
                        "SELECT s.name, c.course_name FROM students s LEFT JOIN courses c ON s.course_id = c.course_id;",
                      result:
                        "All students, including those not enrolled in any course",
                    },
                    {
                      name: "RIGHT JOIN (RIGHT OUTER JOIN)",
                      description:
                        "Returns all records from right table and matched records from left table",
                      syntax:
                        "SELECT columns FROM table1 RIGHT JOIN table2 ON table1.column = table2.column;",
                      example:
                        "SELECT s.name, c.course_name FROM students s RIGHT JOIN courses c ON s.course_id = c.course_id;",
                      result:
                        "All courses, including those with no enrolled students",
                    },
                    {
                      name: "FULL OUTER JOIN",
                      description:
                        "Returns all records when there's a match in either table",
                      syntax:
                        "SELECT columns FROM table1 FULL OUTER JOIN table2 ON table1.column = table2.column;",
                      example:
                        "SELECT s.name, c.course_name FROM students s FULL OUTER JOIN courses c ON s.course_id = c.course_id;",
                      result:
                        "All students and all courses, whether matched or not",
                    },
                    {
                      name: "CROSS JOIN",
                      description:
                        "Returns the Cartesian product of both tables",
                      syntax: "SELECT columns FROM table1 CROSS JOIN table2;",
                      example:
                        "SELECT s.name, c.course_name FROM students s CROSS JOIN courses c;",
                      result: "Every student paired with every course",
                    },
                    {
                      name: "SELF JOIN",
                      description: "A table is joined with itself",
                      syntax:
                        "SELECT columns FROM table1 t1 JOIN table1 t2 ON condition;",
                      example:
                        "SELECT e1.name as Employee, e2.name as Manager FROM employees e1 JOIN employees e2 ON e1.manager_id = e2.employee_id;",
                      result: "Employees paired with their managers",
                    },
                  ],
                },
                advancedConcepts: {
                  title: "Advanced DML Concepts:",
                  concepts: [
                    {
                      name: "Subqueries",
                      description: "A query nested inside another query",
                      types: [
                        "Scalar subquery",
                        "Row subquery",
                        "Table subquery",
                      ],
                      example:
                        "SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE grade > 85);",
                    },
                    {
                      name: "Correlated Subqueries",
                      description:
                        "Subquery that references columns from the outer query",
                      example:
                        "SELECT name FROM students s WHERE EXISTS (SELECT 1 FROM enrollments e WHERE e.student_id = s.student_id AND grade > 90);",
                    },
                    {
                      name: "Window Functions",
                      description: "Perform calculations across a set of table rows related to the current row",
                      functions: [
                        "ROW_NUMBER()",
                        "RANK()",
                        "DENSE_RANK()",
                        "LAG()",
                        "LEAD()",
                      ],
                      example:
                        "SELECT name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank FROM employees;",
                    },
                    {
                      name: "Common Table Expressions (CTE)",
                      description: "Temporary named result set that exists within the scope of a single statement",
                      example:
                        "WITH high_performers AS (SELECT * FROM students WHERE gpa > 3.5) SELECT * FROM high_performers WHERE major = 'CS';",
                    },
                  ],
                },
                aggregateFunctions: {
                  title: "Aggregate Functions:",
                  functions: [
                    {
                      name: "COUNT()",
                      description: "Returns the number of rows",
                      example:
                        "SELECT COUNT(*) FROM students WHERE major = 'CS';",
                    },
                    {
                      name: "SUM()",
                      description: "Returns the sum of numeric values",
                      example:
                        "SELECT SUM(credits) FROM courses WHERE department = 'CS';",
                    },
                    {
                      name: "AVG()",
                      description: "Returns the average of numeric values",
                      example: "SELECT AVG(gpa) FROM students GROUP BY major;",
                    },
                    {
                      name: "MIN() / MAX()",
                      description: "Returns the minimum/maximum value",
                      example: "SELECT MIN(age), MAX(age) FROM students;",
                    },
                    {
                      name: "GROUP_CONCAT() / STRING_AGG()",
                      description: "Concatenates values from multiple rows",
                      example:
                        "SELECT major, GROUP_CONCAT(name) FROM students GROUP BY major;",
                    },
                  ],
                },
                practicalExamples: {
                  title: "Practical Query Examples:",
                  scenarios: [
                    {
                      scenario:
                        "Find students with highest GPA in each department",
                      query:
                        "SELECT s.* FROM students s INNER JOIN (SELECT department, MAX(gpa) as max_gpa FROM students GROUP BY department) d ON s.department = d.department AND s.gpa = d.max_gpa;",
                    },
                    {
                      scenario: "Get courses with no enrolled students",
                      query:
                        "SELECT c.* FROM courses c LEFT JOIN enrollments e ON c.course_id = e.course_id WHERE e.course_id IS NULL;",
                    },
                    {
                      scenario:
                        "Find students who are enrolled in more than 3 courses",
                      query:
                        "SELECT s.name, COUNT(e.course_id) as course_count FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.name HAVING COUNT(e.course_id) > 3;",
                    },
                  ],
                },
              },
            },
            {
              id: 12,
              title: "Advanced SQL Queries",
              completed: false,
              duration: "75 min",
              content: {
                definition:
                  "Advanced SQL concepts including subqueries, views, stored procedures, and complex query optimization techniques for efficient database operations.",
                subqueries: {
                  title: "Subqueries and Nested Queries:",
                  types: [
                    {
                      name: "Scalar Subquery",
                      description:
                        "Returns a single value (one row, one column)",
                      syntax:
                        "SELECT column1 FROM table_name WHERE condition = (SELECT column2 FROM table_name2);",
                      example:
                        "SELECT name FROM students WHERE student_id = (SELECT student_id FROM enrollments WHERE grade > 90);",
                      usage: "Used in SELECT, WHERE, and HAVING clauses",
                    },
                    {
                      name: "Row Subquery",
                      description: "Returns a single row with multiple columns",
                      syntax:
                        "SELECT column1 FROM table_name WHERE (column2, column3) = (SELECT column4, column5 FROM table_name2);",
                      example:
                        "SELECT name FROM students WHERE (student_id, department) = (SELECT student_id, department FROM enrollments WHERE grade > 90);",
                      usage: "Comparing multiple columns simultaneously",
                    },
                    {
                      name: "Table Subquery",
                      description: "Returns multiple rows and columns",
                      syntax:
                        "SELECT column1 FROM table_name WHERE column2 IN (SELECT column3 FROM table_name2);",
                      example:
                        "SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE grade > 90);",
                      usage: "Used with IN, EXISTS, ANY, ALL operators",
                    },
                    {
                      name: "Correlated Subquery",
                      description: "References columns from the outer query",
                      syntax:
                        "SELECT column1 FROM table_name WHERE column2 = (SELECT column3 FROM table_name2 WHERE column4 = table_name.column5);",
                      example:
                        "SELECT name FROM students s WHERE student_id = (SELECT student_id FROM enrollments e WHERE e.student_id = s.student_id AND grade > 90);",
                      usage:
                        "Row-by-row processing, often slower but more flexible",
                    },
                  ],
                  operators: [
                    {
                      name: "EXISTS / NOT EXISTS",
                      description:
                        "Tests for the existence of rows in subquery",
                      example:
                        "SELECT name FROM students WHERE EXISTS (SELECT 1 FROM enrollments WHERE student_id = students.student_id AND grade > 90);",
                    },
                    {
                      name: "IN / NOT IN",
                      description: "Tests if value exists in a list of values",
                      example:
                        "SELECT name FROM students WHERE student_id IN (SELECT student_id FROM enrollments WHERE grade > 90);",
                    },
                    {
                      name: "ANY / SOME",
                      description:
                        "Compares value to any value in the subquery result",
                      example:
                        "SELECT name FROM students WHERE student_id = ANY (SELECT student_id FROM enrollments WHERE grade > 90);",
                    },
                    {
                      name: "ALL",
                      description:
                        "Compares value to all values in the subquery result",
                      example:
                        "SELECT name FROM students WHERE student_id = ALL (SELECT student_id FROM enrollments WHERE grade > 90);",
                    },
                  ],
                },
                views: {
                  title: "Views and Virtual Tables:",
                  definition:
                    "A view is a virtual table based on the result of an SQL statement. It contains rows and columns just like a real table.",
                  types: [
                    {
                      name: "Simple View",
                      description:
                        "Based on a single table without complex operations",
                      example:
                        "CREATE VIEW active_students AS SELECT student_id, name, department FROM students WHERE status = 'Active';",
                      characteristics: [
                        "Updatable",
                        "Can insert, update, delete through view",
                      ],
                    },
                    {
                      name: "Complex View",
                      description:
                        "Based on multiple tables or contains aggregate functions",
                      example:
                        "CREATE VIEW student_grades AS SELECT s.student_id, s.name, AVG(e.grade) as average_grade FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.name;",
                      characteristics: [
                        "Usually read-only",
                        "Contains JOINs, GROUP BY, or functions",
                      ],
                    },
                    {
                      name: "Materialized View",
                      description:
                        "Physically stored view that needs to be refreshed",
                      example:
                        "CREATE MATERIALIZED VIEW student_grades AS SELECT s.student_id, s.name, AVG(e.grade) as average_grade FROM students s JOIN enrollments e ON s.student_id = e.student_id GROUP BY s.student_id, s.name;",
                      characteristics: [
                        "Better performance",
                        "Requires refresh",
                        "Uses storage space",
                      ],
                    },
                  ],
                  advantages: [
                    "Data security - Hide sensitive columns",
                    "Simplify complex queries",
                    "Provide data abstraction",
                    "Maintain backward compatibility",
                    "Centralize business logic",
                  ],
                },
                storedProcedures: {
                  title: "Stored Procedures and Functions:",
                  definition:
                    "Precompiled SQL code stored in the database that can be executed repeatedly.",
                  components: [
                    {
                      name: "Input Parameters",
                      description: "Values passed to the procedure",
                      example:
                        "CREATE PROCEDURE GetStudentsByDept(IN dept_id INT) BEGIN SELECT * FROM students WHERE department_id = dept_id; END;",
                    },
                    {
                      name: "Output Parameters",
                      description: "Values returned by the procedure",
                      example:
                        "CREATE PROCEDURE GetStudentCount(IN dept_id INT, OUT student_count INT) BEGIN SELECT COUNT(*) INTO student_count FROM students WHERE department_id = dept_id; END;",
                    },
                    {
                      name: "Control Structures",
                      description:
                        "IF-ELSE, WHILE, FOR loops for complex logic",
                      example:
                        "IF grade > 90 THEN SET scholarship = 'Yes'; ELSE SET scholarship = 'No'; END IF;",
                    },
                  ],
                  advantages: [
                    "Improved performance - Precompiled",
                    "Code reusability",
                    "Enhanced security",
                    "Centralized business logic",
                    "Reduced network traffic",
                  ],
                },
                triggers: {
                  title: "Database Triggers:",
                  definition:
                    "Special stored procedures that automatically execute in response to database events.",
                  types: [
                    {
                      name: "BEFORE Triggers",
                      description: "Execute before the triggering event",
                      example:
                        "CREATE TRIGGER UpdateTimestamp BEFORE UPDATE ON students FOR EACH ROW SET NEW.last_modified = NOW();",
                      usage: "Data validation, automatic value setting",
                    },
                    {
                      name: "AFTER Triggers",
                      description: "Execute after the triggering event",
                      example:
                        "CREATE TRIGGER LogUpdate AFTER UPDATE ON students FOR EACH ROW INSERT INTO audit_log VALUES (OLD.student_id, OLD.name, NEW.name, NOW());",
                      usage: "Logging, auditing, cascading updates",
                    },
                    {
                      name: "INSTEAD OF Triggers",
                      description:
                        "Replace the triggering event (mainly for views)",
                      example:
                        "CREATE TRIGGER ViewInsert INSTEAD OF INSERT ON student_view FOR EACH ROW BEGIN INSERT INTO students (name, department) VALUES (NEW.name, NEW.department); END;",
                      usage: "Make complex views updatable",
                    },
                  ],
                  events: [
                    "INSERT",
                    "UPDATE",
                    "DELETE",
                    "CREATE",
                    "ALTER",
                    "DROP",
                  ],
                },
                indexing: {
                  title: "Indexing and Performance:",
                  definition:
                    "Database indexes are data structures that improve query performance by providing fast access paths to table data.",
                  types: [
                    {
                      name: "Clustered Index",
                      description: "Physically orders table data",
                      characteristics: [
                        "One per table",
                        "Determines physical storage order",
                        "Primary key creates clustered index",
                      ],
                    },
                    {
                      name: "Non-Clustered Index",
                      description: "Separate structure pointing to table rows",
                      characteristics: [
                        "Multiple per table",
                        "Contains key values and row pointers",
                        "Faster for specific lookups",
                      ],
                    },
                    {
                      name: "Composite Index",
                      description: "Index on multiple columns",
                      example:
                        "CREATE INDEX idx_name_dept ON students (last_name, department_id);",
                      usage: "Queries filtering on multiple columns",
                    },
                    {
                      name: "Unique Index",
                      description:
                        "Ensures uniqueness and improves performance",
                      example:
                        "CREATE UNIQUE INDEX idx_email ON students (email);",
                      usage: "Enforce constraints and speed up lookups",
                    },
                  ],
                  guidelines: [
                    "Index frequently queried columns",
                    "Avoid over-indexing (slows INSERT/UPDATE)",
                    "Consider composite indexes for multi-column queries",
                    "Monitor and analyze index usage",
                    "Drop unused indexes",
                  ],
                },
                optimization: {
                  title: "Query Optimization Techniques:",
                  strategies: [
                    {
                      name: "Query Execution Plan Analysis",
                      description:
                        "Understand how the database executes queries",
                      tools: ["EXPLAIN", "EXPLAIN ANALYZE", "Query profiler"],
                      focus:
                        "Identify bottlenecks, table scans, expensive operations",
                    },
                    {
                      name: "WHERE Clause Optimization",
                      description: "Efficient filtering conditions",
                      tips: [
                        "Use indexed columns in WHERE clause",
                        "Avoid functions on columns in WHERE",
                        "Use specific conditions before general ones",
                        "Prefer EXISTS over IN for subqueries",
                      ],
                    },
                    {
                      name: "JOIN Optimization",
                      description: "Efficient table joining strategies",
                      tips: [
                        "Join on indexed columns",
                        "Use appropriate JOIN types",
                        "Consider join order for multiple tables",
                        "Use table aliases for readability",
                      ],
                    },
                    {
                      name: "LIMIT and Pagination",
                      description: "Efficient handling of large result sets",
                      techniques: [
                        "Use LIMIT for top-N queries",
                        "Implement cursor-based pagination",
                        "Avoid OFFSET for large datasets",
                        "Use covering indexes for pagination",
                      ],
                    },
                  ],
                },
                advancedFeatures: {
                  title: "Advanced SQL Features:",
                  features: [
                    {
                      name: "Window Functions",
                      description: "Perform calculations across related rows",
                      functions: [
                        "ROW_NUMBER()",
                        "RANK()",
                        "DENSE_RANK()",
                        "LAG()",
                        "LEAD()",
                        "FIRST_VALUE()",
                        "LAST_VALUE()",
                      ],
                      example:
                        "SELECT name, salary, RANK() OVER (PARTITION BY department ORDER BY salary DESC) as salary_rank FROM employees;",
                    },
                    {
                      name: "Common Table Expressions (CTE)",
                      description: "Temporary named result sets",
                      types: ["Non-recursive CTE", "Recursive CTE"],
                      example:
                        "WITH RECURSIVE employee_hierarchy AS (SELECT employee_id, name, manager_id, 1 as level FROM employees WHERE manager_id IS NULL UNION ALL SELECT e.employee_id, e.name, e.manager_id, eh.level + 1 FROM employees e JOIN employee_hierarchy eh ON e.manager_id = eh.employee_id) SELECT * FROM employee_hierarchy;",
                    },
                    {
                      name: "CASE Expressions",
                      description: "Conditional logic in SQL",
                      types: ["Simple CASE", "Searched CASE"],
                      example:
                        "SELECT name, CASE WHEN salary > 80000 THEN 'High' WHEN salary > 50000 THEN 'Medium' ELSE 'Low' END as salary_grade FROM employees;",
                    },
                  ],
                },
              },
            },
            {
              id: 13,
              title: "ACID Properties",
              completed: false,
              duration: "45 min",
              content: {
                definition:
                  "ACID properties are fundamental principles that ensure database transactions are processed reliably and maintain data integrity in concurrent environments.",
                properties: {
                  title: "The Four ACID Properties:",
                  details: [
                    {
                      name: "Atomicity",
                      description:
                        "All operations in a transaction succeed or fail together - no partial transactions",
                      explanation:
                        "A transaction is treated as a single unit of work. Either all operations complete successfully, or none of them do.",
                      example:
                        "Bank transfer: Debit from Account A and Credit to Account B must both succeed or both fail",
                      implementation: [
                        "Transaction logs maintain before/after images",
                        "Rollback mechanisms undo partial changes",
                        "Commit/Rollback commands ensure atomicity",
                      ],
                    },
                    {
                      name: "Consistency",
                      description:
                        "Database remains in a valid state before and after transaction execution",
                      explanation:
                        "All database rules, constraints, and triggers must be satisfied. Data integrity is maintained.",
                      example:
                        "Account balance cannot be negative, foreign key constraints must be maintained",
                      types: [
                        "Entity Integrity - Primary key constraints",
                        "Referential Integrity - Foreign key constraints", 
                        "Domain Integrity - Data type and range constraints",
                        "User-defined Integrity - Business rules and triggers",
                      ],
                    },
                    {
                      name: "Isolation",
                      description:
                        "Concurrent transactions do not interfere with each other",
                      explanation:
                        "Each transaction appears to execute in isolation, even when running concurrently with other transactions.",
                      levels: [
                        {
                          name: "Read Uncommitted",
                          description: "Lowest isolation, allows dirty reads",
                          problems: ["Dirty Read", "Non-repeatable Read", "Phantom Read"],
                        },
                        {
                          name: "Read Committed", 
                          description: "Prevents dirty reads",
                          problems: ["Non-repeatable Read", "Phantom Read"],
                        },
                        {
                          name: "Repeatable Read",
                          description: "Prevents dirty and non-repeatable reads",
                          problems: ["Phantom Read"],
                        },
                        {
                          name: "Serializable",
                          description: "Highest isolation, prevents all problems",
                          problems: [],
                        },
                      ],
                    },
                    {
                      name: "Durability",
                      description:
                        "Committed transactions persist even after system failures",
                      explanation:
                        "Once a transaction is committed, its effects are permanently stored and survive system crashes.",
                      implementation: [
                        "Write-Ahead Logging (WAL) - Log changes before data",
                        "Force-write policy - Flush logs to disk on commit",
                        "Database checkpoints - Periodic data synchronization",
                        "Recovery mechanisms - Redo/Undo operations",
                      ],
                    },
                  ],
                },
                problems: {
                  title: "Concurrency Problems ACID Solves:",
                  issues: [
                    {
                      name: "Dirty Read",
                      description: "Reading uncommitted data from another transaction",
                      example: "T1 updates balance, T2 reads new balance, T1 rolls back",
                      solution: "Read Committed isolation level or higher",
                    },
                    {
                      name: "Non-repeatable Read",
                      description: "Same query returns different results within a transaction",
                      example: "T1 reads balance twice, T2 updates balance between reads",
                      solution: "Repeatable Read isolation level or higher",
                    },
                    {
                      name: "Phantom Read",
                      description: "New rows appear in result set during transaction",
                      example: "T1 counts rows, T2 inserts new row, T1 counts again",
                      solution: "Serializable isolation level",
                    },
                    {
                      name: "Lost Update",
                      description: "One transaction overwrites another's changes",
                      example: "T1 and T2 both update same record, one update is lost",
                      solution: "Proper locking mechanisms",
                    },
                  ],
                },
                realWorld: {
                  title: "Real-World Applications:",
                  examples: [
                    {
                      scenario: "Banking System",
                      requirements: "Money transfers must be atomic and consistent",
                      implementation: "High isolation levels, strict consistency checks",
                    },
                    {
                      scenario: "E-commerce Platform", 
                      requirements: "Inventory updates and order processing",
                      implementation: "Optimistic locking, eventual consistency for some operations",
                    },
                    {
                      scenario: "Social Media Platform",
                      requirements: "High throughput, some eventual consistency acceptable",
                      implementation: "Lower isolation levels, asynchronous processing",
                    },
                  ],
                },
              },
            },
            {
              id: 14,
              title: "Transaction Management",
              completed: false,
              duration: "50 min",
              content: {
                definition:
                  "Transaction management ensures reliable database operations and maintains data consistency in multi-user environments.",
                concepts: {
                  title: "Transaction Fundamentals:",
                  states: [
                    "Active - Transaction is executing",
                    "Partially Committed - Transaction completed but not yet committed", 
                    "Committed - Transaction successfully completed",
                    "Failed - Transaction cannot proceed",
                    "Aborted - Transaction rolled back",
                  ],
                  operations: [
                    "BEGIN/START TRANSACTION - Start new transaction",
                    "COMMIT - Make changes permanent",
                    "ROLLBACK - Undo all changes",
                    "SAVEPOINT - Create checkpoint within transaction",
                  ],
                },
                concurrency: {
                  title: "Concurrency Control:",
                  lockTypes: [
                    {
                      name: "Shared Lock (S)",
                      description: "Multiple transactions can read, none can write",
                      usage: "SELECT statements",
                    },
                    {
                      name: "Exclusive Lock (X)", 
                      description: "Only one transaction can read/write",
                      usage: "UPDATE, DELETE, INSERT statements",
                    },
                  ],
                  protocols: [
                    "Two-Phase Locking (2PL) - Growing and shrinking phases",
                    "Strict 2PL - Hold exclusive locks until commit",
                    "Timestamp ordering - Use timestamps to order transactions",
                    "MVCC - Maintain multiple versions of data",
                  ],
                },
                deadlocks: {
                  title: "Deadlock Management:",
                  conditions: [
                    "Mutual Exclusion - Resources cannot be shared",
                    "Hold and Wait - Transactions hold resources while waiting",
                    "No Preemption - Resources cannot be forcibly taken", 
                    "Circular Wait - Circular chain of waiting transactions",
                  ],
                  solutions: [
                    "Detection - Use wait-for graphs to detect cycles",
                    "Prevention - Acquire locks in predefined order",
                    "Timeout - Abort transactions after timeout",
                    "Victim selection - Choose transaction to rollback",
                  ],
                },
                recovery: {
                  title: "Recovery Techniques:",
                  methods: [
                    "Write-Ahead Logging (WAL) - Log changes before applying",
                    "Checkpointing - Periodic synchronization",
                    "REDO operations - Repeat committed transactions",
                    "UNDO operations - Rollback uncommitted transactions",
                  ],
                },
              },
            },
            {
              id: 15,
              title: "Database Security & Backup",
              completed: false,
              duration: "40 min",
              content: {
                definition:
                  "Database security involves protecting data from unauthorized access, ensuring data integrity, and implementing robust backup and recovery strategies.",
                security: {
                  title: "Database Security Fundamentals:",
                  threats: [
                    {
                      name: "SQL Injection",
                      description: "Malicious SQL code inserted through input fields",
                      prevention: [
                        "Use parameterized queries",
                        "Input validation and sanitization",
                        "Stored procedures",
                        "Least privilege principle",
                      ],
                    },
                    {
                      name: "Privilege Escalation",
                      description: "Gaining higher access levels than authorized",
                      prevention: [
                        "Regular privilege audits",
                        "Principle of least privilege",
                        "Role separation",
                        "Access monitoring",
                      ],
                    },
                    {
                      name: "Data Breaches",
                      description: "Unauthorized access to sensitive data",
                      prevention: [
                        "Encryption at rest and in transit",
                        "Access logging and monitoring",
                        "Network security",
                        "Regular security assessments",
                      ],
                    },
                  ],
                  authentication: [
                    "Password-based authentication with strong policies",
                    "Multi-factor authentication (MFA)",
                    "Certificate-based authentication",
                    "Single Sign-On (SSO) integration",
                  ],
                  authorization: [
                    "Role-Based Access Control (RBAC)",
                    "Discretionary Access Control (DAC)",
                    "Mandatory Access Control (MAC)",
                    "Attribute-Based Access Control (ABAC)",
                  ],
                },
                backup: {
                  title: "Backup and Recovery Strategies:",
                  types: [
                    {
                      name: "Full Backup",
                      description: "Complete copy of entire database",
                      advantages: ["Simple recovery", "Complete data protection"],
                      disadvantages: ["Large storage requirement", "Long backup time"],
                      frequency: "Weekly or monthly",
                    },
                    {
                      name: "Incremental Backup",
                      description: "Only changes since last backup",
                      advantages: ["Faster backup", "Less storage"],
                      disadvantages: ["Complex recovery", "Chain dependency"],
                      frequency: "Daily",
                    },
                    {
                      name: "Differential Backup",
                      description: "Changes since last full backup",
                      advantages: ["Faster than full", "Simpler than incremental"],
                      disadvantages: ["Growing size over time"],
                      frequency: "Daily or weekly",
                    },
                  ],
                  strategies: [
                    "3-2-1 Rule: 3 copies, 2 different media, 1 offsite",
                    "Regular testing of backup restoration",
                    "Automated backup scheduling",
                    "Point-in-time recovery capabilities",
                    "Geographic distribution of backups",
                  ],
                },
                encryption: {
                  title: "Data Encryption:",
                  types: [
                    {
                      name: "Encryption at Rest",
                      description: "Protecting stored data",
                      methods: ["Transparent Data Encryption (TDE)", "Column-level encryption", "File system encryption"],
                    },
                    {
                      name: "Encryption in Transit",
                      description: "Protecting data during transmission",
                      protocols: ["TLS/SSL", "IPSec", "SSH tunneling"],
                    },
                  ],
                },
                compliance: {
                  title: "Compliance and Regulations:",
                  standards: [
                    "GDPR - General Data Protection Regulation",
                    "HIPAA - Health Insurance Portability and Accountability Act",
                    "PCI DSS - Payment Card Industry Data Security Standard",
                    "SOX - Sarbanes-Oxley Act",
                    "ISO 27001 - Information Security Management",
                  ],
                },
              },
            },
          ],
        },
      ],
    },
  };

  // Helper function to find topic and its section
  const findTopicAndSection = (subjectData, topicId) => {
    for (const section of subjectData.sections) {
      const topic = section.topics.find((t) => t.id === parseInt(topicId));
      if (topic) {
        return { topic, section };
      }
    }
    return { topic: null, section: null };
  };

  useEffect(() => {
    const loadTopic = () => {
      setLoading(true);
      try {
        console.log(
          "Loading topic with subjectId:",
          subjectId,
          "topicId:",
          topicId
        );
        const subjectData = mockSubjects[subjectId];
        console.log("Subject data found:", subjectData);

        if (subjectData) {
          setSubject(subjectData);

          // Find the topic and its parent section
          const { topic: topicData, section: sectionData } =
            findTopicAndSection(subjectData, topicId);
          console.log("Topic data found:", topicData);
          console.log("Section data found:", sectionData);

          if (topicData && sectionData) {
            setTopic(topicData);
            setCurrentSection(sectionData);
            setProgress(topicData.completed ? 100 : 0);
            console.log("Topic loaded successfully:", topicData.title);
          } else {
            console.error("Topic not found for ID:", topicId);
            setError("Topic not found");
          }
        } else {
          console.error("Subject not found for ID:", subjectId);
          setError("Subject not found");
        }
      } catch (err) {
        console.error("Error loading topic:", err);
        setError("Failed to load topic");
      } finally {
        setLoading(false);
      }
    };

    if (subjectId && topicId) {
      loadTopic();
    }
  }, [subjectId, topicId]);

  const handleBackToSubject = () => {
    navigate(`/subject/${subjectId}`);
  };

  const handlePreviousTopic = () => {
    if (!currentSection) return;

    const currentIndex = currentSection.topics.findIndex(
      (t) => t.id === parseInt(topicId)
    );
    if (currentIndex > 0) {
      const prevTopic = currentSection.topics[currentIndex - 1];
      navigate(`/subject/${subjectId}/topic/${prevTopic.id}`);
    }
  };

  const handleNextTopic = () => {
    if (!currentSection) return;

    const currentIndex = currentSection.topics.findIndex(
      (t) => t.id === parseInt(topicId)
    );
    if (currentIndex < currentSection.topics.length - 1) {
      const nextTopic = currentSection.topics[currentIndex + 1];
      navigate(`/subject/${subjectId}/topic/${nextTopic.id}`);
    }
  };

  const handleMarkComplete = () => {
    setProgress(100);
    // TODO: Update backend with completion status
  };

  if (loading) {
    console.log("Component is in loading state");
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <FaSpinner className="w-12 h-12 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-300 text-lg">Loading topic...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    console.log("Component has error:", error);
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="bg-red-500/20 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 text-center max-w-md">
            <FaExclamationTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">
              Error Loading Topic
            </h2>
            <p className="text-gray-300 mb-4">{error}</p>
            <button
              onClick={handleBackToSubject}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
            >
              Back to Subject
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!topic || !subject) {
    console.log("Topic or subject is null:", { topic, subject });
    return (
      <div className="min-h-screen bg-gray-900">
        <Navbar />
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-gray-300 text-lg">No topic data available</p>
          </div>
        </div>
      </div>
    );
  }

  console.log("Rendering topic:", topic.title);

  const currentIndex = currentSection.topics.findIndex(
    (t) => t.id === parseInt(topicId)
  );
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < currentSection.topics.length - 1;

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar />

      <div className="pt-20 px-4 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={handleBackToSubject}
            className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300"
          >
            <FaArrowLeft className="w-5 h-5" />
            <span>Back to {subject.name}</span>
          </button>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <FaClock className="w-4 h-4" />
              <span>{topic.duration}</span>
            </div>
            <div className="flex items-center space-x-2">
              {topic.completed ? (
                <FaCheckCircle className="w-5 h-5 text-green-400" />
              ) : (
                <FaCircle className="w-5 h-5 text-gray-500" />
              )}
              <span className="text-gray-300">
                {topic.completed ? "Completed" : "In Progress"}
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              {/* Topic Header */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">
                  {topic.title}
                </h1>
                <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Content Display */}
              <div className="prose prose-invert max-w-none">
                {topic.content && (
                  <div className="space-y-6">
                    {/* Database Definition */}
                    {topic.content.definition && (
                      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-3">
                          Definition
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {topic.content.definition}
                        </p>
                      </div>
                    )}

                    {/* DBMS Explanation */}
                    {topic.content.dbms && (
                      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">
                          Database Management System (DBMS)
                        </h3>
                        <p className="text-gray-300 leading-relaxed">
                          {topic.content.dbms}
                        </p>
                      </div>
                    )}

                    {/* Problems Solved */}
                    {topic.content.problems && topic.content.problems.list && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-400 mb-3">
                          Problems Solved by DBMS
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {topic.content.problems.title}
                        </p>
                        <ul className="space-y-2">
                          {topic.content.problems.list.map((problem, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <span className="text-green-400 font-bold">
                                {index + 1}.
                              </span>
                              <span className="text-gray-300">{problem}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* ER Diagram Components */}
                    {topic.content.components && (
                      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-400 mb-3">
                          {topic.content.components.title}
                        </h3>
                        {Array.isArray(topic.content.components.list) ? (
                          <ul className="space-y-2">
                            {topic.content.components.list.map(
                              (component, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <span className="text-green-400 font-bold">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-300">
                                    {component}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <p className="text-gray-300">
                            {topic.content.components.list}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Entity Sets */}
                    {topic.content.entitySets &&
                      topic.content.entitySets.strong &&
                      topic.content.entitySets.strong.points && (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-green-400 mb-4">
                            {topic.content.entitySets.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-lg font-semibold text-green-400 mb-2">
                                {topic.content.entitySets.strong.title}
                              </h4>
                              <ul className="space-y-2">
                                {topic.content.entitySets.strong.points.map(
                                  (point, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start space-x-3"
                                    >
                                      <span className="text-green-400 font-bold">
                                        {index + 1}.
                                      </span>
                                      <span className="text-gray-300">
                                        {point}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                            {topic.content.entitySets.weak &&
                              topic.content.entitySets.weak.points && (
                                <div>
                                  <h4 className="text-lg font-semibold text-green-400 mb-2">
                                    {topic.content.entitySets.weak.title}
                                  </h4>
                                  <ul className="space-y-2">
                                    {topic.content.entitySets.weak.points.map(
                                      (point, index) => (
                                        <li
                                          key={index}
                                          className="flex items-start space-x-3"
                                        >
                                          <span className="text-green-400 font-bold">
                                            {index + 1}.
                                          </span>
                                          <span className="text-gray-300">
                                            {point}
                                          </span>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              )}
                          </div>
                        </div>
                      )}

                    {/* Relationships */}
                    {topic.content.relationships &&
                      topic.content.relationships.types && (
                        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-3">
                            {topic.content.relationships.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.relationships.types.map(
                              (type, index) => (
                                <div
                                  key={index}
                                  className="border-l-4 border-yellow-400/30 pl-4"
                                >
                                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                                    {type.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {type.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Attributes */}
                    {topic.content.attributes &&
                      topic.content.attributes.types && (
                        <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-indigo-400 mb-3">
                            {topic.content.attributes.title}
                          </h3>
                          <div className="space-y-3">
                            {topic.content.attributes.types.map(
                              (attribute, index) => (
                                <div
                                  key={index}
                                  className="border-l-4 border-indigo-400/30 pl-4"
                                >
                                  <h4 className="text-lg font-semibold text-indigo-400 mb-2">
                                    {attribute.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {attribute.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Cardinality */}
                    {topic.content.cardinality &&
                      topic.content.cardinality.types && (
                        <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-pink-400 mb-3">
                            {topic.content.cardinality.title}
                          </h3>
                          <div className="space-y-3">
                            {topic.content.cardinality.types.map(
                              (card, index) => (
                                <div
                                  key={index}
                                  className="border-l-4 border-pink-400/30 pl-4"
                                >
                                  <h4 className="text-lg font-semibold text-pink-400 mb-2">
                                    {card.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {card.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Participation */}
                    {topic.content.participation &&
                      topic.content.participation.types && (
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                            {topic.content.participation.title}
                          </h3>
                          <div className="space-y-3">
                            {topic.content.participation.types.map(
                              (part, index) => (
                                <div
                                  key={index}
                                  className="border-l-4 border-cyan-400/30 pl-4"
                                >
                                  <h4 className="text-lg font-semibold text-cyan-400 mb-2">
                                    {part.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {part.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Data Models Importance */}
                    {topic.content.importance &&
                      topic.content.importance.points && (
                        <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-cyan-400 mb-3">
                            {topic.content.importance.title}
                          </h3>
                          <ul className="space-y-2">
                            {topic.content.importance.points.map(
                              (point, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <span className="text-cyan-400 font-bold">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-300">{point}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Data Model Types */}
                    {topic.content.types?.models && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">
                          {topic.content.types.title}
                        </h3>
                        {topic.content.types.models.map((model, index) => (
                          <div
                            key={index}
                            className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6"
                          >
                            <h4 className="text-lg font-semibold text-purple-400 mb-2">
                              {model.name}
                            </h4>
                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {model.description}
                            </p>

                            {/* Characteristics */}
                            {model.characteristics && (
                              <div className="mb-4">
                                <h5 className="text-md font-semibold text-purple-300 mb-2">
                                  Characteristics:
                                </h5>
                                <ul className="space-y-1">
                                  {model.characteristics.map(
                                    (char, charIndex) => (
                                      <li
                                        key={charIndex}
                                        className="flex items-start space-x-2"
                                      >
                                        <span className="text-purple-400 font-bold">
                                          •
                                        </span>
                                        <span className="text-gray-300 text-sm">
                                          {char}
                                        </span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                            {/* Advantages */}
                            {model.advantages && (
                              <div className="mb-4">
                                <h5 className="text-md font-semibold text-green-300 mb-2">
                                  Advantages:
                                </h5>
                                <ul className="space-y-1">
                                  {model.advantages.map((adv, advIndex) => (
                                    <li
                                      key={advIndex}
                                      className="flex items-start space-x-2"
                                    >
                                      <span className="text-green-400 font-bold">
                                        •
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {adv}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Disadvantages */}
                            {model.disadvantages && (
                              <div className="mb-4">
                                <h5 className="text-md font-semibold text-red-300 mb-2">
                                  Disadvantages:
                                </h5>
                                <ul className="space-y-1">
                                  {model.disadvantages.map((dis, disIndex) => (
                                    <li
                                      key={disIndex}
                                      className="flex items-start space-x-2"
                                    >
                                      <span className="text-red-400 font-bold">
                                        •
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {dis}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* NoSQL Types */}
                            {model.types && (
                              <div className="mb-4">
                                <h5 className="text-md font-semibold text-indigo-300 mb-2">
                                  NoSQL Types:
                                </h5>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  {model.types.map((type, typeIndex) => (
                                    <div
                                      key={typeIndex}
                                      className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-3"
                                    >
                                      <h6 className="text-sm font-semibold text-indigo-400 mb-1">
                                        {type.name}
                                      </h6>
                                      <p className="text-gray-300 text-xs mb-2">
                                        {type.description}
                                      </p>
                                      <div className="flex flex-wrap gap-1">
                                        {type.examples.map(
                                          (example, exIndex) => (
                                            <span
                                              key={exIndex}
                                              className="px-2 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded"
                                            >
                                              {example}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Examples */}
                            {model.examples && (
                              <div>
                                <h5 className="text-md font-semibold text-yellow-300 mb-2">
                                  Examples:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {model.examples.map((example, exIndex) => (
                                    <span
                                      key={exIndex}
                                      className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full"
                                    >
                                      {example}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Evolution Timeline */}
                    {topic.content.evolution &&
                      topic.content.evolution.timeline && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-orange-400 mb-4">
                            {topic.content.evolution.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.evolution.timeline.map(
                              (era, index) => (
                                <div
                                  key={index}
                                  className="flex items-start space-x-4"
                                >
                                  <div className="flex-shrink-0 w-20 text-center">
                                    <span className="inline-flex items-center justify-center w-8 h-8 bg-orange-500/20 text-orange-300 rounded-full text-sm font-semibold">
                                      {era.era}
                                    </span>
                                  </div>
                                  <div className="flex-1">
                                    <h4 className="text-lg font-semibold text-orange-400 mb-2">
                                      {era.model}
                                    </h4>
                                    <p className="text-gray-300 text-sm">
                                      {era.description}
                                    </p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Selection Criteria */}
                    {topic.content.selection &&
                      topic.content.selection.factors && (
                        <div className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-teal-400 mb-3">
                            {topic.content.selection.title}
                          </h3>
                          <ul className="space-y-2">
                            {topic.content.selection.factors.map(
                              (factor, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <span className="text-teal-400 font-bold">
                                    {index + 1}.
                                  </span>
                                  <span className="text-gray-300">
                                    {factor}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Real-World Applications */}
                    {topic.content.realWorld &&
                      topic.content.realWorld.examples && (
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                            {topic.content.realWorld.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {topic.content.realWorld.examples.map(
                              (example, index) => (
                                <div
                                  key={index}
                                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-emerald-400 mb-2">
                                    {example.domain}
                                  </h4>
                                  <div className="mb-2">
                                    <span className="text-sm font-medium text-emerald-300">
                                      Model:{" "}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {example.model}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-emerald-300">
                                      Reason:{" "}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {example.reason}
                                    </span>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* ER to Relational Mapping Steps */}
                    {topic.content.steps && topic.content.steps.process && (
                      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                          {topic.content.steps.title}
                        </h3>
                        <div className="space-y-6">
                          {topic.content.steps.process.map((step, index) => (
                            <div
                              key={index}
                              className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-4"
                            >
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0">
                                  <span className="inline-flex items-center justify-center w-8 h-8 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-semibold">
                                    {index + 1}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <h4 className="text-lg font-semibold text-indigo-400 mb-2">
                                    {step.step}
                                  </h4>
                                  <p className="text-gray-300 mb-3 leading-relaxed">
                                    {step.description}
                                  </p>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                                    <code className="text-green-300 text-sm font-mono">
                                      {step.example}
                                    </code>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mapping Examples */}
                    {topic.content.examples && topic.content.examples.cases && (
                      <div className="bg-gradient-to-r from-green-500/10 to-teal-500/10 border border-green-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-400 mb-4">
                          {topic.content.examples.title}
                        </h3>
                        <div className="space-y-6">
                          {topic.content.examples.cases.map(
                            (example, index) => (
                              <div
                                key={index}
                                className="bg-green-500/10 border border-green-500/20 rounded-lg p-5"
                              >
                                <h4 className="text-lg font-semibold text-green-400 mb-2">
                                  {example.name}
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <h5 className="text-md font-semibold text-green-300 mb-2">
                                      Entities:
                                    </h5>
                                    <p className="text-gray-300 text-sm mb-3">
                                      {example.entities}
                                    </p>
                                    <h5 className="text-md font-semibold text-green-300 mb-2">
                                      Relationships:
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      {example.relationships}
                                    </p>
                                  </div>
                                  <div>
                                    <h5 className="text-md font-semibold text-green-300 mb-2">
                                      Resulting Tables:
                                    </h5>
                                    <p className="text-gray-300 text-sm">
                                      {example.tables}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Design Considerations */}
                    {topic.content.considerations &&
                      topic.content.considerations.points && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-orange-400 mb-3">
                            {topic.content.considerations.title}
                          </h3>
                          <ul className="space-y-2">
                            {topic.content.considerations.points.map(
                              (point, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <span className="text-orange-400 font-bold">
                                    •
                                  </span>
                                  <span className="text-gray-300">{point}</span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Key Concepts */}
                    {topic.content.concepts && topic.content.concepts.list && (
                      <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-blue-400 mb-4">
                          {topic.content.concepts.title}
                        </h3>
                        <ul className="space-y-3">
                          {topic.content.concepts.list.map((concept, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <span className="text-blue-400 font-bold">•</span>
                              <span className="text-gray-300">{concept}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Keys in Relational Model */}
                    {topic.content.keys && topic.content.keys.types && (
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">
                          {topic.content.keys.title}
                        </h3>
                        <div className="space-y-4">
                          {topic.content.keys.types.map((keyType, index) => (
                            <div
                              key={index}
                              className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
                            >
                              <h4 className="text-lg font-semibold text-purple-300 mb-2">
                                {keyType.name}
                              </h4>
                              <p className="text-gray-300">
                                {keyType.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Integrity Constraints */}
                    {topic.content.integrity &&
                      topic.content.integrity.constraints && (
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                            {topic.content.integrity.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.integrity.constraints.map(
                              (constraint, index) => (
                                <div
                                  key={index}
                                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-emerald-300 mb-2">
                                    {constraint.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {constraint.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Normalization Objectives */}
                    {topic.content.objectives &&
                      topic.content.objectives.list && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">
                            {topic.content.objectives.title}
                          </h3>
                          <ul className="space-y-3">
                            {topic.content.objectives.list.map(
                              (objective, index) => (
                                <li
                                  key={index}
                                  className="flex items-start space-x-3"
                                >
                                  <span className="text-blue-400 font-bold">
                                    •
                                  </span>
                                  <span className="text-gray-300">
                                    {objective}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Normal Forms */}
                    {topic.content.normalForms &&
                      topic.content.normalForms.forms && (
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-purple-400 mb-4">
                            {topic.content.normalForms.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.normalForms.forms.map(
                              (form, index) => (
                                <div
                                  key={index}
                                  className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-purple-300 mb-2">
                                    {form.name}
                                  </h4>
                                  <p className="text-gray-300">
                                    {form.description}
                                  </p>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Functional Dependencies in Normalization */}
                    {topic.content.dependencies &&
                      topic.content.dependencies.types && (
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                            {topic.content.dependencies.title}
                          </h3>
                          <p className="text-gray-300 mb-4">
                            {topic.content.dependencies.description}
                          </p>
                          <div>
                            <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                              Dependency Types:
                            </h4>
                            <ul className="space-y-2">
                              {topic.content.dependencies.types.map(
                                (type, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <span className="text-emerald-400 font-bold">
                                      •
                                    </span>
                                    <span className="text-gray-300">
                                      {type}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        </div>
                      )}

                    {/* SQL Command Categories */}
                    {topic.content.categories &&
                      topic.content.categories.types && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">
                            {topic.content.categories.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.categories.types.map(
                              (category, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-blue-300 mb-2">
                                    {category.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3">
                                    {category.description}
                                  </p>
                                  <div className="flex flex-wrap gap-2">
                                    {category.commands.map(
                                      (command, cmdIndex) => (
                                        <span
                                          key={cmdIndex}
                                          className="px-3 py-1 bg-blue-500/20 text-blue-300 text-sm rounded-full"
                                        >
                                          {command}
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Basic SQL Queries */}
                    {topic.content.basicQueries &&
                      topic.content.basicQueries.examples && (
                        <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-purple-400 mb-4">
                            {topic.content.basicQueries.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.basicQueries.examples.map(
                              (query, index) => (
                                <div
                                  key={index}
                                  className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-purple-300 mb-2">
                                    {query.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3">
                                    {query.description}
                                  </p>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                                    <code className="text-green-300 text-sm font-mono">
                                      {query.syntax}
                                    </code>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Important SQL Clauses */}
                    {topic.content.clauses && topic.content.clauses.list && (
                      <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                          {topic.content.clauses.title}
                        </h3>
                        <ul className="space-y-3">
                          {topic.content.clauses.list.map((clause, index) => (
                            <li
                              key={index}
                              className="flex items-start space-x-3"
                            >
                              <span className="text-emerald-400 font-bold">
                                •
                              </span>
                              <span className="text-gray-300">{clause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* DML Operations */}
                    {topic.content.dmlOperations &&
                      topic.content.dmlOperations.operations && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">
                            {topic.content.dmlOperations.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.dmlOperations.operations.map(
                              (operation, index) => (
                                <div
                                  key={index}
                                  className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-blue-300 mb-2">
                                    {operation.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3">
                                    {operation.description}
                                  </p>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                                    <span className="text-sm font-medium text-blue-300">
                                      Syntax:{" "}
                                    </span>
                                    <code className="text-green-300 text-sm font-mono">
                                      {operation.syntax}
                                    </code>
                                  </div>
                                  {operation.examples && (
                                    <div>
                                      <h5 className="text-sm font-semibold text-blue-300 mb-2">
                                        Examples:
                                      </h5>
                                      <div className="space-y-2">
                                        {operation.examples.map(
                                          (example, exIndex) => (
                                            <div
                                              key={exIndex}
                                              className="bg-gray-900/50 border border-gray-700 rounded-lg p-2"
                                            >
                                              <code className="text-green-300 text-xs font-mono">
                                                {example}
                                              </code>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* JOIN Operations */}
                    {topic.content.joins && topic.content.joins.types && (
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-4">
                          {topic.content.joins.title}
                        </h3>
                        <div className="space-y-4">
                          {topic.content.joins.types.map((join, index) => (
                            <div
                              key={index}
                              className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
                            >
                              <h4 className="text-lg font-semibold text-purple-300 mb-2">
                                {join.name}
                              </h4>
                              <p className="text-gray-300 mb-3">
                                {join.description}
                              </p>
                              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                                <span className="text-sm font-medium text-purple-300">
                                  Syntax:{" "}
                                </span>
                                <code className="text-green-300 text-sm font-mono">
                                  {join.syntax}
                                </code>
                              </div>
                              <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-2">
                                <span className="text-sm font-medium text-purple-300">
                                  Example:{" "}
                                </span>
                                <code className="text-green-300 text-sm font-mono">
                                  {join.example}
                                </code>
                              </div>
                              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-2">
                                <span className="text-sm font-medium text-purple-300">
                                  Result:{" "}
                                </span>
                                <span className="text-gray-300 text-sm">
                                  {join.result}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Advanced DML Concepts */}
                    {topic.content.advancedConcepts &&
                      topic.content.advancedConcepts.concepts && (
                        <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-emerald-400 mb-4">
                            {topic.content.advancedConcepts.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.advancedConcepts.concepts.map(
                              (concept, index) => (
                                <div
                                  key={index}
                                  className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-emerald-300 mb-2">
                                    {concept.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3">
                                    {concept.description}
                                  </p>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                    <code className="text-green-300 text-sm font-mono">
                                      {concept.example}
                                    </code>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Aggregate Functions */}
                    {topic.content.aggregateFunctions &&
                      topic.content.aggregateFunctions.functions && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-orange-400 mb-4">
                            {topic.content.aggregateFunctions.title}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {topic.content.aggregateFunctions.functions.map(
                              (func, index) => (
                                <div
                                  key={index}
                                  className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-orange-300 mb-2">
                                    {func.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3">
                                    {func.description}
                                  </p>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                    <code className="text-green-300 text-sm font-mono">
                                      {func.example}
                                    </code>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Query Examples */}
                    {topic.content.queryExamples &&
                      topic.content.queryExamples.examples && (
                        <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-teal-400 mb-4">
                            {topic.content.queryExamples.title}
                          </h3>
                          <div className="space-y-4">
                            {topic.content.queryExamples.examples.map(
                              (example, index) => (
                                <div
                                  key={index}
                                  className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4"
                                >
                                  <h4 className="text-lg font-semibold text-teal-300 mb-2">
                                    {example.scenario}
                                  </h4>
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                    <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                      {example.query}
                                    </code>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Subqueries and Nested Queries */}
                    {topic.content.subqueries &&
                      topic.content.subqueries.types && (
                        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-blue-400 mb-4">
                            {topic.content.subqueries.title}
                          </h3>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-blue-400 mb-3">
                              Subquery Types:
                            </h4>
                            <div className="space-y-4">
                              {topic.content.subqueries.types.map(
                                (type, index) => (
                                  <div
                                    key={index}
                                    className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                                  >
                                    <h5 className="text-md font-semibold text-blue-300 mb-2">
                                      {type.name}
                                    </h5>
                                    <p className="text-gray-300 text-sm mb-3">
                                      {type.description}
                                    </p>
                                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-2">
                                      <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                        {type.example}
                                      </code>
                                    </div>
                                    <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-2">
                                      <span className="text-sm font-medium text-blue-300">
                                        Usage:{" "}
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {type.usage}
                                      </span>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {topic.content.subqueries.operators && (
                            <div>
                              <h4 className="text-lg font-semibold text-blue-400 mb-3">
                                Subquery Operators:
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {topic.content.subqueries.operators.map(
                                  (operator, index) => (
                                    <div
                                      key={index}
                                      className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4"
                                    >
                                      <h5 className="text-md font-semibold text-blue-300 mb-2">
                                        {operator.name}
                                      </h5>
                                      <p className="text-gray-300 text-sm mb-3">
                                        {operator.description}
                                      </p>
                                      <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                        <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                          {operator.example}
                                        </code>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                    {/* Views and Virtual Tables */}
                    {topic.content.views && topic.content.views.types && (
                      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-purple-400 mb-3">
                          {topic.content.views.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {topic.content.views.definition}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-purple-400 mb-3">
                            View Types:
                          </h4>
                          <div className="space-y-4">
                            {topic.content.views.types.map((type, index) => (
                              <div
                                key={index}
                                className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4"
                              >
                                <h5 className="text-md font-semibold text-purple-300 mb-2">
                                  {type.name}
                                </h5>
                                <p className="text-gray-300 text-sm mb-3">
                                  {type.description}
                                </p>
                                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-3">
                                  <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                    {type.example}
                                  </code>
                                </div>
                                {type.characteristics && (
                                  <div>
                                    <h6 className="text-sm font-semibold text-purple-300 mb-1">
                                      Characteristics:
                                    </h6>
                                    <ul className="space-y-1">
                                      {type.characteristics.map(
                                        (char, charIndex) => (
                                          <li
                                            key={charIndex}
                                            className="flex items-start space-x-2"
                                          >
                                            <span className="text-purple-400 font-bold">
                                              •
                                            </span>
                                            <span className="text-gray-300 text-xs">
                                              {char}
                                            </span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {topic.content.views.advantages && (
                          <div>
                            <h4 className="text-lg font-semibold text-purple-400 mb-3">
                              Advantages:
                            </h4>
                            <ul className="space-y-2">
                              {topic.content.views.advantages.map(
                                (advantage, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <span className="text-purple-400 font-bold">
                                      •
                                    </span>
                                    <span className="text-gray-300">
                                      {advantage}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Stored Procedures and Functions */}
                    {topic.content.storedProcedures &&
                      topic.content.storedProcedures.components && (
                        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-orange-400 mb-3">
                            {topic.content.storedProcedures.title}
                          </h3>
                          <p className="text-gray-300 mb-4">
                            {topic.content.storedProcedures.definition}
                          </p>

                          <div className="mb-6">
                            <h4 className="text-lg font-semibold text-orange-400 mb-3">
                              Components:
                            </h4>
                            <div className="space-y-4">
                              {topic.content.storedProcedures.components.map(
                                (component, index) => (
                                  <div
                                    key={index}
                                    className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4"
                                  >
                                    <h5 className="text-md font-semibold text-orange-300 mb-2">
                                      {component.name}
                                    </h5>
                                    <p className="text-gray-300 text-sm mb-3">
                                      {component.description}
                                    </p>
                                    <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                      <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                        {component.example}
                                      </code>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>

                          {topic.content.storedProcedures.advantages && (
                            <div>
                              <h4 className="text-lg font-semibold text-orange-400 mb-3">
                                Advantages:
                              </h4>
                              <ul className="space-y-2">
                                {topic.content.storedProcedures.advantages.map(
                                  (advantage, index) => (
                                    <li
                                      key={index}
                                      className="flex items-start space-x-3"
                                    >
                                      <span className="text-orange-400 font-bold">
                                        •
                                      </span>
                                      <span className="text-gray-300">
                                        {advantage}
                                      </span>
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                    {/* Database Triggers */}
                    {topic.content.triggers && topic.content.triggers.types && (
                      <div className="bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-teal-400 mb-3">
                          {topic.content.triggers.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {topic.content.triggers.definition}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-teal-400 mb-3">
                            Trigger Types:
                          </h4>
                          <div className="space-y-4">
                            {topic.content.triggers.types.map((type, index) => (
                              <div
                                key={index}
                                className="bg-teal-500/10 border border-teal-500/20 rounded-lg p-4"
                              >
                                <h5 className="text-md font-semibold text-teal-300 mb-2">
                                  {type.name}
                                </h5>
                                <p className="text-gray-300 text-sm mb-3">
                                  {type.description}
                                </p>
                                <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-2">
                                  <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                    {type.example}
                                  </code>
                                </div>
                                <div className="bg-teal-500/20 border border-teal-500/30 rounded-lg p-2">
                                  <span className="text-sm font-medium text-teal-300">
                                    Usage:{" "}
                                  </span>
                                  <span className="text-gray-300 text-sm">
                                    {type.usage}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {topic.content.triggers.events && (
                          <div>
                            <h4 className="text-lg font-semibold text-teal-400 mb-3">
                              Trigger Events:
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {topic.content.triggers.events.map(
                                (event, index) => (
                                  <span
                                    key={index}
                                    className="px-3 py-1 bg-teal-500/20 text-teal-300 text-sm rounded-full"
                                  >
                                    {event}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Indexing and Performance */}
                    {topic.content.indexing && topic.content.indexing.types && (
                      <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-emerald-400 mb-3">
                          {topic.content.indexing.title}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {topic.content.indexing.definition}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                            Index Types:
                          </h4>
                          <div className="space-y-4">
                            {topic.content.indexing.types.map((type, index) => (
                              <div
                                key={index}
                                className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-4"
                              >
                                <h5 className="text-md font-semibold text-emerald-300 mb-2">
                                  {type.name}
                                </h5>
                                <p className="text-gray-300 text-sm mb-3">
                                  {type.description}
                                </p>
                                {type.example && (
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3 mb-2">
                                    <code className="text-green-300 text-xs font-mono">
                                      {type.example}
                                    </code>
                                  </div>
                                )}
                                {type.usage && (
                                  <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-2 mb-2">
                                    <span className="text-sm font-medium text-emerald-300">
                                      Usage:{" "}
                                    </span>
                                    <span className="text-gray-300 text-sm">
                                      {type.usage}
                                    </span>
                                  </div>
                                )}
                                {type.characteristics && (
                                  <div>
                                    <h6 className="text-sm font-semibold text-emerald-300 mb-1">
                                      Characteristics:
                                    </h6>
                                    <ul className="space-y-1">
                                      {type.characteristics.map(
                                        (char, charIndex) => (
                                          <li
                                            key={charIndex}
                                            className="flex items-start space-x-2"
                                          >
                                            <span className="text-emerald-400 font-bold">
                                              •
                                            </span>
                                            <span className="text-gray-300 text-xs">
                                              {char}
                                            </span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        {topic.content.indexing.guidelines && (
                          <div>
                            <h4 className="text-lg font-semibold text-emerald-400 mb-3">
                              Indexing Guidelines:
                            </h4>
                            <ul className="space-y-2">
                              {topic.content.indexing.guidelines.map(
                                (guideline, index) => (
                                  <li
                                    key={index}
                                    className="flex items-start space-x-3"
                                  >
                                    <span className="text-emerald-400 font-bold">
                                      •
                                    </span>
                                    <span className="text-gray-300">
                                      {guideline}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Query Optimization */}
                    {topic.content.optimization &&
                      topic.content.optimization.strategies && (
                        <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-yellow-400 mb-4">
                            {topic.content.optimization.title}
                          </h3>
                          <div className="space-y-6">
                            {topic.content.optimization.strategies.map(
                              (strategy, index) => (
                                <div
                                  key={index}
                                  className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-5"
                                >
                                  <h4 className="text-lg font-semibold text-yellow-400 mb-2">
                                    {strategy.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3 leading-relaxed">
                                    {strategy.description}
                                  </p>
                                  {strategy.tools && (
                                    <div className="mb-3">
                                      <h5 className="text-md font-semibold text-yellow-300 mb-2">
                                        Tools:
                                      </h5>
                                      <div className="flex flex-wrap gap-2">
                                        {strategy.tools.map(
                                          (tool, toolIndex) => (
                                            <span
                                              key={toolIndex}
                                              className="px-3 py-1 bg-yellow-500/20 text-yellow-300 text-sm rounded-full"
                                            >
                                              {tool}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {strategy.focus && (
                                    <div className="mb-3">
                                      <span className="text-sm font-medium text-yellow-300">
                                        Focus:{" "}
                                      </span>
                                      <span className="text-gray-300 text-sm">
                                        {strategy.focus}
                                      </span>
                                    </div>
                                  )}
                                  {strategy.tips && (
                                    <div>
                                      <h5 className="text-md font-semibold text-yellow-300 mb-2">
                                        Tips:
                                      </h5>
                                      <ul className="space-y-1">
                                        {strategy.tips.map((tip, tipIndex) => (
                                          <li
                                            key={tipIndex}
                                            className="flex items-start space-x-2"
                                          >
                                            <span className="text-yellow-400 font-bold">
                                              •
                                            </span>
                                            <span className="text-gray-300 text-sm">
                                              {tip}
                                            </span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}
                                  {strategy.techniques && (
                                    <div>
                                      <h5 className="text-md font-semibold text-yellow-300 mb-2">
                                        Techniques:
                                      </h5>
                                      <ul className="space-y-1">
                                        {strategy.techniques.map(
                                          (technique, techIndex) => (
                                            <li
                                              key={techIndex}
                                              className="flex items-start space-x-2"
                                            >
                                              <span className="text-yellow-400 font-bold">
                                                •
                                              </span>
                                              <span className="text-gray-300 text-sm">
                                                {technique}
                                              </span>
                                            </li>
                                          )
                                        )}
                                      </ul>
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {/* Advanced SQL Features */}
                    {topic.content.advancedFeatures &&
                      topic.content.advancedFeatures.features && (
                        <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg p-6">
                          <h3 className="text-xl font-semibold text-indigo-400 mb-4">
                            {topic.content.advancedFeatures.title}
                          </h3>
                          <div className="space-y-6">
                            {topic.content.advancedFeatures.features.map(
                              (feature, index) => (
                                <div
                                  key={index}
                                  className="bg-indigo-500/10 border border-indigo-500/20 rounded-lg p-5"
                                >
                                  <h4 className="text-lg font-semibold text-indigo-400 mb-2">
                                    {feature.name}
                                  </h4>
                                  <p className="text-gray-300 mb-3 leading-relaxed">
                                    {feature.description}
                                  </p>
                                  {feature.functions && (
                                    <div className="mb-3">
                                      <h5 className="text-md font-semibold text-indigo-300 mb-2">
                                        Functions:
                                      </h5>
                                      <div className="flex flex-wrap gap-2">
                                        {feature.functions.map(
                                          (func, funcIndex) => (
                                            <span
                                              key={funcIndex}
                                              className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full"
                                            >
                                              {func}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  {feature.types && (
                                    <div className="mb-3">
                                      <h5 className="text-md font-semibold text-indigo-300 mb-2">
                                        Types:
                                      </h5>
                                      <div className="flex flex-wrap gap-2">
                                        {feature.types.map(
                                          (type, typeIndex) => (
                                            <span
                                              key={typeIndex}
                                              className="px-3 py-1 bg-indigo-500/20 text-indigo-300 text-sm rounded-full"
                                            >
                                              {type}
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                  <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-3">
                                    <code className="text-green-300 text-xs font-mono whitespace-pre-wrap">
                                      {feature.example}
                                    </code>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              {!topic.completed && (
                <div className="mt-8 text-center">
                  <button
                    onClick={handleMarkComplete}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300"
                  >
                    Mark as Complete
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-white mb-4">
                {currentSection
                  ? `${currentSection.title} Topics`
                  : "Course Navigation"}
              </h3>

              <div className="space-y-3">
                {/* Only show topics from the current section */}
                {currentSection &&
                  currentSection.topics.map((t, index) => (
                    <button
                      key={t.id}
                      onClick={() =>
                        navigate(`/subject/${subjectId}/topic/${t.id}`)
                      }
                      className={`w-full text-left p-3 rounded-lg transition-all duration-300 ${
                        t.id === parseInt(topicId)
                          ? "bg-blue-500/20 border border-blue-500/30 text-blue-400"
                          : "bg-gray-700/30 hover:bg-gray-700/50 text-gray-300 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium">{index + 1}</span>
                        {t.completed ? (
                          <FaCheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <FaCircle className="w-4 h-4 text-gray-500" />
                        )}
                        <span className="text-sm">{t.title}</span>
                      </div>
                    </button>
                  ))}
              </div>

              {/* Navigation Buttons */}
              <div className="mt-6 space-y-3">
                {currentSection &&
                  (() => {
                    const currentIndex = currentSection.topics.findIndex(
                      (t) => t.id === parseInt(topicId)
                    );
                    const hasPrevious = currentIndex > 0;
                    const hasNext =
                      currentIndex < currentSection.topics.length - 1;

                    return (
                      <>
                        {hasPrevious && (
                          <button
                            onClick={handlePreviousTopic}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 hover:text-white transition-all duration-300"
                          >
                            <FaChevronLeft className="w-4 h-4" />
                            <span>Previous</span>
                          </button>
                        )}

                        {hasNext && (
                          <button
                            onClick={handleNextTopic}
                            className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300"
                          >
                            <span>Next</span>
                            <FaChevronRight className="w-4 h-4" />
                          </button>
                        )}
                      </>
                    );
                  })()}
              </div>

              {/* Section Info */}
              {currentSection && (
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <h4 className="text-sm font-semibold text-blue-400 mb-2">
                    Current Section
                  </h4>
                  <p className="text-xs text-gray-300">
                    {currentSection.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {currentSection.topics.filter((t) => t.completed).length} of{" "}
                    {currentSection.topics.length} completed
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
