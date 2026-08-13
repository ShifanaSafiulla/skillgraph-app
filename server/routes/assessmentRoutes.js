import express from 'express';
import AssessmentAttempt from '../models/AssessmentAttempt.js';
import CodingQuestion from '../models/CodingQuestion.js';

const router = express.Router();

const isMongoConnected = () => {
  return typeof global.isMongoConnected === 'function' ? global.isMongoConnected() : false;
};

let memoryAttempts = [];

export const pythonChallenges = [
  // --- BEGINNER TIER ---
  {
    id: 'py-beg-1',
    title: 'Even or Odd Filter',
    difficulty: 'Beginner',
    category: 'Conditions',
    points: 100,
    description: 'Write a function `is_even(n)` that returns `True` if an integer `n` is even and `False` if it is odd.',
    starterCode: `def is_even(n):\n    # Write your Python code here\n    pass\n`,
    sampleInput: 'n = 4',
    sampleOutput: 'True',
    testCases: [
      { input: [4], expected: true },
      { input: [7], expected: false },
      { input: [0], expected: true },
      { input: [-2], expected: true },
      { input: [99], expected: false }
    ]
  },
  {
    id: 'py-beg-2',
    title: 'Sum of First N Numbers',
    difficulty: 'Beginner',
    category: 'Loops',
    points: 100,
    description: 'Write a function `sum_n(n)` that uses a loop to calculate the sum of numbers from 1 up to `n` (inclusive).',
    starterCode: `def sum_n(n):\n    # Write your Python loop code here\n    total = 0\n    for i in range(1, n + 1):\n        total += i\n    return total\n`,
    sampleInput: 'n = 5',
    sampleOutput: '15',
    testCases: [
      { input: [5], expected: 15 },
      { input: [10], expected: 55 },
      { input: [1], expected: 1 },
      { input: [100], expected: 5050 }
    ]
  },
  {
    id: 'py-beg-3',
    title: 'Reverse String Specialist',
    difficulty: 'Beginner',
    category: 'Strings',
    points: 100,
    description: 'Write a function `reverse_string(s)` that takes a string `s` and returns it reversed.',
    starterCode: `def reverse_string(s):\n    # Write your string reversal logic\n    return s[::-1]\n`,
    sampleInput: 's = "python"',
    sampleOutput: '"nohtyp"',
    testCases: [
      { input: ["python"], expected: "nohtyp" },
      { input: ["skillgraph"], expected: "hparglliks" },
      { input: ["a"], expected: "a" },
      { input: ["12345"], expected: "54321" }
    ]
  },
  {
    id: 'py-beg-4',
    title: 'Find Maximum in List',
    difficulty: 'Beginner',
    category: 'Lists',
    points: 100,
    description: 'Write a function `find_max(numbers)` that takes a list of integers `numbers` and returns the largest number.',
    starterCode: `def find_max(numbers):\n    # Return maximum element in numbers\n    pass\n`,
    sampleInput: 'numbers = [3, 14, 1, 7, 9]',
    sampleOutput: '14',
    testCases: [
      { input: [[3, 14, 1, 7, 9]], expected: 14 },
      { input: [[-10, -5, -20]], expected: -5 },
      { input: [[42]], expected: 42 },
      { input: [[100, 200, 150]], expected: 200 }
    ]
  },
  {
    id: 'py-beg-5',
    title: 'Calculate Factorial',
    difficulty: 'Beginner',
    category: 'Basic functions',
    points: 100,
    description: 'Write a function `factorial(n)` that returns the factorial of a non-negative integer `n`. Note: 0! = 1.',
    starterCode: `def factorial(n):\n    # Calculate n!\n    pass\n`,
    sampleInput: 'n = 5',
    sampleOutput: '120',
    testCases: [
      { input: [5], expected: 120 },
      { input: [0], expected: 1 },
      { input: [3], expected: 6 },
      { input: [6], expected: 720 }
    ]
  },

  // --- INTERMEDIATE TIER ---
  {
    id: 'py-int-1',
    title: 'Word Frequency Count',
    difficulty: 'Intermediate',
    category: 'Dictionaries',
    points: 150,
    description: 'Write a function `word_count(words)` that takes a list of words and returns a dictionary mapping each unique word to its frequency count.',
    starterCode: `def word_count(words):\n    # Return frequency dict\n    freq = {}\n    for word in words:\n        freq[word] = freq.get(word, 0) + 1\n    return freq\n`,
    sampleInput: 'words = ["apple", "banana", "apple", "cherry"]',
    sampleOutput: '{"apple": 2, "banana": 1, "cherry": 1}',
    testCases: [
      { input: [["apple", "banana", "apple", "cherry"]], expected: { apple: 2, banana: 1, cherry: 1 } },
      { input: [["a", "b", "a", "c", "b", "a"]], expected: { a: 3, b: 2, c: 1 } },
      { input: [["test"]], expected: { test: 1 } }
    ]
  },
  {
    id: 'py-int-2',
    title: 'Binary Search Implementation',
    difficulty: 'Intermediate',
    category: 'Searching',
    points: 150,
    description: 'Write a function `binary_search(arr, target)` that returns the 0-based index of `target` in sorted list `arr`, or `-1` if not found.',
    starterCode: `def binary_search(arr, target):\n    # Implement binary search algorithm\n    pass\n`,
    sampleInput: 'arr = [10, 20, 30, 40, 50], target = 40',
    sampleOutput: '3',
    testCases: [
      { input: [[10, 20, 30, 40, 50], 40], expected: 3 },
      { input: [[1, 3, 5, 7, 9], 1], expected: 0 },
      { input: [[2, 4, 6, 8], 5], expected: -1 }
    ]
  },
  {
    id: 'py-int-3',
    title: 'Recursive Fibonacci Sequence',
    difficulty: 'Intermediate',
    category: 'Recursion',
    points: 150,
    description: 'Write a recursive function `fibonacci(n)` that returns the n-th Fibonacci number where `fib(0)=0`, `fib(1)=1`.',
    starterCode: `def fibonacci(n):\n    # Write recursive logic\n    pass\n`,
    sampleInput: 'n = 6',
    sampleOutput: '8',
    testCases: [
      { input: [0], expected: 0 },
      { input: [1], expected: 1 },
      { input: [6], expected: 8 },
      { input: [8], expected: 21 }
    ]
  },
  {
    id: 'py-int-4',
    title: 'Bubble Sort Algorithm',
    difficulty: 'Intermediate',
    category: 'Sorting',
    points: 150,
    description: 'Write a function `bubble_sort(arr)` that sorts a list of numbers in ascending order and returns the sorted list.',
    starterCode: `def bubble_sort(arr):\n    # Sort array in ascending order\n    pass\n`,
    sampleInput: 'arr = [64, 34, 25, 12, 22]',
    sampleOutput: '[12, 22, 25, 34, 64]',
    testCases: [
      { input: [[64, 34, 25, 12, 22]], expected: [12, 22, 25, 34, 64] },
      { input: [[5, 1, 4, 2, 8]], expected: [1, 2, 4, 5, 8] },
      { input: [[3, 3, 1]], expected: [1, 3, 3] }
    ]
  },
  {
    id: 'py-int-5',
    title: 'File Data Line Extractor Simulator',
    difficulty: 'Intermediate',
    category: 'File handling',
    points: 150,
    description: 'Write a function `parse_log_lines(lines)` that filters lines starting with "ERROR" from a list of log file line strings.',
    starterCode: `def parse_log_lines(lines):\n    # Return list of error lines\n    return [line for line in lines if line.startswith("ERROR")]\n`,
    sampleInput: 'lines = ["INFO: start", "ERROR: db connection failed", "WARNING: low memory"]',
    sampleOutput: '["ERROR: db connection failed"]',
    testCases: [
      { input: [["INFO: start", "ERROR: db connection failed", "WARNING: low memory"]], expected: ["ERROR: db connection failed"] },
      { input: [["ERROR: 404", "ERROR: 500"]], expected: ["ERROR: 404", "ERROR: 500"] },
      { input: [["INFO: ok"]], expected: [] }
    ]
  },

  // --- ADVANCED TIER ---
  {
    id: 'py-adv-1',
    title: 'Bank Account Class (OOP)',
    difficulty: 'Advanced',
    category: 'OOP',
    points: 200,
    description: 'Write a class `BankAccount` with `deposit(amount)` and `withdraw(amount)` methods that track and return current `balance`. Returns `"Insufficient Funds"` if withdrawal exceeds balance.',
    starterCode: `class BankAccount:\n    def __init__(self, initial_balance=0):\n        self.balance = initial_balance\n    def deposit(self, amount):\n        self.balance += amount\n        return self.balance\n    def withdraw(self, amount):\n        if amount > self.balance:\n            return "Insufficient Funds"\n        self.balance -= amount\n        return self.balance\n`,
    sampleInput: 'acc = BankAccount(100); acc.withdraw(150)',
    sampleOutput: '"Insufficient Funds"',
    testCases: [
      { input: [100, "withdraw", 150], expected: "Insufficient Funds" },
      { input: [100, "deposit", 50], expected: 150 },
      { input: [200, "withdraw", 50], expected: 150 }
    ]
  },
  {
    id: 'py-adv-2',
    title: 'Valid Parentheses Stack Validator',
    difficulty: 'Advanced',
    category: 'Data structures',
    points: 200,
    description: 'Write a function `is_valid_brackets(s)` using a Stack data structure to check if brackets `()`, `{}`, `[]` in string `s` are correctly balanced.',
    starterCode: `def is_valid_brackets(s):\n    # Implement stack validator\n    pass\n`,
    sampleInput: 's = "{[()]}"',
    sampleOutput: 'True',
    testCases: [
      { input: ["{[()]}"], expected: true },
      { input: ["{[(])}"], expected: false },
      { input: ["("], expected: false },
      { input: ["()[]{} "], expected: true }
    ]
  },
  {
    id: 'py-adv-3',
    title: 'Climbing Stairs (Dynamic Programming)',
    difficulty: 'Advanced',
    category: 'Dynamic programming',
    points: 200,
    description: 'You are climbing a staircase with `n` steps. Each time you can climb 1 or 2 steps. Write `climb_stairs(n)` to find distinct ways to reach top.',
    starterCode: `def climb_stairs(n):\n    # Implement DP bottom-up approach\n    pass\n`,
    sampleInput: 'n = 4',
    sampleOutput: '5',
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [4], expected: 5 },
      { input: [5], expected: 8 }
    ]
  },
  {
    id: 'py-adv-4',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Advanced',
    category: 'Algorithms',
    points: 200,
    description: 'Write `length_of_longest_substring(s)` that finds the length of the longest substring in `s` without repeating characters.',
    starterCode: `def length_of_longest_substring(s):\n    # Sliding window algorithm\n    pass\n`,
    sampleInput: 's = "abcabcbb"',
    sampleOutput: '3',
    testCases: [
      { input: ["abcabcbb"], expected: 3 },
      { input: ["bbbbb"], expected: 1 },
      { input: ["pwwkew"], expected: 3 },
      { input: [" "], expected: 1 }
    ]
  }
];

