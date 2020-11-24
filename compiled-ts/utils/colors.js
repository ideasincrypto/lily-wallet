"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lighten_1 = __importDefault(require("polished/lib/color/lighten"));
var darken_1 = __importDefault(require("polished/lib/color/darken"));
// import shade from 'polished/lib/color/shade';
exports.gray50 = '#f9fafb';
exports.gray100 = '#f7fafc';
exports.gray200 = '#edf2f7';
exports.gray300 = '#e2e8f0';
exports.gray400 = '#cbd5e0';
exports.gray500 = '#a0aec0';
exports.gray600 = '#718096';
exports.gray700 = '#4a5568';
exports.gray800 = '#2d3748';
exports.gray900 = '#1a202c';
exports.red100 = '#fff5f5';
exports.red200 = '#fed7d7';
exports.red300 = '#feb2b2';
exports.red400 = '#fc8181';
exports.red500 = '#f56565';
exports.red600 = '#e53e3e';
exports.red700 = '#c53030';
exports.red800 = '#9b2c2c';
exports.red900 = '#742a2a';
exports.orange100 = '#fffaf0';
exports.orange200 = '#feebc8';
exports.orange300 = '#fbd38d';
exports.orange400 = '#f6ad55';
exports.orange500 = '#ed8936';
exports.orange600 = '#dd6b20';
exports.orange700 = '#c05621';
exports.orange800 = '#9c4221';
exports.orange900 = '#7b341e';
exports.yellow100 = '#fffff0';
exports.yellow200 = '#fefcbf';
exports.yellow300 = '#faf089';
exports.yellow400 = '#f6e05e';
exports.yellow500 = '#ecc94b';
exports.yellow600 = '#d69e2e';
exports.yellow700 = '#b7791f';
exports.yellow800 = '#975a16';
exports.yellow900 = '#744210';
exports.green100 = '#f0fff4';
exports.green200 = '#c6f6d5';
exports.green300 = '#9ae6b4';
exports.green400 = '#68d391';
exports.green500 = '#48bb78';
exports.green600 = '#38a169';
exports.green700 = '#2f855a';
exports.green800 = '#276749';
exports.green900 = '#22543d';
exports.teal100 = '#e6fffa';
exports.teal200 = '#b2f5ea';
exports.teal300 = '#81e6d9';
exports.teal400 = '#4fd1c5';
exports.teal500 = '#38b2ac';
exports.teal600 = '#319795';
exports.teal700 = '#2c7a7b';
exports.teal800 = '#285e61';
exports.teal900 = '#234e52';
exports.blue100 = '#ebf8ff';
exports.blue200 = '#bee3f8';
exports.blue300 = '#90cdf4';
exports.blue400 = '#63b3ed';
exports.blue500 = '#4299e1';
exports.blue600 = '#3182ce';
exports.blue700 = '#2b6cb0';
exports.blue800 = '#2c5282';
exports.blue900 = '#2a4365';
exports.indigo100 = '#ebf4ff';
exports.indigo200 = '#c3dafe';
exports.indigo300 = '#a3bffa';
exports.indigo400 = '#7f9cf5';
exports.indigo500 = '#667eea';
exports.indigo600 = '#5a67d8';
exports.indigo700 = '#4c51bf';
exports.indigo800 = '#434190';
exports.indigo900 = '#3c366b';
exports.purple100 = '#faf5ff';
exports.purple200 = '#e9d8fd';
exports.purple300 = '#d6bcfa';
exports.purple400 = '#b794f4';
exports.purple500 = '#9f7aea';
exports.purple600 = '#805ad5';
exports.purple700 = '#6b46c1';
exports.purple800 = '#553c9a';
exports.purple900 = '#44337a';
exports.pink100 = '#fff5f7';
exports.pink200 = '#fed7e2';
exports.pink300 = '#fbb6ce';
exports.pink400 = '#f687b3';
exports.pink500 = '#ed64a6';
exports.pink600 = '#d53f8c';
exports.pink700 = '#b83280';
exports.pink800 = '#97266d';
exports.pink900 = '#702459';
exports.orange = '#ff6f55';
exports.darkOrange = darken_1.default(0.2, exports.orange);
exports.lightOrange = lighten_1.default(0.2, exports.orange);
exports.gray = '#bdc3c7';
exports.lightGray = lighten_1.default(0.2, exports.gray);
exports.darkGray = darken_1.default(0.2, exports.gray);
exports.white = '#ffffff';
exports.offWhite = '#F5F7FA';
exports.darkOffWhite = darken_1.default(0.05, exports.offWhite);
exports.lightBlack = '#565656';
exports.black = '#1F1F1F';
// 424242
exports.red = '#D8000C';
exports.lightRed = '#FFBABA';
exports.blue = exports.blue500;
exports.darkBlue = darken_1.default(0.05, exports.blue);
exports.lightBlue = lighten_1.default(0.40, exports.blue);
exports.green = "#9BD187";
exports.darkGreen = darken_1.default(0.15, exports.green);
exports.lightGreen = "#E6FFE0";
exports.purple = "#A367FF";
exports.yellow = "#F3D55B";
exports.lightYellow = lighten_1.default(0.25, exports.yellow);
exports.secondaryMenu = lighten_1.default(0.15, exports.gray);
//# sourceMappingURL=colors.js.map