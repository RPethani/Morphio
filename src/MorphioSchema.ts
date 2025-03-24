export class MorphioSchema {

  private name: string;
  private properties: Map<string, PropertyMetadata> = new Map();

  private constructor(name: string) {
    this.name = name;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  addProperty(propertyKey: string, metadata: PropertyMetadata): void {
    this.properties.set(propertyKey, metadata);
  }

  getProperties(): Map<string, PropertyMetadata> {
    return this.properties;
  }

  static create(name: string) {
    return new MorphioSchema(name);
  }
  // Add more methods as needed for managing schema metadata
}

interface PropertyMetadata {
  type: string;
  required?: boolean;
  description?: string;
}
