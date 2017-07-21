import axios from 'axios'

export default {
  getInitInfo () {
    return axios.get('/get_entry_by_rank?src=web&limit=20&type=post&category=all')
      .then((response) => {
        const data = response.data
        if (data && data.code === 0) {
          return Promise.resolve(data.data)
        }
        return Promise.reject(data.msg)
      })
      .catch((error) => {
        const msg = typeof error === 'object' || !error ? '服务器开小差了 0.0  请稍后再看' : error
        throw msg
      })
  }
}
