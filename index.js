const { Auth0FgaApi } = require("@auth0/fga"); // OR import { Auth0FgaApi } from '@auth0/fga';

const MIN_SLEEP_TIME = 100;
const NUM_WRITE_TUPLE_SET = 300;

function getRandomInt(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

async function write_data(authFga, modelId) {
  for (let index = 0; index < NUM_WRITE_TUPLE_SET; index++) {
    try {
      const contents = await authFga.write({
        writes: {
          tuple_keys: [
            {
              user: `user:${index}-0`,
              relation: "admin",
              object: `repo:${index}-0`,
            },
            {
              user: `user:${index}-1`,
              relation: "admin",
              object: `repo:${index}-1`,
            },
            {
              user: `user:${index}-2`,
              relation: "admin",
              object: `repo:${index}-2`,
            },
            {
              user: `user:${index}-3`,
              relation: "admin",
              object: `repo:${index}-3`,
            },
            {
              user: `user:${index}-4`,
              relation: "admin",
              object: `repo:${index}-4`,
            },
            {
              user: `user:${index}-5`,
              relation: "admin",
              object: `repo:${index}-5`,
            },
            {
              user: `user:${index}-6`,
              relation: "admin",
              object: `repo:${index}-6`,
            },
            {
              user: `user:${index}-7`,
              relation: "admin",
              object: `repo:${index}-7`,
            },
            {
              user: `user:${index}-8`,
              relation: "admin",
              object: `repo:${index}-8`,
            },
            {
              user: `user:${index}-9`,
              relation: "admin",
              object: `repo:${index}-9`,
            },
          ],
        },
        authorization_model_id: modelId,
      });
    } catch (err) {
      console.log("error", err);
    }
    await new Promise((r) =>
      setTimeout(
        r,
        MIN_SLEEP_TIME 
      )
    );
  }
}

async function cleanup_data(authFga, modelId) {
  for (let index = 0; index < NUM_WRITE_TUPLE_SET; index++) {
    try {
      const contents = await authFga.write({
        deletes: {
          tuple_keys: [
            {
              user: `user:${index}-0`,
              relation: "admin",
              object: `repo:${index}-0`,
            },
            {
              user: `user:${index}-1`,
              relation: "admin",
              object: `repo:${index}-1`,
            },
            {
              user: `user:${index}-2`,
              relation: "admin",
              object: `repo:${index}-2`,
            },
            {
              user: `user:${index}-3`,
              relation: "admin",
              object: `repo:${index}-3`,
            },
            {
              user: `user:${index}-4`,
              relation: "admin",
              object: `repo:${index}-4`,
            },
            {
              user: `user:${index}-5`,
              relation: "admin",
              object: `repo:${index}-5`,
            },
            {
              user: `user:${index}-6`,
              relation: "admin",
              object: `repo:${index}-6`,
            },
            {
              user: `user:${index}-7`,
              relation: "admin",
              object: `repo:${index}-7`,
            },
            {
              user: `user:${index}-8`,
              relation: "admin",
              object: `repo:${index}-8`,
            },
            {
              user: `user:${index}-9`,
              relation: "admin",
              object: `repo:${index}-9`,
            },
          ],
        },
        authorization_model_id: modelId,
      });
    } catch (err) {
      console.log("error", err);
    }
    await new Promise((r) =>
      setTimeout(
        r,
        MIN_SLEEP_TIME + getRandomInt(MIN_SLEEP_TIME, 3 * MIN_SLEEP_TIME)
      )
    );
  }
}

async function write_model(auth0Fga ) {
  const { authorization_model_id: id } = await auth0Fga.writeAuthorizationModel(
    {
      type_definitions: [
        {
          type: "user",
          relations: {},
          metadata: null,
        },
        {
          type: "team",
          relations: {
            member: {
              this: {},
            },
          },
          metadata: {
            relations: {
              member: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
            },
          },
        },
        {
          type: "repo",
          relations: {
            admin: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    tupleToUserset: {
                      tupleset: {
                        object: "",
                        relation: "owner",
                      },
                      computedUserset: {
                        object: "",
                        relation: "repo_admin",
                      },
                    },
                  },
                ],
              },
            },
            maintainer: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    computedUserset: {
                      object: "",
                      relation: "admin",
                    },
                  },
                ],
              },
            },
            owner: {
              this: {},
            },
            reader: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    computedUserset: {
                      object: "",
                      relation: "triager",
                    },
                  },
                  {
                    tupleToUserset: {
                      tupleset: {
                        object: "",
                        relation: "owner",
                      },
                      computedUserset: {
                        object: "",
                        relation: "repo_reader",
                      },
                    },
                  },
                ],
              },
            },
            triager: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    computedUserset: {
                      object: "",
                      relation: "writer",
                    },
                  },
                ],
              },
            },
            writer: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    computedUserset: {
                      object: "",
                      relation: "maintainer",
                    },
                  },
                  {
                    tupleToUserset: {
                      tupleset: {
                        object: "",
                        relation: "owner",
                      },
                      computedUserset: {
                        object: "",
                        relation: "repo_writer",
                      },
                    },
                  },
                ],
              },
            },
          },
          metadata: {
            relations: {
              admin: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
              maintainer: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
              owner: {
                directly_related_user_types: [
                  {
                    type: "organization",
                  },
                ],
              },
              reader: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
              triager: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
              writer: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "team",
                    relation: "member",
                  },
                ],
              },
            },
          },
        },
        {
          type: "organization",
          relations: {
            member: {
              union: {
                child: [
                  {
                    this: {},
                  },
                  {
                    computedUserset: {
                      object: "",
                      relation: "owner",
                    },
                  },
                ],
              },
            },
            owner: {
              this: {},
            },
            repo_admin: {
              this: {},
            },
            repo_reader: {
              this: {},
            },
            repo_writer: {
              this: {},
            },
          },
          metadata: {
            relations: {
              member: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                ],
              },
              owner: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                ],
              },
              repo_admin: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "organization",
                    relation: "member",
                  },
                ],
              },
              repo_reader: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "organization",
                    relation: "member",
                  },
                ],
              },
              repo_writer: {
                directly_related_user_types: [
                  {
                    type: "user",
                  },
                  {
                    type: "organization",
                    relation: "member",
                  },
                ],
              },
            },
          },
        },
      ],
      schema_version: "1.1",
    }
  );
  console.log(id);
  return id;
}

async function run(
  storeId,
  clientId,
  clientSecret
) {
  const auth0Fga = new Auth0FgaApi({
    environment: process.env.AUTH0_FGA_ENVIRONMENT, // can be: "us"/"staging"/"playground"
    storeId,
    clientId, // Required for all environments except playground
    clientSecret, // Required for all environments except playground
  });

  const modelId = await write_model(auth0Fga);
  await write_data(auth0Fga, modelId);
  await cleanup_data(auth0Fga, modelId);
}

async function main() {
  const runSet = [
    run(
      process.env.AUTH0_FGA_STORE_ID_0,
      process.env.AUTH0_FGA_CLIENT_ID_0,
      process.env.AUTH0_FGA_CLIENT_SECRET_0
    ),
    run(
      process.env.AUTH0_FGA_STORE_ID_1,
      process.env.AUTH0_FGA_CLIENT_ID_1,
      process.env.AUTH0_FGA_CLIENT_SECRET_1
    ),
  ];
  await Promise.all(runSet);
  console.log("Done");
}

main().then((text) => console.log("done"));
