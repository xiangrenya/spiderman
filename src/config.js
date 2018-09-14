const env = process.env.NODE_ENV;
const mapEnv = {
  development: {
    baseURL: ' http://localhost:3000',
  },
  prodcution: {
    baseURL: '',
  },
};
export default mapEnv[env].baseURL;
