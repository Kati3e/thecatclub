export class ClubError extends Error {
  constructor(status: boolean, message: string) {
    super();
    console.log(`An error has occurred: ${message}`);
    if (status === null) {
      throw new Error(message);
    }
  }
}