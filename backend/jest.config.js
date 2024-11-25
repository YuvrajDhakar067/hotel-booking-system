module.exports = {

    testEnvironment: "node",
 
     transform: {
 
       '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
 
     },
 
     setupFilesAfterEnv: ['@testing-library/jest-dom'],
 
   };