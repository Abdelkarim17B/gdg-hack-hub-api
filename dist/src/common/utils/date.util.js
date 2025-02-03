"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidDateRange = isValidDateRange;
exports.isDateInPast = isDateInPast;
exports.formatDate = formatDate;
exports.addDays = addDays;
function isValidDateRange(startDate, endDate) {
    return startDate < endDate;
}
function isDateInPast(date) {
    return date < new Date();
}
function formatDate(date) {
    return date.toISOString();
}
function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
//# sourceMappingURL=date.util.js.map