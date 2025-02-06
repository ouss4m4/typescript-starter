export class CommandBus {
  private handlers = new Map();

  register(commandType: any, handler: any) {
    this.handlers.set(commandType, handler);
  }

  async execute(command: any) {
    const handler = this.handlers.get(command.constructor);
    if (!handler) {
      throw new Error(`No handler found for command: ${command.constructor.name}`);
    }
    return handler.handle(command);
  }
}
