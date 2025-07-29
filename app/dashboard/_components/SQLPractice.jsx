"use client";

import { useState, useRef, useEffect } from "react";
import { 
  Database, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb,
  Star,
  Heart,
  Sparkles,
  Wand2,
  Rocket,
  Trophy,
  Target,
  Zap,
  Brain,
  FileText,
  Copy,
  Download,
  ChevronRight,
  ChevronDown,
  LoaderCircle,
  Code,
  Table,
  Search,
  Filter,
  BarChart3,
  Clock,
  Award,
  BookOpen,
  Users,
  Settings,
  Eye,
  EyeOff,
  MessageSquare,
  Send,
  Mic,
  MicOff,
  Plus,
  Trash2,
  Edit,
  Save,
  Upload,
  Terminal,
  Cpu,
  TrendingUp,
  Layers,
  GitBranch,
  Shuffle
} from "lucide-react";

// Simple UI Components
const Button = ({ children, onClick, disabled, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-8"
  };
  const variantClasses = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-blue-500",
    destructive: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-gray-500"
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

const Textarea = ({ className = "", ...props }) => (
  <textarea
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none ${className}`}
    {...props}
  />
);

const Input = ({ className = "", ...props }) => (
  <input
    className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
    {...props}
  />
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardHeader = ({ children, className = "" }) => (
  <div className={`p-6 pb-0 ${className}`}>{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
  <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variantClasses = {
    default: "bg-blue-100 text-blue-800",
    secondary: "bg-gray-100 text-gray-800",
    destructive: "bg-red-100 text-red-800",
    outline: "border border-gray-300 text-gray-700"
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Custom Tab Components
const TabButton = ({ children, isActive, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
      isActive 
        ? 'bg-purple-500 text-white shadow-lg' 
        : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700'
    } ${className}`}
  >
    {children}
  </button>
);

