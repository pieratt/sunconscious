export class UnreachableCaseError extends Error {
  public constructor(value: any) {
    super(`Developer error: hit unreachable case for ${value}`);
  }
}

export class UnexpectedDataError extends Error {
  public constructor(reason: string) {
    super(`Unexpected data condition: ${reason}`);
  }
}
