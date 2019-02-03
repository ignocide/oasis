import axios, {AxiosInstance} from 'axios'

interface ApplicationProfile {
  name?: string,
  profile?: string,
}

interface SpringCloudConfigClientOptions extends ApplicationProfile {
  configServerUrl: string,
  username: string,
  password: string,
}

class SpringCloudConfigClient {
  option: SpringCloudConfigClientOptions;
  request: AxiosInstance;

  constructor(option: SpringCloudConfigClientOptions) {
    this.option = option;
    this.request = axios.create({
      baseURL: this.option.configServerUrl,
      auth: {
        username: this.option.username,
        password: this.option.password,
      }
    });
  }

  async fetch(applicationProfile ?: ApplicationProfile) {
    let name = this.option.name;
    let profile = this.option.profile;

    if (applicationProfile) {
      name = applicationProfile.name;
      profile = applicationProfile.profile;
    }

    let url = name;
    if (profile) {
      url += `-${profile}`
    }
    url += '.json';

    const result = await this.request.get(url);
    return result.data;

  }
}


export default SpringCloudConfigClient