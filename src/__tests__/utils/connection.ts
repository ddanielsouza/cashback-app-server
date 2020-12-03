import { createConnection, getConnection } from 'typeorm';

export const create = async (): Promise<void> => {
   await createConnection({
      name: 'default',
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      username: '',
      password: '',
      database: 'test-application',
      entities: ['src/modules/**/infra/typeorm/entities/*.ts'],
   });
};

export const close = async (): Promise<void> => {
   await getConnection().close();
};

export const clear = async (): Promise<void> => {
   const connection = getConnection();
   const entities = connection.entityMetadatas;

   for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const repository = connection.getRepository(entity.name);
      const documents = await repository.find();

      if (documents.length > 0) await repository.clear();
   }
};

describe('Test connection', () => {
   beforeAll(async () => {
      await create();
   });

   afterAll(async () => {
      await close();
   });

   beforeEach(async () => {
      await clear();
   });

   it('Open connection', async () => {
      const connection = getConnection();
      expect(connection.isConnected).toBeTruthy();
   });
});
