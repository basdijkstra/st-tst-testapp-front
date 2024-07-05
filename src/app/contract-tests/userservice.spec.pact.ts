import { TestBed } from "@angular/core/testing";
import { HttpClientModule } from "@angular/common/http";
import { AppIoService } from "../services/app-io.service";
import { Matchers, Pact } from "@pact-foundation/pact";
import { DelaUserModel } from "../shared/models/dela-user";
import * as path from "path";

describe("Contract tests for user service", () => {
  const provider: Pact = new Pact({
    port: 4010,
    dir: path.resolve(process.cwd(), "pacts"),
    logLevel: "info",
    consumer: "st-tst-testapp-front",
    provider: "st-tst-testapp-api",
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

  describe("GET a user", () => {
    const userId = 100;

    const expectedUser: DelaUserModel = {
      id: userId,
      name: "Valid name",
      address: "Valid address",
      country: "Valid country",
      information: "Valid information",
    };

    beforeAll(async () => {
      await provider.addInteraction({
        state: `user 100 exists`,
        uponReceiving: "a request to GET a user",
        withRequest: {
          method: "GET",
          path: `/api/v1/DelaUser/${userId}`,
        },
        willRespondWith: {
          status: 200,
          body: {
            id: expectedUser.id,
            name: Matchers.string(expectedUser.name),
            address: Matchers.string(expectedUser.address),
            country: Matchers.string(expectedUser.country),
            information: Matchers.string(expectedUser.information),
          },
        },
      });
    });

    it("should get user with ID 100", (done) => {
      const userService: AppIoService = TestBed.inject(AppIoService);

      userService.getDelaUser(userId.toString()).subscribe(
        (response) => {
          expect(response).toEqual(expectedUser);
          done();
        },
        (error) => {
           // @ts-ignore
          done(error);
        }
      );

    });
  });
});
