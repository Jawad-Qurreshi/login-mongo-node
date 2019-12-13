export class BookyConfig {
    private static path = 'http://localhost:3002';
  
    public static getPath(): string {
      return BookyConfig.path;
    }
  }