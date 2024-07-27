const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const windowSize = 10;

let storedNumbers = [];

// Function to check if a number is prime
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }
  return true;
};

// Function to check if a number is a Fibonacci number
const isFibonacci = (num) => {
  const isPerfectSquare = (n) => {
    const s = Math.sqrt(n);
    return s * s === n;
  };
  return (
    isPerfectSquare(5 * num * num + 4) || isPerfectSquare(5 * num * num - 4)
  );
};

// Function to fetch a number from a third party
const fetchNumber = async (type) => {
  let url;
  switch (type) {
    case 'p':
      url = 'https://api.prime-numbers.io/get';
      break;
    case 'f':
      url = 'https://api.fibonacci-numbers.io/get';
      break;
    case 'e':
      url = 'https://api.even-numbers.io/get';
      break;
    case 'r':
      url = 'https://api.random-numbers.io/get';
      break;
    default:
      throw new Error('Invalid type');
  }

  const response = await axios.get(url, { timeout: 500 });
  return response.data.number;
};

// Function to calculate the average
const calculateAverage = (numbers) => {
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
};

app.get('/numbers/:type', async (req, res) => {
  const { type } = req.params;

  if (!['p', 'f', 'e', 'r'].includes(type)) {
    return res.status(400).json({ error: 'Invalid type' });
  }

  try {
    const newNumber = await fetchNumber(type);

    if (!storedNumbers.includes(newNumber)) {
      if (storedNumbers.length >= windowSize) {
        storedNumbers.shift();
      }
      storedNumbers.push(newNumber);
    }

    const average = calculateAverage(storedNumbers);
    res.json({
      storedNumbersBefore: storedNumbers.slice(0, -1),
      storedNumbersAfter: storedNumbers,
      average: storedNumbers.length < windowSize ? null : average,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch number' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
