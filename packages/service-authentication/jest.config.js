module.exports = {
  moduleFileExtensions: ["ts", "tsx", "js", "json"],  
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.json",
      diagnostics: true
    }
  },
  // testMatch: ["**/__tests__/specs/**/*.+(ts|tsx|js)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/", "/lib/"],
  // setupTestFrameworkScriptFile: "./__tests__/setup.ts",
  verbose: true,
  // testURL: "http://localhost/"
};