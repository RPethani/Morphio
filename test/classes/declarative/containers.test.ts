import { deserialize, morphioSchema, serialize } from '../../../src';

describe('Class Containers (Declarative)', () => {
  describe('Array containers', () => {
    class Tag {
      name!: string;
      color?: string;
    }

    class Post {
      title!: string;
      tags!: Tag[];
    }

    // Register schemas
    morphioSchema(Tag, {
      name: { type: 'string', required: true },
      color: { type: 'string', required: false },
    });

    morphioSchema(Post, {
      title: { type: 'string', required: true },
      tags: { type: { container: 'array', itemType: Tag }, required: true },
    });

    it('should deserialize array of objects', () => {
      const jsonString = JSON.stringify({
        title: 'My Post',
        tags: [{ name: 'tech', color: 'blue' }, { name: 'news' }],
      });

      const result = deserialize(jsonString, Post);

      expect(result).toBeInstanceOf(Post);
      expect(result.title).toBe('My Post');
      expect(Array.isArray(result.tags)).toBe(true);
      expect(result.tags.length).toBe(2);
      expect(result.tags[0]).toBeInstanceOf(Tag);
      expect(result.tags[0].name).toBe('tech');
      expect(result.tags[0].color).toBe('blue');
      expect(result.tags[1].name).toBe('news');
      expect(result.tags[1].color).toBeUndefined();
    });

    it('should serialize array of objects', () => {
      const post = new Post();
      post.title = 'My Post';
      post.tags = [];

      const tag1 = new Tag();
      tag1.name = 'tech';
      tag1.color = 'blue';

      const tag2 = new Tag();
      tag2.name = 'news';

      post.tags.push(tag1, tag2);

      const result = serialize(post);
      expect(result).toEqual({
        title: 'My Post',
        tags: [{ name: 'tech', color: 'blue' }, { name: 'news' }],
      });
    });
  });

  describe('Map containers', () => {
    class Score {
      value!: number;
      grade?: string;
    }

    class StudentRecord {
      name!: string;
      scores!: Map<string, Score>;
    }

    // Register schemas
    morphioSchema(Score, {
      value: { type: 'number', required: true },
      grade: { type: 'string', required: false },
    });

    morphioSchema(StudentRecord, {
      name: { type: 'string', required: true },
      scores: { type: { container: 'map', itemType: Score }, required: true },
    });

    it('should deserialize map of objects', () => {
      const jsonString = JSON.stringify({
        name: 'John',
        scores: {
          math: { value: 95, grade: 'A' },
          english: { value: 88 },
        },
      });

      const result = deserialize(jsonString, StudentRecord);

      expect(result).toBeInstanceOf(StudentRecord);
      expect(result.name).toBe('John');
      expect(result.scores).toBeInstanceOf(Map);
      expect(result.scores.size).toBe(2);

      const mathScore = result.scores.get('math');
      expect(mathScore).toBeInstanceOf(Score);
      expect(mathScore?.value).toBe(95);
      expect(mathScore?.grade).toBe('A');

      const englishScore = result.scores.get('english');
      expect(englishScore).toBeInstanceOf(Score);
      expect(englishScore?.value).toBe(88);
      expect(englishScore?.grade).toBeUndefined();
    });

    it('should serialize map of objects', () => {
      const record = new StudentRecord();
      record.name = 'John';
      record.scores = new Map();

      const mathScore = new Score();
      mathScore.value = 95;
      mathScore.grade = 'A';

      const englishScore = new Score();
      englishScore.value = 88;

      record.scores.set('math', mathScore);
      record.scores.set('english', englishScore);

      const result = serialize(record);
      expect(result).toEqual({
        name: 'John',
        scores: {
          math: { value: 95, grade: 'A' },
          english: { value: 88 },
        },
      });
    });
  });

  describe('Nested containers', () => {
    class Category {
      name!: string;
      subcategories!: Map<string, Category[]>;
    }

    // Register schema
    morphioSchema(Category, {
      name: { type: 'string', required: true },
      subcategories: {
        type: {
          container: 'map',
          itemType: {
            container: 'array',
            itemType: Category,
          },
        },
        required: true,
      },
    });

    it('should deserialize nested maps and arrays', () => {
      const jsonString = JSON.stringify({
        name: 'Electronics',
        subcategories: {
          computers: [
            { name: 'Laptops', subcategories: {} },
            { name: 'Desktops', subcategories: {} },
          ],
          phones: [{ name: 'Smartphones', subcategories: {} }],
        },
      });

      const result = deserialize(jsonString, Category);

      expect(result).toBeInstanceOf(Category);
      expect(result.name).toBe('Electronics');
      expect(result.subcategories).toBeInstanceOf(Map);
      expect(result.subcategories.size).toBe(2);

      const computers = result.subcategories.get('computers');
      expect(Array.isArray(computers)).toBe(true);
      expect(computers?.length).toBe(2);
      expect(computers?.[0].name).toBe('Laptops');
      expect(computers?.[1].name).toBe('Desktops');

      const phones = result.subcategories.get('phones');
      expect(Array.isArray(phones)).toBe(true);
      expect(phones?.length).toBe(1);
      expect(phones?.[0].name).toBe('Smartphones');
    });

    it('should serialize nested maps and arrays', () => {
      const electronics = new Category();
      electronics.name = 'Electronics';
      electronics.subcategories = new Map();

      const laptops = new Category();
      laptops.name = 'Laptops';
      laptops.subcategories = new Map();

      const desktops = new Category();
      desktops.name = 'Desktops';
      desktops.subcategories = new Map();

      const smartphones = new Category();
      smartphones.name = 'Smartphones';
      smartphones.subcategories = new Map();

      electronics.subcategories.set('computers', [laptops, desktops]);
      electronics.subcategories.set('phones', [smartphones]);

      const result = serialize(electronics);
      expect(result).toEqual({
        name: 'Electronics',
        subcategories: {
          computers: [
            { name: 'Laptops', subcategories: {} },
            { name: 'Desktops', subcategories: {} },
          ],
          phones: [{ name: 'Smartphones', subcategories: {} }],
        },
      });
    });
  });
});
