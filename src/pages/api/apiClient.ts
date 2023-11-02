const data = [
  {
    dataStreamId:
      "derived:com.google.step_count.delta:407408718192:Example Manufacturer:ExampleTablet:1000001:MyDataSource",
    dataStreamName: "MyDataSource",
    type: "derived",
    dataType: {
      name: "com.google.step_count.delta",
      field: [
        {
          name: "steps",
          format: "integer",
        },
      ],
    },
    device: {
      uid: "1000001",
      type: "tablet",
      version: "1",
      model: "ExampleTablet",
      manufacturer: "Example Manufacturer",
    },
    application: {
      version: "1",
      detailsUrl: "http://example.com",
      name: "Foo Example App",
    },
    dataQualityStandard: [],
  },
];

export const createApiClient = () => {
  return {
    getDataSources: async () => {
      return data;
    },
  };
};
