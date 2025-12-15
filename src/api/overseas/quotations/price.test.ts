import { join } from "node:path";
import { describe, expect, test } from "vitest";
import nock from "nock";
import { createKisClient } from "../../../client";

const nockBack = nock.back;
nockBack.fixtures = join(__dirname, "__fixtures__");

// Set mode to 'record' to record new fixtures, or 'lockdown' to use existing ones
// nockBack.setMode("record");

describe("fetchOverseasPrice", () => {
  test("should fetch overseas price for AAPL", async () => {
    const { nockDone } = await nockBack("fetchOverseasPrice.json");

    const client = createKisClient({
      appKey: "test-app-key",
      appSecret: "test-app-secret",
    });

    // // Set token to bypass auth request
    client.setAccessToken("test-access-token");

    const request = {
      excd: "NAS",
      symb: "AAPL",
    };

    // Call via client.overseas
    const response = await client.overseas.quotations.price(request);

    expect(response.rt_cd).toBe("0");
    expect(response.msg_cd).toBe("MCA00000");
    expect(response.output).toBeDefined();
    expect(response.output.rsym).toBe("DNASAAPL");
    expect(response.output.last).toBeDefined();

    nockDone();
  });
});
