export class Morphio {

  static parseToClass<T extends object>(jsonString: string, classType: new () => T): T {
    const data = JSON.parse(jsonString);
    const instance = new classType();
    // const schema = SchemaRegistry.getOrCreate(classType);

    const descriptors = Object.getOwnPropertyDescriptors(instance);
    Object.keys(descriptors).forEach((key) => {
      console.log(`Property: ${key}, Type: ${typeof descriptors[key].value}`);
    });

    // Traverse the JSON data directly
    for (const key in data) {
      const value = data[key];
      this.processValue(value, key, instance);
    }

    return instance;
  }

  private static processValue<T>(value: any, key: string, instance: T) {
    const propertyTypeName = typeof value;
    if (Array.isArray(value)) {
      // TODO:- Handle array types
    } else if (propertyTypeName === 'object') {
      // TODO:- Handle object types
    } else {
      (instance as any)[key] = this.parseValue(value, propertyTypeName);
    }
  }

  private static parseValue(value: any, type: string): any {
    if (!type) return value;

    switch (type.toLowerCase()) {
      case 'string':
        return String(value);
      case 'number':
        return Number(value);
      case 'boolean':
        return Boolean(value);
      default:
        return value;
    }
  }
}
