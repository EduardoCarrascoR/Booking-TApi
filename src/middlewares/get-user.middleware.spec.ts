import { GetUserMiddleware } from './get-user.middleware';

describe('GetUserMiddleware', () => {
  it('should be defined', () => {
    expect(new GetUserMiddleware()).toBeDefined();
  });
});
