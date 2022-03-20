import axios from 'axios';

export async function fetchData() {
  const response = await axios.get('https://api.github.com/users/skychx');
  return {
    name: response.data!.login, // skychx
    blog: response.data!.blog, //  supercodepower.com
  }
}