// GET All challenges catalog
router.get('/problems', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const dbQuestions = await CodingQuestion.find();
      if (dbQuestions.length > 0) {
        const formatted = dbQuestions.map(q => ({
          id: q.problemId,
          title: q.title,
          difficulty: q.difficulty,
          category: q.topic,
          points: q.score || 100,
          description: q.description,
          starterCode: q.starterCode,
          sampleInput: q.sampleInput,
          sampleOutput: q.sampleOutput,
          testCases: q.testCases
        }));
        return res.json({ success: true, source: 'mongodb', data: formatted });
      }
    }
    res.json({ success: true, source: 'memory-fallback', data: pythonChallenges });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching problems', error: error.message });
  }
});

// GET user overall stats
router.get('/user-stats', async (req, res) => {
  try {
    let attempts = [];
    if (isMongoConnected()) {
      attempts = await AssessmentAttempt.find();
    } else {
      attempts = memoryAttempts;
    }

    const totalAttempts = attempts.length;
    const correctAttempts = attempts.filter(a => a.status === 'Correct');
    const totalScore = correctAttempts.reduce((sum, a) => sum + (a.scoreAwarded || 0), 0);
    const passRate = totalAttempts > 0 ? Math.round((correctAttempts.length / totalAttempts) * 100) : 0;

    // Adaptive level progression formula
    let userLevel = 'Beginner';
    if (totalScore >= 500 && passRate >= 70) {
      userLevel = 'Advanced';
    } else if (totalScore >= 250 && passRate >= 50) {
      userLevel = 'Intermediate';
    }

    res.json({
      success: true,
      data: {
        totalScore,
        passRate,
        totalAttempts,
        correctCount: correctAttempts.length,
        recommendedLevel: userLevel
      }
    });
  } catch (err) {
    console.error('Error fetching user stats:', err);
    res.status(500).json({ success: false, message: 'Error calculating stats' });
  }
});

