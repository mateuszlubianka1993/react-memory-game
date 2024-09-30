export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
        "\\.(css|less|scss|sss|styl)$": "<rootDir>/node_modules/jest-css-modules",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

};