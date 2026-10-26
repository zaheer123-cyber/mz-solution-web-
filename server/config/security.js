const MIN_SECRET_LENGTH = 32;

export const getRequiredSecret = (name) => {
  const secret = process.env[name];

  if (!secret) {
    throw new Error(`${name} must be set in the server environment.`);
  }

  if (secret.length < MIN_SECRET_LENGTH) {
    throw new Error(`${name} must be at least ${MIN_SECRET_LENGTH} characters long.`);
  }

  return secret;
};
