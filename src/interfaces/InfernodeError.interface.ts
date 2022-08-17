export default interface InfernodeError extends Error {
  userMessage?: string;
  httpStatus?: number;
  controller?: string;
  logMessage?: string;
}