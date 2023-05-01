const awsRegion = "us-east-1";

export const awsConfig = {
  aws_cognito_region: awsRegion,
  aws_user_pools_id: "us-east-1_8UeZgBv2M",
  aws_user_pools_web_client_id: "3t7eaj3hhdac1p0mlf6pg9uecl",
  aws_cognito_identity_pool_id:
    "us-east-1:2a4d4277-0341-4493-84ea-77786dae6641",
};

const deviceDataEndpoint = "af0d44r9ry4jt-ats.iot.us-east-1.amazonaws.com";

export const awsIoTConfig = {
  aws_pubsub_region: awsRegion,
  aws_pubsub_endpoint: `wss://${deviceDataEndpoint}/mqtt`,
};
