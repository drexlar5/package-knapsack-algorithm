# knapsack-algorithm

This is a knapsack algorithm app used to calculate the optimal load to send in a package based on weight and cost.

**Author:** Michael Agboola

**Environments**

- Node version - v16.19.0
- NPM version - v8.19.3

**This application uses the following technologies:**

* nodeJs
* Jest

**Install all dependencies**

```
npm install
```

**Start the application**

```
npm run start
```

**Run all tests**

```
npm run test
```

`
  To test a different file, you can simply add the file in the resources folder and update the filePath vairable in the index.js file.
`

For the Packer class, I used a combination of object-oriented programming (OOP), dynamic programming (DP), Dependency Injection (DI), Open/Closed Principle (OCP), and file I/O operations in Node.js to address the task at hand.

### Object-Oriented Programming (OOP)

I used OOP to define two classes - `Item`, `FileReader`, `Knapsack` and `Packer`. The `Item` class is used to model the items to be packed, each with an index, weight, and cost. The `FileReader` class is used to read the file asyncronously and throws error if the file type is invalid.  The `Knapsack` class contains the primary logic of the application. The `Packer` class  is responsible for packing items into packages based on certain constraints.

### Dynamic Programming (DP)

The heart of the algorithm is the `knapsack` static method in the `Packer` class. This method uses a well-known DP algorithm for solving the 0/1 knapsack problem. The knapsack problem is a problem in combinatorial optimization: given a set of items, each with a weight and a value, determine the number of each item to include in a collection so that the total weight is less than or equal to a given limit and the total cost is as large as possible.

The DP approach is particularly effective for the knapsack problem because it avoids the computational inefficiencies of other methods, such as brute force. By breaking down the problem into smaller subproblems (represented by the DP table), and then combining these subproblems to solve the original problem, DP provides a more efficient solution than exploring all possible combinations of items.

### Dependency Injection

The code follows the principle of Dependency Injection by injecting the `FileReader` and `Knapsack` instances into the Packer class. This allows for better flexibility, testability, and decoupling of dependencies. It enables the Packer class to utilize the functionalities of FileReader and Knapsack without having direct knowledge of their implementations.

### Open/Closed Principle (OCP)

The code follows the Open/Closed principle by extension through inheritance and dependency injection which promotes modularity, reusability, and maintainability. It also allows for the introduction of new functionality or variations of the knapsack algorithm without the need to modify the existing code, reducing the risk of introducing bugs and preserving the stability of the class.

### File I/O Operations

In Node.js, the `fs` module provides an API for interacting with the file system. I used this module to read the input data from a file and write the output data to a file. The `fs.readFile` method is used to read the file, and the returned data is split into lines and processed line by line.

### Exception Handling

To handle potential errors, I used JavaScript's built-in error handling mechanisms (try/catch blocks and the `throw` statement), along with a custom `APIException` class to provide more specific error messages. This makes the code more robust and easier to debug, as it allows for specific, meaningful error messages to be provided in different error situations.

Overall, this combination of strategies and techniques provided an efficient, robust, and easily understandable solution to the problem.