// POST submit attempt
router.post('/submit', async (req, res) => {
  try {
    const { problemId, codeSubmitted, passedTestCases, totalTestCases, attemptsCount } = req.body;

    const problem = pythonChallenges.find(p => p.id === problemId);
    if (!problem) {
      return res.status(404).json({ success: false, message: 'Problem not found' });
    }

    const isPassed = passedTestCases === totalTestCases;
    const status = isPassed ? 'Correct' : 'Incorrect';
    const scoreAwarded = isPassed ? problem.points : 0;

    const record = {
      problemId,
      title: problem.title,
      category: problem.category,
      difficulty: problem.difficulty,
      codeSubmitted,
      status,
      scoreAwarded,
      passedTestCases,
      totalTestCases,
      attemptsCount: attemptsCount || 1,
      createdAt: new Date()
    };

    if (isMongoConnected()) {
      const newAttempt = new AssessmentAttempt(record);
      await newAttempt.save();
    } else {
      memoryAttempts.push(record);
    }

    res.json({
      success: true,
      message: isPassed ? 'Challenge Passed! Score Updated!' : 'Test cases failed. Keep trying!',
      data: record
    });
  } catch (err) {
    console.error('Error recording attempt:', err);
    res.status(500).json({ success: false, message: 'Error saving attempt', error: err.message });
  }
});

export default router;