// Mock Gemini AI Session
const mockChatSession = {
  sendMessage: async (prompt) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Mock responses based on prompt content
    if (prompt.includes('Analyze this SQL query')) {
      return {
        response: {
          text: () => JSON.stringify({
            syntax: { 
              valid: true, 
              errors: [], 
              suggestions: ["Consider adding indexes on frequently queried columns"] 
            },
            performance: { 
              score: 7, 
              bottlenecks: ["Table scan on large table", "Missing index on join column"], 
              optimizations: ["Add index on user_id", "Use LIMIT for pagination"] 
            },
            structure: { 
              complexity: "medium", 
              readability: 8, 
              bestPractices: ["Good use of aliases", "Proper JOIN syntax"] 
            },
            explanation: "This query retrieves user information along with their order count using a LEFT JOIN to include users with no orders. Results are grouped by user and ordered by order count.",
            alternativeQueries: [
              "SELECT u.name, COALESCE(o.order_count, 0) FROM users u LEFT JOIN (SELECT user_id, COUNT(*) as order_count FROM orders GROUP BY user_id) o ON u.id = o.user_id",
              "WITH order_counts AS (SELECT user_id, COUNT(*) as cnt FROM orders GROUP BY user_id) SELECT u.name, COALESCE(oc.cnt, 0) FROM users u LEFT JOIN order_counts oc ON u.id = oc.user_id"
            ],
            interviewFeedback: "Good understanding of JOINs and aggregation. Consider discussing index strategies and query performance implications.",
            executionPlan: "1. Scan users table 2. Hash join with orders 3. Group by user 4. Sort by count",
            indexSuggestions: ["CREATE INDEX idx_orders_user_id ON orders(user_id)", "CREATE INDEX idx_users_id ON users(id)"],
            securityIssues: []
          })
        }
      };
    }
    
    if (prompt.includes('Start a technical SQL interview')) {
      return {
        response: {
          text: () => JSON.stringify({
            question: "Let's start with a practical scenario. You have a table called 'employees' with columns: id, name, department_id, salary, hire_date. Write a query to find the top 3 highest-paid employees in each department.",
            context: "This question tests your knowledge of window functions, ranking, and data partitioning - essential skills for real-world database work.",
            expectedTopics: ["Window functions", "ROW_NUMBER() or RANK()", "PARTITION BY", "Subqueries or CTEs"]
          })
        }
      };
    }
    
    if (prompt.includes('conducting a SQL interview')) {
      return {
        response: {
          text: () => JSON.stringify({
            evaluation: "Good attempt! You correctly identified the need for window functions. Your query structure is solid.",
            score: 7,
            nextQuestion: "Excellent! Now let's dive deeper. How would you optimize a query that's running slowly due to a large table scan? What steps would you take to diagnose and fix the performance issue?",
            difficulty: "intermediate",
            followUp: "Consider explaining the thought process behind your optimization choices."
          })
        }
      };
    }
    
    if (prompt.includes('Generate a real-world SQL problem')) {
      const scenarios = [
        {
          scenario: "You're working for a fast-growing e-commerce company. The platform handles thousands of orders daily, and the business team needs insights into customer behavior and sales performance.",
          problem: "Create a comprehensive sales report that shows monthly revenue trends, identifies top-performing products, and analyzes customer retention patterns.",
          requirements: [
            "Calculate monthly revenue for the last 12 months",
            "Identify top 10 best-selling products by quantity and revenue",
            "Find customers who made repeat purchases",
            "Calculate average order value by customer segment",
            "Identify seasonal trends in product categories"
          ],
          sampleSchema: `CREATE TABLE customers (
    id INT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    registration_date DATE,
    customer_segment VARCHAR(50)
);

CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(255),
    category_id INT,
    price DECIMAL(10,2),
    cost DECIMAL(10,2)
);

CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    total_amount DECIMAL(10,2),
    status VARCHAR(50),
    FOREIGN KEY (customer_id) REFERENCES customers(id)
);

CREATE TABLE order_items (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    unit_price DECIMAL(10,2),
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);`,
          expectedApproach: "Use CTEs or subqueries to break down the complex analysis into manageable parts. Utilize window functions for trends and ranking. Consider date functions for monthly aggregations.",
          complexity: "intermediate",
          businessImpact: "This analysis directly impacts pricing strategies, inventory planning, and customer retention initiatives, potentially affecting millions in revenue."
        }
      ];
      
      return {
        response: {
          text: () => JSON.stringify(scenarios[0])
        }
      };
    }
    
    if (prompt.includes('Optimize this SQL query')) {
      return {
        response: {
          text: () => JSON.stringify({
            originalQuery: prompt.split('Query: ')[1]?.split('\n')[0] || "Original query",
            optimizedQuery: `SELECT u.name, COUNT(o.id) as order_count
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE u.status = 'active'
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 0
ORDER BY order_count DESC
LIMIT 100;`,
            improvements: [
              "Added explicit LIMIT to prevent excessive results",
              "Added WHERE clause to filter active users early",
              "Used HAVING to filter groups efficiently",
              "Maintained proper indexing strategy"
            ],
            performanceGains: "Expected 60-80% performance improvement with proper indexing. Query should execute in milliseconds instead of seconds.",
            indexRecommendations: [
              "CREATE INDEX idx_users_status_id ON users(status, id)",
              "CREATE INDEX idx_orders_user_id ON orders(user_id)"
            ],
            explanation: "The optimization focuses on reducing the dataset early through filtering, using efficient JOIN strategies, and limiting results to prevent memory issues.",
            beforeAfterComparison: "Before: Full table scan, 5-10 seconds. After: Index scan, 50-100ms",
            additionalTips: [
              "Consider partitioning for very large tables",
              "Monitor query execution plans regularly",
              "Use EXPLAIN ANALYZE to verify performance gains"
            ]
          })
        }
      };
    }
    
    if (prompt.includes('Analyze the performance characteristics')) {
      return {
        response: {
          text: () => JSON.stringify({
            complexity: "O(n log n) due to sorting operation. The JOIN operation is O(n*m) where n and m are table sizes.",
            executionSteps: [
              "1. Table scan on users table",
              "2. Index lookup on orders table using user_id",
              "3. Hash join between users and orders",
              "4. Group aggregation for COUNT",
              "5. Sort operation for ORDER BY",
              "6. Return results"
            ],
            resourceUsage: { cpu: "medium", memory: "high", disk: "low" },
            scalabilityIssues: [
              "Memory usage increases with result set size",
              "Sort operation becomes expensive with large datasets",
              "JOIN performance degrades without proper indexes"
            ],
            optimizationPriority: [
              "Add indexes on join columns",
              "Consider LIMIT clause",
              "Optimize GROUP BY with covering indexes"
            ],
            performanceScore: 72,
            bottlenecks: [
              "Missing index on orders.user_id",
              "No LIMIT clause for result set",
              "Potential full table scan on users"
            ],
            recommendations: [
              "Add composite index on (user_id, id) for orders table",
              "Consider using window functions for better performance",
              "Implement pagination for large result sets"
            ]
          })
        }
      };
    }
    
    if (prompt.includes('Design a database schema')) {
      return {
        response: {
          text: () => JSON.stringify({
            tables: [
              {
                name: "users",
                columns: [
                  { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
                  { name: "email", type: "VARCHAR(255)", constraints: ["UNIQUE", "NOT NULL"] },
                  { name: "password_hash", type: "VARCHAR(255)", constraints: ["NOT NULL"] },
                  { name: "first_name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
                  { name: "last_name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
                  { name: "phone", type: "VARCHAR(20)", constraints: [] },
                  { name: "created_at", type: "TIMESTAMP", constraints: ["DEFAULT CURRENT_TIMESTAMP"] },
                  { name: "updated_at", type: "TIMESTAMP", constraints: ["DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"] }
                ],
                primaryKey: "id",
                indexes: ["CREATE INDEX idx_users_email ON users(email)", "CREATE INDEX idx_users_created_at ON users(created_at)"]
              },
              {
                name: "categories",
                columns: [
                  { name: "id", type: "INT", constraints: ["PRIMARY KEY", "AUTO_INCREMENT"] },
                  { name: "name", type: "VARCHAR(100)", constraints: ["NOT NULL"] },
                  { name: "description", type: "TEXT", constraints: [] },
                  { name: "parent_id", type: "INT", constraints: ["NULL"] },
                  { name: "created_at", type: "TIMESTAMP", constraints: ["DEFAULT CURRENT_TIMESTAMP"] }
                ],
                primaryKey: "id",
                indexes: ["CREATE INDEX idx_categories_parent_id ON categories(parent_id)"]
              }
            ],
            relationships: [
              { from: "categories", to: "categories", type: "self-referencing", explanation: "Categories can have subcategories" },
              { from: "products", to: "categories", type: "many-to-one", explanation: "Each product belongs to one category" }
            ],
            createStatements: [
              `CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);`,
              `CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id)
);`
            ],
            designRationale: "This design follows 3NF normalization principles, ensures data integrity through foreign keys, and includes proper indexing for common query patterns.",
            normalizationLevel: "3NF",
            scalabilityConsiderations: [
              "Consider partitioning large tables by date",
              "Implement read replicas for heavy read workloads",
              "Use appropriate data types to minimize storage",
              "Plan for horizontal scaling with proper sharding keys"
            ]
          })
        }
      };
    }
    
    // Default response
    return {
      response: {
        text: () => JSON.stringify({
          message: "I'm ready to help with SQL analysis, optimization, and learning!"
        })
      }
    };
  }
};

const SQLMaster = () => {
  const [activeMode, setActiveMode] = useState("query-lab");
  const [userQuery, setUserQuery] = useState("");
  const [queryResult, setQueryResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sparkleAnimation, setSparkleAnimation] = useState(false);
  const [queryHistory, setQueryHistory] = useState([]);
  const [customTables, setCustomTables] = useState({});
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [aiInterview, setAiInterview] = useState([]);
  const [interviewActive, setInterviewActive] = useState(false);
  const [currentScenario, setCurrentScenario] = useState("");
  const [realWorldProblems, setRealWorldProblems] = useState([]);
  const [performanceAnalysis, setPerformanceAnalysis] = useState(null);
  const [schemaBuilder, setSchemaBuilder] = useState({ tables: [], relationships: [] });
  const [queryOptimizer, setQueryOptimizer] = useState(null);
  const [currentAnswer, setCurrentAnswer] = useState("");
  
  const recognitionRef = useRef();

  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      setSparkleAnimation(true);
      setTimeout(() => setSparkleAnimation(false), 1000);
    }, 4000);

    // Initialize Speech Recognition
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        setSpeechSupported(true);
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              finalTranscript += transcript + ' ';
            }
          }
          if (finalTranscript) {
            setUserQuery(prev => prev + finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }

    return () => clearInterval(sparkleInterval);
  }, []);

  const startListening = () => {
    if (recognitionRef.current && speechSupported) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  // Safe JSON parsing function
  const safeJsonParse = (text, fallback = {}) => {
    try {
      // Clean the text by removing code blocks and extra whitespace
      const cleanText = text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      
      return JSON.parse(cleanText);
    } catch (error) {
      console.error("JSON Parse Error:", error);
      console.log("Raw text:", text);
      return fallback;
    }
  };

  // Advanced SQL Query Analyzer
  const analyzeQuery = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);

    try {
      const prompt = `
        Analyze this SQL query comprehensively:
        
        Query: ${userQuery}
        
        Provide analysis in valid JSON format only (no extra text):
        {
          "syntax": {"valid": true, "errors": [], "suggestions": ["suggestion1", "suggestion2"]},
          "performance": {"score": 8, "bottlenecks": ["issue1"], "optimizations": ["opt1"]},
          "structure": {"complexity": "medium", "readability": 8, "bestPractices": ["practice1"]},
          "explanation": "What this query does in plain English",
          "alternativeQueries": ["alternative1", "alternative2"],
          "interviewFeedback": "How an interviewer would evaluate this",
          "executionPlan": "Predicted execution steps",
          "indexSuggestions": ["index1", "index2"],
          "securityIssues": []
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      
      const analysis = safeJsonParse(responseText, {
        syntax: { valid: false, errors: ["Analysis failed"], suggestions: [] },
        explanation: "Unable to analyze query - please try again"
      });
      
      setQueryResult(analysis);

      // Add to history
      setQueryHistory(prev => [...prev, {
        query: userQuery,
        analysis: analysis,
        timestamp: new Date().toLocaleTimeString()
      }]);

    } catch (error) {
      console.error("Query analysis error:", error);
      setQueryResult({
        syntax: { valid: false, errors: ["Analysis failed - please try again"], suggestions: [] },
        explanation: "Unable to analyze query due to an error"
      });
    }

    setLoading(false);
  };

  // AI Interview Simulator
  const startAIInterview = async () => {
    setInterviewActive(true);
    setAiInterview([]);
    setLoading(true);

    try {
      const prompt = `
        Start a technical SQL interview. Ask the first challenging question that tests real SQL knowledge.
        Be a tough but fair interviewer. Focus on practical scenarios.
        
        Respond with valid JSON only:
        {
          "question": "Your first SQL interview question",
          "context": "Background context for the question",
          "expectedTopics": ["topic1", "topic2"]
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const firstQuestion = safeJsonParse(responseText, {
        question: "Let's start with a basic question: Explain the difference between INNER JOIN and LEFT JOIN.",
        context: "This tests fundamental SQL knowledge",
        expectedTopics: ["JOINs", "SQL basics"]
      });

      setAiInterview([{
        type: 'interviewer',
        content: firstQuestion.question,
        context: firstQuestion.context,
        timestamp: new Date().toLocaleTimeString()
      }]);

    } catch (error) {
      console.error("Interview start error:", error);
      setAiInterview([{
        type: 'interviewer',
        content: "Let's start with a basic question: Write a query to find the second highest salary from an employees table.",
        context: "This tests your knowledge of subqueries and ranking",
        timestamp: new Date().toLocaleTimeString()
      }]);
    }

    setLoading(false);
  };

  const respondToInterview = async (answer) => {
    if (!answer.trim()) return;

    setLoading(true);

    // Add user response
    const newInterview = [...aiInterview, {
      type: 'candidate',
      content: answer,
      timestamp: new Date().toLocaleTimeString()
    }];
    setAiInterview(newInterview);

    try {
      const conversationHistory = newInterview.map(msg => 
        `${msg.type}: ${msg.content}`
      ).join('\n');

      const prompt = `
        You are conducting a SQL interview. Here's the conversation so far:
        ${conversationHistory}
        
        Latest candidate answer: ${answer}
        
        Evaluate the answer and ask the next question. Respond with valid JSON only:
        {
          "evaluation": "Quick feedback on their answer",
          "score": 7,
          "nextQuestion": "Your next interview question or INTERVIEW_COMPLETE",
          "difficulty": "intermediate",
          "followUp": "Any follow-up comments"
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const interviewerResponse = safeJsonParse(responseText, {
        evaluation: "Good attempt!",
        score: 7,
        nextQuestion: "INTERVIEW_COMPLETE",
        difficulty: "intermediate",
        followUp: "Keep practicing!"
      });
      
      setAiInterview(prev => [...prev, {
        type: 'interviewer',
        content: interviewerResponse.nextQuestion === 'INTERVIEW_COMPLETE' 
          ? `Great job! Interview complete. ${interviewerResponse.evaluation}` 
          : interviewerResponse.nextQuestion,
        evaluation: interviewerResponse.evaluation,
        score: interviewerResponse.score,
        timestamp: new Date().toLocaleTimeString()
      }]);

      if (interviewerResponse.nextQuestion === 'INTERVIEW_COMPLETE') {
        setInterviewActive(false);
      }

    } catch (error) {
      console.error("Interview response error:", error);
      setAiInterview(prev => [...prev, {
        type: 'interviewer',
        content: "Thank you for your answer! Let's move to the next question: How would you optimize a slow query?",
        evaluation: "Good effort!",
        score: 7,
        timestamp: new Date().toLocaleTimeString()
      }]);
    }

    setLoading(false);
    setCurrentAnswer("");
  };

  // Real-World Problem Generator
  const generateRealWorldProblem = async () => {
    setLoading(true);

    try {
      const scenarios = [
        "e-commerce platform database",
        "social media analytics",
        "financial transaction system",
        "healthcare management system",
        "logistics and shipping",
        "HR management platform",
        "inventory management",
        "subscription-based service"
      ];

      const randomScenario = scenarios[Math.floor(Math.random() * scenarios.length)];
      setCurrentScenario(randomScenario);

      const prompt = `
        Generate a real-world SQL problem for a ${randomScenario}.
        
        Provide a valid JSON response only:
        {
          "scenario": "Detailed business scenario description",
          "problem": "Specific problem to solve with SQL",
          "requirements": ["req1", "req2", "req3"],
          "sampleSchema": "CREATE TABLE statements for the database schema",
          "expectedApproach": "What approach should be used",
          "complexity": "intermediate",
          "businessImpact": "Why this query matters in real business"
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const problem = safeJsonParse(responseText, {
        scenario: "E-commerce analytics scenario",
        problem: "Analyze customer purchase patterns",
        requirements: ["Calculate monthly revenue", "Identify top customers", "Find trending products"],
        sampleSchema: "CREATE TABLE customers (id INT, name VARCHAR(100)); CREATE TABLE orders (id INT, customer_id INT, total DECIMAL(10,2));",
        expectedApproach: "Use JOINs and aggregation functions",
        complexity: "intermediate",
        businessImpact: "Improves business decision making"
      });
      
      setRealWorldProblems(prev => [problem, ...prev.slice(0, 4)]); // Keep last 5

    } catch (error) {
      console.error("Problem generation error:", error);
    }

    setLoading(false);
  };

  // Validate Solution Function
  const validateSolution = async (problemIndex, solution) => {
    if (!solution.trim()) {
      alert("Please write a solution first!");
      return;
    }

    setLoading(true);
    
    try {
      const problem = realWorldProblems[problemIndex];
      
      // Mock validation - in real app, this would analyze the SQL
      const isValid = solution.toUpperCase().includes('SELECT') && solution.length > 20;
      const feedback = isValid 
        ? "✅ Good solution! Your query addresses the main requirements." 
        : "❌ Solution needs improvement. Make sure to include proper SELECT statements.";
      
      alert(feedback);
      
    } catch (error) {
      console.error("Validation error:", error);
      alert("Validation failed. Please try again.");
    }
    
    setLoading(false);
  };

  // Get Hint Function
  const getHint = async (problemIndex) => {
    setLoading(true);
    
    try {
      const problem = realWorldProblems[problemIndex];
      const hints = [
        "💡 Start with a basic SELECT statement",
        "💡 Consider using JOINs to connect related tables",
        "💡 Use GROUP BY for aggregations",
        "💡 Don't forget WHERE clauses for filtering",
        "💡 Use ORDER BY for sorting results"
      ];
      
      const randomHint = hints[Math.floor(Math.random() * hints.length)];
      alert(randomHint);
      
    } catch (error) {
      console.error("Hint error:", error);
      alert("💡 Try breaking down the problem into smaller parts!");
    }
    
    setLoading(false);
  };

  // Query Optimizer
  const optimizeQuery = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);

    try {
      const prompt = `
        Act as a senior database engineer. Optimize this SQL query:
        
        Query: ${userQuery}
        
        Provide optimization analysis in valid JSON only:
        {
          "originalQuery": "${userQuery}",
          "optimizedQuery": "Your optimized version",
          "improvements": ["improvement1", "improvement2"],
          "performanceGains": "Expected performance improvement",
          "indexRecommendations": ["index1", "index2"],
          "explanation": "Why these optimizations work",
          "beforeAfterComparison": "Performance comparison",
          "additionalTips": ["tip1", "tip2"]
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const optimization = safeJsonParse(responseText, {
        originalQuery: userQuery,
        optimizedQuery: "Optimization failed - please try again",
        improvements: [],
        performanceGains: "Unable to analyze",
        indexRecommendations: [],
        explanation: "Optimization analysis failed",
        beforeAfterComparison: "Unable to compare",
        additionalTips: []
      });
      
      setQueryOptimizer(optimization);

    } catch (error) {
      console.error("Optimization error:", error);
      setQueryOptimizer({
        originalQuery: userQuery,
        optimizedQuery: "Optimization failed - please try again",
        improvements: ["Please check your query syntax"],
        performanceGains: "Unable to analyze",
        indexRecommendations: [],
        explanation: "There was an error optimizing your query",
        beforeAfterComparison: "Unable to compare",
        additionalTips: ["Try simplifying your query first"]
      });
    }

    setLoading(false);
  };

  // Performance Analyzer
  const analyzePerformance = async () => {
    if (!userQuery.trim()) return;

    setLoading(true);

    try {
      const prompt = `
        Analyze the performance characteristics of this SQL query:
        
        Query: ${userQuery}
        
        Provide detailed performance analysis in valid JSON only:
        {
          "complexity": "O(n) notation and explanation",
          "executionSteps": ["step1", "step2", "step3"],
          "resourceUsage": {"cpu": "medium", "memory": "high", "disk": "low"},
          "scalabilityIssues": ["issue1", "issue2"],
          "optimizationPriority": ["priority1", "priority2"],
          "performanceScore": 75,
          "bottlenecks": ["bottleneck1", "bottleneck2"],
          "recommendations": ["rec1", "rec2"]
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const analysis = safeJsonParse(responseText, {
        complexity: "Unable to analyze complexity",
        executionSteps: ["Analysis failed"],
        resourceUsage: { cpu: "unknown", memory: "unknown", disk: "unknown" },
        scalabilityIssues: [],
        optimizationPriority: [],
        performanceScore: 0,
        bottlenecks: ["Analysis failed"],
        recommendations: ["Please try again"]
      });
      
      setPerformanceAnalysis(analysis);

    } catch (error) {
      console.error("Performance analysis error:", error);
      setPerformanceAnalysis({
        complexity: "Analysis failed",
        executionSteps: ["Error occurred during analysis"],
        resourceUsage: { cpu: "unknown", memory: "unknown", disk: "unknown" },
        scalabilityIssues: ["Unable to analyze"],
        optimizationPriority: ["Try again"],
        performanceScore: 0,
        bottlenecks: ["Analysis error"],
        recommendations: ["Please check your query and try again"]
      });
    }

    setLoading(false);
  };

  // Schema Design Assistant
  const designSchema = async (requirements) => {
    setLoading(true);

    try {
      const prompt = `
        Design a database schema based on these requirements:
        ${requirements}
        
        Provide schema design in valid JSON only:
        {
          "tables": [
            {
              "name": "table_name",
              "columns": [{"name": "column_name", "type": "data_type", "constraints": ["constraint1"]}],
              "primaryKey": "column_name",
              "indexes": ["index1", "index2"]
            }
          ],
          "relationships": [
            {"from": "table1", "to": "table2", "type": "one-to-many", "explanation": "explanation"}
          ],
          "createStatements": ["CREATE TABLE statement1", "CREATE TABLE statement2"],
          "designRationale": "Why this design",
          "normalizationLevel": "3NF",
          "scalabilityConsiderations": ["consideration1", "consideration2"]
        }
      `;

      const result = await mockChatSession.sendMessage(prompt);
      const responseText = result.response.text();
      const design = safeJsonParse(responseText, {
        tables: [],
        relationships: [],
        createStatements: ["Schema design failed"],
        designRationale: "Unable to design schema",
        normalizationLevel: "Unknown",
        scalabilityConsiderations: []
      });
      
      setSchemaBuilder(design);

    } catch (error) {
      console.error("Schema design error:", error);
      setSchemaBuilder({
        tables: [],
        relationships: [],
        createStatements: ["Schema design failed - please try again"],
        designRationale: "There was an error designing the schema",
        normalizationLevel: "Unknown",
        scalabilityConsiderations: ["Please try again with clearer requirements"]
      });
    }

    setLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    }).catch(() => {
      alert("Failed to copy to clipboard");
    });
  };

  const downloadQuery = (query, filename) => {
    const element = document.createElement("a");
    const file = new Blob([query], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Tab content render function
  const renderTabContent = () => {
    switch (activeMode) {
      case "query-lab":
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* SQL Editor */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl shadow-lg">
                        <Code className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Advanced SQL Editor 💻
                      </h3>
                    </div>
                    {speechSupported && (
                      <Button
                        onClick={isListening ? stopListening : startListening}
                        className={`rounded-xl ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white border-0`}
                      >
                        <div className="flex items-center gap-2">
                          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                          <span>{isListening ? "Stop" : "Voice"}</span>
                        </div>
                      </Button>
                    )}
                  </div>

                  {isListening && (
                    <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                        <span className="text-sm text-red-700 font-bold">Listening... Speak your SQL! 🎤</span>
                      </div>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-gray-900 to-purple-900 rounded-2xl p-6 mb-4">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <div className="flex-1 bg-gray-700 rounded px-3 py-1 text-xs text-gray-300 text-center">
                        SQL Query Analyzer
                      </div>
                    </div>
                    
                    <Textarea
                      placeholder="-- Write any SQL query for comprehensive analysis
-- Examples:
-- SELECT users.name, COUNT(orders.id) FROM users LEFT JOIN orders ON users.id = orders.user_id GROUP BY users.id;
-- 
-- CREATE INDEX idx_user_email ON users(email);
--
-- EXPLAIN SELECT * FROM products WHERE price > 100;"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      className="min-h-40 bg-gray-800 border-gray-600 text-green-400 font-mono placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={analyzeQuery}
                      disabled={!userQuery.trim() || loading}
                      className="h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <LoaderCircle className="animate-spin w-5 h-5" />
                          <span>Analyzing...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <Brain className="w-5 h-5" />
                          <span>Analyze</span>
                        </div>
                      )}
                    </Button>

                    <Button
                      onClick={analyzePerformance}
                      disabled={!userQuery.trim() || loading}
                      className="h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                    >
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5" />
                        <span>Performance</span>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Results */}
            <div className="space-y-6">
              {queryResult && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl shadow-lg">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                          Query Analysis 📊
                        </h3>
                      </div>

                      <div className="space-y-4">
                        {queryResult.syntax && (
                          <div className={`p-4 rounded-xl border-2 ${queryResult.syntax.valid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                            <h4 className={`font-black mb-2 ${queryResult.syntax.valid ? 'text-green-800' : 'text-red-800'}`}>
                              Syntax: {queryResult.syntax.valid ? '✅ Valid' : '❌ Invalid'}
                            </h4>
                            {!queryResult.syntax.valid && queryResult.syntax.errors && queryResult.syntax.errors.length > 0 && (
                              <ul className="text-sm text-red-700 space-y-1">
                                {queryResult.syntax.errors.map((error, index) => (
                                  <li key={index}>• {String(error)}</li>
                                ))}
                              </ul>
                            )}
                            {queryResult.syntax.suggestions && queryResult.syntax.suggestions.length > 0 && (
                              <div className="mt-2">
                                <p className="font-bold text-sm">Suggestions:</p>
                                <ul className="text-sm space-y-1">
                                  {queryResult.syntax.suggestions.map((suggestion, index) => (
                                    <li key={index}>💡 {String(suggestion)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {queryResult.performance && (
                          <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                            <h4 className="font-black text-blue-800 mb-2">Performance Score: {queryResult.performance.score}/10 ⚡</h4>
                            {queryResult.performance.bottlenecks && queryResult.performance.bottlenecks.length > 0 && (
                              <div className="mb-2">
                                <p className="font-bold text-sm text-blue-800">Bottlenecks:</p>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {queryResult.performance.bottlenecks.map((bottleneck, index) => (
                                    <li key={index}>⚠️ {String(bottleneck)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {queryResult.performance.optimizations && queryResult.performance.optimizations.length > 0 && (
                              <div>
                                <p className="font-bold text-sm text-blue-800">Optimizations:</p>
                                <ul className="text-sm text-blue-700 space-y-1">
                                  {queryResult.performance.optimizations.map((opt, index) => (
                                    <li key={index}>🚀 {String(opt)}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        )}

                        {queryResult.explanation && (
                          <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                            <h4 className="font-black text-purple-800 mb-2">Query Explanation 📝</h4>
                            <p className="text-sm text-purple-700 leading-relaxed">{String(queryResult.explanation)}</p>
                          </div>
                        )}

                        {queryResult.alternativeQueries && queryResult.alternativeQueries.length > 0 && (
                          <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                            <h4 className="font-black text-yellow-800 mb-2">Alternative Approaches 🔄</h4>
                            <div className="space-y-2">
                              {queryResult.alternativeQueries.map((alt, index) => (
                                <div key={index} className="bg-white p-3 rounded-lg border border-yellow-200">
                                  <code className="text-sm text-gray-800 font-mono">{String(alt)}</code>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {queryResult.interviewFeedback && (
                          <div className="p-4 bg-pink-50 rounded-xl border-2 border-pink-200">
                            <h4 className="font-black text-pink-800 mb-2">Interview Perspective 🎯</h4>
                            <p className="text-sm text-pink-700 leading-relaxed">{String(queryResult.interviewFeedback)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {performanceAnalysis && (
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl opacity-20 blur-lg"></div>
                  <div className="relative bg-gradient-to-br from-white via-orange-50/30 to-red-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl shadow-lg">
                          <Cpu className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                          Performance Analysis 🔥
                        </h3>
                        <Badge variant="outline" className="ml-auto">
                          Score: {performanceAnalysis.performanceScore}/100
                        </Badge>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                          <p className="text-sm font-bold text-blue-800">CPU Usage</p>
                          <p className={`text-lg font-black ${
                            performanceAnalysis.resourceUsage?.cpu === 'low' ? 'text-green-600' :
                            performanceAnalysis.resourceUsage?.cpu === 'medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{String(performanceAnalysis.resourceUsage?.cpu || 'unknown').toUpperCase()}</p>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200 text-center">
                          <p className="text-sm font-bold text-green-800">Memory</p>
                          <p className={`text-lg font-black ${
                            performanceAnalysis.resourceUsage?.memory === 'low' ? 'text-green-600' :
                            performanceAnalysis.resourceUsage?.memory === 'medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{String(performanceAnalysis.resourceUsage?.memory || 'unknown').toUpperCase()}</p>
                        </div>
                        <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 text-center">
                          <p className="text-sm font-bold text-purple-800">Disk I/O</p>
                          <p className={`text-lg font-black ${
                            performanceAnalysis.resourceUsage?.disk === 'low' ? 'text-green-600' :
                            performanceAnalysis.resourceUsage?.disk === 'medium' ? 'text-yellow-600' : 'text-red-600'
                          }`}>{String(performanceAnalysis.resourceUsage?.disk || 'unknown').toUpperCase()}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                          <h4 className="font-black text-blue-800 mb-2">Complexity Analysis 📊</h4>
                          <p className="text-sm text-blue-700">{String(performanceAnalysis.complexity)}</p>
                        </div>

                        {performanceAnalysis.bottlenecks && performanceAnalysis.bottlenecks.length > 0 && (
                          <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                            <h4 className="font-black text-red-800 mb-2">Performance Bottlenecks ⚠️</h4>
                            <ul className="text-sm text-red-700 space-y-1">
                              {performanceAnalysis.bottlenecks.map((bottleneck, index) => (
                                <li key={index}>🔴 {String(bottleneck)}</li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {performanceAnalysis.recommendations && performanceAnalysis.recommendations.length > 0 && (
                          <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                            <h4 className="font-black text-green-800 mb-2">Optimization Recommendations 🚀</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {performanceAnalysis.recommendations.map((rec, index) => (
                                <li key={index}>✅ {String(rec)}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "ai-interview":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-xl">
                      <Brain className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    AI SQL Interview Simulator 🧠
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    Practice with an AI interviewer that asks real SQL interview questions!
                  </p>
                </div>

                {!interviewActive && aiInterview.length === 0 ? (
                  <div className="text-center">
                    <Button 
                      onClick={startAIInterview}
                      disabled={loading}
                      className="px-12 py-6 text-xl font-black rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 hover:from-purple-600 hover:via-pink-600 hover:to-red-600 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
                    >
                      {loading ? (
                        <div className="flex items-center gap-3">
                          <LoaderCircle className="animate-spin w-6 h-6" />
                          <span>Starting Interview...</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3">
                          <Rocket className="w-6 h-6" />
                          <span>Start AI Interview</span>
                          <Sparkles className="w-6 h-6 animate-pulse" />
                        </div>
                      )}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Interview Conversation */}
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {aiInterview.map((message, index) => (
                        <div key={index} className={`flex ${message.type === 'candidate' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-md px-6 py-4 rounded-2xl shadow-lg ${
                            message.type === 'candidate' 
                              ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' 
                              : 'bg-gradient-to-r from-gray-100 to-purple-100 text-gray-800 border-2 border-purple-200'
                          }`}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                                <span className="text-xs">{message.type === 'candidate' ? '👤' : '🤖'}</span>
                              </div>
                              <span className="text-xs opacity-70">{message.timestamp}</span>
                              {message.score && (
                                <Badge variant="secondary" className="ml-auto text-xs">
                                  {message.score}/10
                                </Badge>
                              )}
                            </div>
                            <p className="font-medium leading-relaxed">{String(message.content)}</p>
                            {message.evaluation && (
                              <div className="mt-2 p-2 bg-white/20 rounded-lg">
                                <p className="text-xs opacity-80">💭 {String(message.evaluation)}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Response Input */}
                    {interviewActive && (
                      <div className="space-y-4">
                        <Textarea
                          placeholder="Type your answer here... Be specific and explain your reasoning!"
                          value={currentAnswer}
                          onChange={(e) => setCurrentAnswer(e.target.value)}
                          className="min-h-24 rounded-2xl border-2 border-purple-200 focus:border-purple-400 bg-gradient-to-br from-white to-purple-50 shadow-lg font-medium"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.ctrlKey && currentAnswer.trim()) {
                              respondToInterview(currentAnswer);
                            }
                          }}
                        />
                        <div className="flex gap-3">
                          <Button
                            onClick={() => respondToInterview(currentAnswer)}
                            disabled={loading || !currentAnswer.trim()}
                            className="flex-1 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg border-0"
                          >
                            {loading ? (
                              <div className="flex items-center gap-2">
                                <LoaderCircle className="animate-spin w-5 h-5" />
                                <span>Evaluating...</span>
                              </div>
                            ) : (
                              <div className="flex items-center gap-2">
                                <Send className="w-5 h-5" />
                                <span>Submit Answer</span>
                              </div>
                            )}
                          </Button>
                          <Button 
                            onClick={() => {
                              setInterviewActive(false);
                              setAiInterview([]);
                              setCurrentAnswer("");
                            }}
                            className="rounded-xl border-2 border-red-200 hover:border-red-400 text-red-700 bg-white hover:bg-red-50"
                          >
                            End Interview
                          </Button>
                        </div>
                        <p className="text-xs text-gray-500 text-center">
                          Tip: Press Ctrl+Enter to submit quickly
                        </p>
                      </div>
                    )}

                    {!interviewActive && aiInterview.length > 0 && (
                      <div className="text-center">
                        <Button 
                          onClick={startAIInterview}
                          className="px-8 py-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-bold shadow-lg border-0"
                        >
                          <div className="flex items-center gap-2">
                            <RotateCcw className="w-5 h-5" />
                            <span>Start New Interview</span>
                          </div>
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "real-world":
        return (
          <div className="space-y-8">
            <div className="text-center">
              <Button 
                onClick={generateRealWorldProblem}
                disabled={loading}
                className="px-8 py-4 text-lg font-black rounded-2xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white shadow-2xl transform hover:scale-110 transition-all duration-300 border-0"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <LoaderCircle className="animate-spin w-6 h-6" />
                    <span>Generating Problem...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Shuffle className="w-6 h-6" />
                    <span>Generate Real-World Problem</span>
                    <Rocket className="w-6 h-6 animate-pulse" />
                  </div>
                )}
              </Button>
            </div>

            <div className="grid gap-8">
              {realWorldProblems.map((problem, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -inset-2 bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 rounded-3xl opacity-20 blur-xl"></div>
                  <div className="relative bg-gradient-to-br from-white via-green-50/30 to-blue-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="p-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl shadow-lg">
                          <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Real-World Challenge 🌍
                          </h3>
                          <Badge variant={problem.complexity === 'beginner' ? 'secondary' : problem.complexity === 'intermediate' ? 'default' : 'destructive'}>
                            {problem.complexity}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-6">
                        <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                          <h4 className="font-black text-blue-800 mb-2">Business Scenario 📊</h4>
                          <p className="text-sm text-blue-700 leading-relaxed">{String(problem.scenario)}</p>
                        </div>

                        <div className="p-4 bg-red-50 rounded-xl border-2 border-red-200">
                          <h4 className="font-black text-red-800 mb-2">Problem Statement 🎯</h4>
                          <p className="text-sm text-red-700 leading-relaxed">{String(problem.problem)}</p>
                        </div>

                        <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                          <h4 className="font-black text-green-800 mb-2">Requirements ✅</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            {(problem.requirements || []).map((req, reqIndex) => (
                              <li key={reqIndex}>• {String(req)}</li>
                            ))}
                          </ul>
                        </div>

                        <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                          <h4 className="font-black text-purple-800 mb-2">Business Impact 💼</h4>
                          <p className="text-sm text-purple-700 leading-relaxed">{String(problem.businessImpact)}</p>
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                          <h4 className="font-black text-gray-800 mb-2">Database Schema 🗄️</h4>
                          <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto font-mono">
                            {String(problem.sampleSchema)}
                          </pre>
                        </div>

                        <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                          <h4 className="font-black text-yellow-800 mb-2">Suggested Approach 💡</h4>
                          <p className="text-sm text-yellow-700 leading-relaxed">{String(problem.expectedApproach)}</p>
                        </div>

                        <div className="p-4 bg-white rounded-xl border-2 border-purple-200 shadow-inner">
                          <h4 className="font-black text-purple-800 mb-3">Your Solution 💻</h4>
                          <Textarea
                            placeholder="Write your SQL solution here..."
                            className="min-h-32 bg-gray-800 text-green-400 font-mono border-gray-600 placeholder:text-gray-500"
                            id={`solution-${index}`}
                          />
                          <div className="flex gap-2 mt-3">
                            <Button 
                              onClick={() => {
                                const solution = document.getElementById(`solution-${index}`)?.value || "";
                                validateSolution(index, solution);
                              }}
                              disabled={loading}
                              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white rounded-xl border-0"
                            >
                              {loading ? <LoaderCircle className="animate-spin w-4 h-4 mr-1" /> : null}
                              Validate Solution
                            </Button>
                            <Button 
                              onClick={() => getHint(index)}
                              disabled={loading}
                              className="rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white border-0"
                            >
                              Get Hint
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "optimizer":
        return (
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl opacity-20 blur-lg"></div>
              <div className="relative bg-gradient-to-br from-white via-yellow-50/30 to-orange-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl shadow-lg">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                      Query Optimizer 🚀
                    </h3>
                  </div>

                  <div className="bg-gradient-to-br from-gray-900 to-orange-900 rounded-2xl p-6 mb-4">
                    <Textarea
                      placeholder="-- Paste your slow query here for optimization
-- Example:
-- SELECT * FROM users u, orders o, products p 
-- WHERE u.id = o.user_id AND o.product_id = p.id 
-- AND p.price > 100;"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      className="min-h-32 bg-gray-800 border-gray-600 text-orange-400 font-mono placeholder:text-gray-500 resize-none"
                    />
                  </div>

                  <Button
                    onClick={optimizeQuery}
                    disabled={!userQuery.trim() || loading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        <span>Optimizing...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        <span>Optimize Query</span>
                        <TrendingUp className="w-5 h-5" />
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {queryOptimizer && (
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl opacity-20 blur-lg"></div>
                <div className="relative bg-gradient-to-br from-white via-green-50/30 to-emerald-50/30 rounded-2xl shadow-xl border-2 border-white/50 backdrop-blur-sm">
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl shadow-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-xl font-black bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        Optimization Results ⚡
                      </h3>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-xl border-2 border-green-200">
                        <h4 className="font-black text-green-800 mb-2">Optimized Query 🚀</h4>
                        <div className="bg-gray-800 rounded-lg p-4">
                          <code className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                            {String(queryOptimizer.optimizedQuery)}
                          </code>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Button 
                            onClick={() => copyToClipboard(String(queryOptimizer.optimizedQuery))}
                            className="bg-green-500 hover:bg-green-600 text-white rounded-lg border-0"
                          >
                            <Copy className="w-4 h-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 bg-blue-50 rounded-xl border-2 border-blue-200">
                        <h4 className="font-black text-blue-800 mb-2">Performance Gains 📈</h4>
                        <p className="text-sm text-blue-700">{String(queryOptimizer.performanceGains)}</p>
                      </div>

                      <div className="p-4 bg-purple-50 rounded-xl border-2 border-purple-200">
                        <h4 className="font-black text-purple-800 mb-2">Improvements Made 🔧</h4>
                        <ul className="text-sm text-purple-700 space-y-1">
                          {(queryOptimizer.improvements || []).map((improvement, index) => (
                            <li key={index}>✅ {String(improvement)}</li>
                          ))}
                        </ul>
                      </div>

                      {queryOptimizer.indexRecommendations && queryOptimizer.indexRecommendations.length > 0 && (
                        <div className="p-4 bg-yellow-50 rounded-xl border-2 border-yellow-200">
                          <h4 className="font-black text-yellow-800 mb-2">Index Recommendations 📇</h4>
                          <ul className="text-sm text-yellow-700 space-y-1">
                            {queryOptimizer.indexRecommendations.map((indexRec, indexNumber) => (
                              <li key={indexNumber} className="font-mono bg-white p-2 rounded border">
                                {String(indexRec)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="p-4 bg-orange-50 rounded-xl border-2 border-orange-200">
                        <h4 className="font-black text-orange-800 mb-2">Explanation 💡</h4>
                        <p className="text-sm text-orange-700 leading-relaxed">{String(queryOptimizer.explanation)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case "schema-designer":
        return (
          <div className="max-w-4xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 rounded-3xl opacity-20 blur-xl"></div>
              <div className="relative bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
                
                <div className="text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-xl">
                      <Layers className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h2 className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                    AI Schema Designer 🏗️
                  </h2>
                  <p className="text-lg text-gray-700 font-medium">
                    Describe your requirements and get a complete database schema design!
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-lg font-black text-gray-800 mb-3">
                      Describe Your Application Requirements:
                    </label>
                    <Textarea
                      placeholder="Example: I'm building an e-commerce platform that needs to handle users, products, orders, shopping carts, payments, reviews, and inventory management. Users can have multiple addresses, products belong to categories, and orders can contain multiple items..."
                      className="min-h-32 rounded-2xl border-2 border-indigo-200 focus:border-indigo-400 bg-gradient-to-br from-white to-indigo-50 shadow-lg font-medium"
                      id="schema-requirements"
                    />
                  </div>

                  <Button
                    onClick={() => {
                      const requirements = document.getElementById('schema-requirements')?.value;
                      if (requirements?.trim()) {
                        designSchema(requirements);
                      } else {
                        alert("Please enter your requirements first!");
                      }
                    }}
                    disabled={loading}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold shadow-lg transform hover:scale-105 transition-all duration-300 border-0"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <LoaderCircle className="animate-spin w-5 h-5" />
                        <span>Designing Schema...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        <span>Design Database Schema</span>
                        <Sparkles className="w-5 h-5 animate-pulse" />
                      </div>
                    )}
                  </Button>
                </div>

                {schemaBuilder.tables && schemaBuilder.tables.length > 0 && (
                  <div className="mt-8 space-y-6">
                    <div className="p-4 bg-indigo-50 rounded-xl border-2 border-indigo-200">
                      <h4 className="font-black text-indigo-800 mb-2">Schema Overview 📊</h4>
                      <p className="text-sm text-indigo-700">{String(schemaBuilder.designRationale)}</p>
                      <div className="mt-2 flex gap-2">
                        <Badge variant="outline">Normalization: {String(schemaBuilder.normalizationLevel)}</Badge>
                        <Badge variant="outline">{schemaBuilder.tables.length} Tables</Badge>
                      </div>
                    </div>

                    <div className="grid gap-4">
                      {schemaBuilder.tables.map((table, index) => (
                        <div key={index} className="p-4 bg-white rounded-xl border-2 border-purple-200 shadow-lg">
                          <h5 className="font-black text-purple-800 mb-3 flex items-center gap-2">
                            <Table className="w-4 h-4" />
                            {String(table.name)}
                          </h5>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <p className="font-bold text-sm text-gray-700 mb-2">Columns:</p>
                              <div className="space-y-1">
                                {(table.columns || []).map((column, colIndex) => (
                                  <div key={colIndex} className="text-xs font-mono bg-gray-100 p-2 rounded border">
                                    <span className="font-bold">{String(column.name)}</span> 
                                    <span className="text-blue-600"> {String(column.type)}</span>
                                    {column.constraints && column.constraints.length > 0 && (
                                      <span className="text-green-600"> {column.constraints.map(String).join(', ')}</span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-700 mb-2">Details:</p>
                              <p className="text-xs text-gray-600 mb-1">Primary Key: {String(table.primaryKey)}</p>
                              {table.indexes && table.indexes.length > 0 && (
                                <div>
                                  <p className="text-xs font-bold text-gray-600">Suggested Indexes:</p>
                                  <ul className="text-xs text-gray-600">
                                    {table.indexes.map((idx, idxIndex) => (
                                      <li key={idxIndex}>• {String(idx)}</li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {schemaBuilder.createStatements && (
                      <div className="p-4 bg-gray-50 rounded-xl border-2 border-gray-200">
                        <h4 className="font-black text-gray-800 mb-2">SQL Create Statements 💻</h4>
                        <pre className="text-xs bg-gray-800 text-green-400 p-4 rounded-lg overflow-x-auto font-mono max-h-96">
                          {(schemaBuilder.createStatements || []).map(String).join('\n\n')}
                        </pre>
                        <Button 
                          onClick={() => copyToClipboard((schemaBuilder.createStatements || []).map(String).join('\n\n'))}
                          className="mt-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg border-0"
                        >
                          <Copy className="w-4 h-4 mr-1" />
                          Copy SQL
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-cyan-50 p-6">
      {/* Floating decorative elements */}
      <div className="fixed top-10 left-10 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
      <div className="fixed top-20 right-20 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
      <div className="fixed bottom-20 right-40 w-3 h-3 bg-cyan-300 rounded-full animate-ping opacity-60"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="relative group mb-12">
          <div className="absolute -inset-2 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-3xl opacity-20 blur-xl"></div>
          <div className="relative bg-gradient-to-br from-white via-pink-50/30 to-purple-50/30 rounded-3xl shadow-2xl p-8 border-2 border-white/50 backdrop-blur-sm">
            
            {/* Decorations */}
            <div className="absolute top-4 right-4 w-4 h-4 bg-pink-300 rounded-full animate-bounce opacity-60"></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 bg-purple-300 rounded-full animate-pulse opacity-60"></div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="p-4 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-xl">
                  <Database className="w-10 h-10 text-white" />
                </div>
                {sparkleAnimation && (
                  <div className="absolute -top-2 -right-2">
                    <Sparkles className="w-6 h-6 text-yellow-400 animate-spin" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-2">
                  SQL Master Studio ✨
                  <Star className="w-8 h-8 text-yellow-400 animate-pulse" />
                </h1>
                <p className="text-lg font-bold text-gray-700 mt-2">
                  Advanced SQL analysis, optimization, and real-world problem solving! 🚀
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="relative group mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 rounded-2xl opacity-20 blur-lg"></div>
          <div className="relative bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 border-2 border-white/50 shadow-xl rounded-2xl p-2 backdrop-blur-sm">
            <div className="grid w-full grid-cols-5 gap-2">
              <TabButton 
                isActive={activeMode === 'query-lab'} 
                onClick={() => setActiveMode('query-lab')}
                className="flex items-center gap-2"
              >
                <Terminal className="w-4 h-4" />
                Query Lab
              </TabButton>
              <TabButton 
                isActive={activeMode === 'ai-interview'} 
                onClick={() => setActiveMode('ai-interview')}
                className="flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                AI Interview
              </TabButton>
              <TabButton 
                isActive={activeMode === 'real-world'} 
                onClick={() => setActiveMode('real-world')}
                className="flex items-center gap-2"
              >
                <Rocket className="w-4 h-4" />
                Real Problems
              </TabButton>
              <TabButton 
                isActive={activeMode === 'optimizer'} 
                onClick={() => setActiveMode('optimizer')}
                className="flex items-center gap-2"
              >
                <Zap className="w-4 h-4" />
                Optimizer
              </TabButton>
              <TabButton 
                isActive={activeMode === 'schema-designer'} 
                onClick={() => setActiveMode('schema-designer')}
                className="flex items-center gap-2"
              >
                <Layers className="w-4 h-4" />
                Schema Designer
              </TabButton>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default SQLMaster;