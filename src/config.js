const env = process.env.NODE_ENV;
const mapEnv = {
  development: {
    baseURL: ' http://localhost:4000',
  },
  prodcution: {
    baseURL: '',
  },
};
export default mapEnv[env].baseURL;
