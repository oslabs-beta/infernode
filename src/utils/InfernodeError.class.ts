export default class InfernodeError extends Error {
  userMessage?: string;
  httpStatus?: number;
  controller?: string;

  constructor(
    message: string,
    userMessage: string = 'an unknown error occurred',
    httpStatus: number = 500,
    controller: string = 'unknown'
  ) {
    super(message);
    this.userMessage = userMessage,
    this.httpStatus = httpStatus,
    this.controller = controller
  }
}
