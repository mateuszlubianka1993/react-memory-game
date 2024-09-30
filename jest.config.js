export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|sass|scss|png|jpg|ttf|woff|woff2)$": "identity-obj-proxy",
        "^.+\\.svg$": "jest-transformer-svg",
    },
    setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

};