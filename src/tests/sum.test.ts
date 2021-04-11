import request from 'supertest';
import { User, establishDbConnection } from '../dbconfig';
import { tokenStore } from '../redisconfig';
const host = request('http://localhost:4000');

beforeAll(async () => {
  establishDbConnection();
  await User.deleteMany({});
  await tokenStore.flushAll();
});
const mockUser = {
  firstName: 'Andrei',
  lastName: 'Osypchuck',
  email: 'andrei@gmail.com',
  password: '123456',
};
describe('Controller routes', () => {
  describe('Successful register: ', () => {
    const route = '/register';
    let res: Object;
    it('Should respond with 200', async (done) => {
      res = await host.post(route).send(mockUser).expect(200);
      done();
    });
  });
});
