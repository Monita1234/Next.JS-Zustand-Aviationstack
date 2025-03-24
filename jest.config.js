module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom', // Si estás usando React
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Usamos ts-jest para TypeScript
      '^.+\\.(js|jsx)$': 'babel-jest', // Usamos babel-jest para JS/JSX
    },
    transformIgnorePatterns: [
      '/node_modules/(?!your-module-to-transform).+\\.js$', // Si tienes módulos que necesitan ser transformados
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  };
  