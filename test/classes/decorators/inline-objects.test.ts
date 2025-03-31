import { deserialize, JsonProp, Serializable, serialize } from '../../../src';

describe('Inline Objects (Decorators)', () => {
  describe('Basic inline objects', () => {
    @Serializable()
    class UserProfile {
      @JsonProp({ type: 'string', required: true })
      name!: string;

      @JsonProp({ type: 'number', required: false })
      age?: number;

      @JsonProp({ type: 'string', required: false })
      email?: string;

      @JsonProp({
        type: {
          properties: {
            street: { type: 'string', required: false },
            city: { type: 'string', required: true },
            country: { type: 'string', required: true },
            coordinates: {
              type: {
                properties: {
                  lat: { type: 'number', required: true },
                  lng: { type: 'number', required: true }
                }
              },
              required: false
            }
          }
        },
        required: false
      })
      address?: {
        street?: string;
        city: string;
        country: string;
        coordinates?: {
          lat: number;
          lng: number;
        };
      };
    }

    it('should deserialize object with all fields', () => {
      const jsonString = JSON.stringify({
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
          coordinates: {
            lat: 40.7128,
            lng: -74.0060
          }
        }
      });

      const result = deserialize(jsonString, UserProfile);

      expect(result).toBeInstanceOf(UserProfile);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBe(30);
      expect(result.email).toBe('john@example.com');
      expect(result.address).toBeDefined();
      expect(result.address?.street).toBe('123 Main St');
      expect(result.address?.city).toBe('New York');
      expect(result.address?.country).toBe('USA');
      expect(result.address?.coordinates).toBeDefined();
      expect(result.address?.coordinates?.lat).toBe(40.7128);
      expect(result.address?.coordinates?.lng).toBe(-74.0060);
    });

    it('should deserialize with only required fields', () => {
      const jsonString = JSON.stringify({
        name: 'John Doe',
        address: {
          city: 'New York',
          country: 'USA'
        }
      });

      const result = deserialize(jsonString, UserProfile);

      expect(result).toBeInstanceOf(UserProfile);
      expect(result.name).toBe('John Doe');
      expect(result.age).toBeUndefined();
      expect(result.email).toBeUndefined();
      expect(result.address).toBeDefined();
      expect(result.address?.street).toBeUndefined();
      expect(result.address?.city).toBe('New York');
      expect(result.address?.country).toBe('USA');
      expect(result.address?.coordinates).toBeUndefined();
    });

    it('should serialize object with all fields', () => {
      const profile = new UserProfile();
      profile.name = 'John Doe';
      profile.age = 30;
      profile.email = 'john@example.com';
      profile.address = {
        street: '123 Main St',
        city: 'New York',
        country: 'USA',
        coordinates: {
          lat: 40.7128,
          lng: -74.0060
        }
      };

      const result = serialize(profile);
      
      expect(result).toEqual({
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        address: {
          street: '123 Main St',
          city: 'New York',
          country: 'USA',
          coordinates: {
            lat: 40.7128,
            lng: -74.0060
          }
        }
      });
    });

    it('should serialize with only required fields', () => {
      const profile = new UserProfile();
      profile.name = 'John Doe';
      profile.address = {
        city: 'New York',
        country: 'USA'
      };

      const result = serialize(profile);
      
      expect(result).toEqual({
        name: 'John Doe',
        address: {
          city: 'New York',
          country: 'USA'
        }
      });
    });
  });

  describe('Array with inline objects', () => {
    @Serializable()
    class BlogPost {
      @JsonProp({ type: 'string', required: true })
      title!: string;

      @JsonProp({ type: 'string', required: true })
      content!: string;

      @JsonProp({
        type: {
          properties: {
            tags: { 
              type: { container: 'array', itemType: 'string' },
              required: true 
            },
            author: {
              type: {
                properties: {
                  name: { type: 'string', required: true },
                  email: { type: 'string', required: false }
                }
              },
              required: true
            }
          }
        },
        required: false
      })
      metadata?: {
        tags: string[];
        author: {
          name: string;
          email?: string;
        };
      };
    }

    it('should handle arrays within inline objects', () => {
      const jsonString = JSON.stringify({
        title: 'My Blog Post',
        content: 'Hello World',
        metadata: {
          tags: ['tech', 'programming', 'typescript'],
          author: {
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      });

      const result = deserialize(jsonString, BlogPost);

      expect(result).toBeInstanceOf(BlogPost);
      expect(result.title).toBe('My Blog Post');
      expect(result.content).toBe('Hello World');
      expect(result.metadata).toBeDefined();
      expect(Array.isArray(result.metadata?.tags)).toBe(true);
      expect(result.metadata?.tags).toEqual(['tech', 'programming', 'typescript']);
      expect(result.metadata?.author.name).toBe('John Doe');
      expect(result.metadata?.author.email).toBe('john@example.com');
    });

    it('should serialize object with all fields', () => {
      const post = new BlogPost();
      post.title = 'My Blog Post';
      post.content = 'Hello World';
      post.metadata = {
        tags: ['tech', 'programming', 'typescript'],
        author: {
          name: 'John Doe',
          email: 'john@example.com'
        }
      };

      const result = serialize(post);

      expect(result).toEqual({
        title: 'My Blog Post',
        content: 'Hello World',
        metadata: {
          tags: ['tech', 'programming', 'typescript'],
          author: {
            name: 'John Doe',
            email: 'john@example.com'
          }
        }
      });
    });

    it('should serialize with only required fields', () => {
      const post = new BlogPost();
      post.title = 'My Blog Post';
      post.content = 'Hello World';
      post.metadata = {
        tags: ['tech'],
        author: {
          name: 'John Doe'
        }
      };

      const result = serialize(post);

      expect(result).toEqual({
        title: 'My Blog Post',
        content: 'Hello World',
        metadata: {
          tags: ['tech'],
          author: {
            name: 'John Doe'
          }
        }
      });
    });
  });

  describe('Complex containers with inline objects', () => {
    @Serializable()
    class TravelMap {
      @JsonProp({ 
        type: { 
          container: 'array', 
          itemType: {
            properties: {
              startDate: { type: 'string', required: true },
              endDate: { type: 'string', required: false },
              location: {
                type: {
                  properties: {
                    lat: { type: 'number', required: true },
                    lng: { type: 'number', required: true },
                    name: { type: 'string', required: true }
                  }
                },
                required: true
              }
            }
          }
        }, 
        required: true 
      })
      trips!: Array<{
        startDate: string;
        endDate?: string;
        location: {
          lat: number;
          lng: number;
          name: string;
        };
      }>;

      @JsonProp({
        type: {
          container: 'map',
          itemType: {
            properties: {
              visited: { type: 'boolean', required: true },
              rating: { type: 'number', required: false },
              notes: {
                type: {
                  properties: {
                    personal: { type: 'string', required: false },
                    public: { type: 'string', required: true }
                  }
                },
                required: false
              }
            }
          }
        },
        required: true
      })
      locationReviews!: Map<string, {
        visited: boolean;
        rating?: number;
        notes?: {
          personal?: string;
          public: string;
        };
      }>;
    }

    it('should handle array of inline objects', () => {
      const jsonString = JSON.stringify({
        trips: [
          {
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            location: {
              lat: 40.7128,
              lng: -74.0060,
              name: 'New York'
            }
          },
          {
            startDate: '2025-02-01',
            location: {
              lat: 51.5074,
              lng: -0.1278,
              name: 'London'
            }
          }
        ],
        locationReviews: {
          'New York': {
            visited: true,
            rating: 5,
            notes: {
              personal: 'Amazing city!',
              public: 'Great attractions'
            }
          },
          'London': {
            visited: true,
            notes: {
              public: 'Historic landmarks'
            }
          },
          'Paris': {
            visited: false,
            notes: {
              public: 'Want to visit'
            }
          }
        }
      });

      const result = deserialize(jsonString, TravelMap);

      expect(result).toBeInstanceOf(TravelMap);
      
      // Check trips array
      expect(Array.isArray(result.trips)).toBe(true);
      expect(result.trips.length).toBe(2);
      
      // Check first trip
      expect(result.trips[0].startDate).toBe('2025-01-01');
      expect(result.trips[0].endDate).toBe('2025-01-07');
      expect(result.trips[0].location.lat).toBe(40.7128);
      expect(result.trips[0].location.lng).toBe(-74.0060);
      expect(result.trips[0].location.name).toBe('New York');
      
      // Check second trip
      expect(result.trips[1].startDate).toBe('2025-02-01');
      expect(result.trips[1].endDate).toBeUndefined();
      expect(result.trips[1].location.lat).toBe(51.5074);
      expect(result.trips[1].location.lng).toBe(-0.1278);
      expect(result.trips[1].location.name).toBe('London');

      // Check location reviews map
      const locationReviews = result.locationReviews;
      expect(locationReviews).toBeInstanceOf(Map);
      expect(locationReviews.size).toBe(3);
      
      // Check New York review
      const nyReview = locationReviews.get('New York');
      expect(nyReview?.visited).toBe(true);
      expect(nyReview?.rating).toBe(5);
      expect(nyReview?.notes?.personal).toBe('Amazing city!');
      expect(nyReview?.notes?.public).toBe('Great attractions');
      
      // Check London review
      const londonReview = locationReviews.get('London');
      expect(londonReview?.visited).toBe(true);
      expect(londonReview?.rating).toBeUndefined();
      expect(londonReview?.notes?.personal).toBeUndefined();
      expect(londonReview?.notes?.public).toBe('Historic landmarks');
      
      // Check Paris review
      const parisReview = locationReviews.get('Paris');
      expect(parisReview?.visited).toBe(false);
      expect(parisReview?.rating).toBeUndefined();
      expect(parisReview?.notes?.personal).toBeUndefined();
      expect(parisReview?.notes?.public).toBe('Want to visit');
    });

    it('should serialize complex containers with inline objects', () => {
      const travel = new TravelMap();
      travel.trips = [
        {
          startDate: '2025-01-01',
          endDate: '2025-01-07',
          location: {
            lat: 40.7128,
            lng: -74.0060,
            name: 'New York'
          }
        },
        {
          startDate: '2025-02-01',
          location: {
            lat: 51.5074,
            lng: -0.1278,
            name: 'London'
          }
        }
      ];

      travel.locationReviews = new Map([
        ['New York', {
          visited: true,
          rating: 5,
          notes: {
            personal: 'Amazing city!',
            public: 'Great attractions'
          }
        }],
        ['London', {
          visited: true,
          notes: {
            public: 'Historic landmarks'
          }
        }],
        ['Paris', {
          visited: false,
          notes: {
            public: 'Want to visit'
          }
        }]
      ]);

      const result = serialize(travel);

      expect(result).toEqual({
        trips: [
          {
            startDate: '2025-01-01',
            endDate: '2025-01-07',
            location: {
              lat: 40.7128,
              lng: -74.0060,
              name: 'New York'
            }
          },
          {
            startDate: '2025-02-01',
            location: {
              lat: 51.5074,
              lng: -0.1278,
              name: 'London'
            }
          }
        ],
        locationReviews: {
          'New York': {
            visited: true,
            rating: 5,
            notes: {
              personal: 'Amazing city!',
              public: 'Great attractions'
            }
          },
          'London': {
            visited: true,
            notes: {
              public: 'Historic landmarks'
            }
          },
          'Paris': {
            visited: false,
            notes: {
              public: 'Want to visit'
            }
          }
        }
      });
    });
  });
});
