import {TestBed} from "@angular/core/testing";
import {HttpClientModule} from "@angular/common/http";
import {AppIoService} from "../services/app-io.service";
import {Matchers, Pact} from "@pact-foundation/pact";
import {DelaUserModel} from "../shared/models/dela-user";
import * as path from "path";

describe('Contract tests for user service', () => {

  const provider: Pact = new Pact({
    port: 4010,
    log: path.resolve(process.cwd(), 'pact', 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 3,
    logLevel: 'debug',
    consumer: 'st-tst-testapp-front',
    provider: 'st-tst-testapp-api'
  });

  beforeAll(async () => {
    await provider.setup();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [AppIoService],
    });
  });

  afterEach(async () => {
    await provider.verify();
  });

  afterAll(async () => {
    await provider.finalize();
  });

  describe('GET a user', () => {

    const userId = 100;

    const expectedUser: DelaUserModel = {
      id: userId,
      name: 'Valid name',
      address: 'Valid address',
      country: 'Valid country',
      information: 'Valid information'
    }

    beforeAll(async () => {
      await provider.addInteraction({
        state: `user 100 exists`,
        uponReceiving: 'a request to GET a user',
        withRequest: {
          method: 'GET',
          path: `/api/v1/DelaUser/${userId}`,
        },
        willRespondWith: {
          status: 200,
          body: {
            id: expectedUser.id,
            name: Matchers.string(expectedUser.name),
            address: Matchers.string(expectedUser.address),
            country: Matchers.string(expectedUser.country),
            information: Matchers.string(expectedUser.information)
          },
        },
      });
    });

    it('should get user with ID 100', async () => {
      const userService: AppIoService = TestBed.inject(AppIoService);

      let actualUser: DelaUserModel;

      userService.getDelaUser(userId.toString()).subscribe({
        next: (user) => {
          actualUser = user;
        },
      })

      // @ts-ignore
      expect(actualUser).toEqual(expectedUser);
    });

  });
})