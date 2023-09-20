import axios from 'axios'
const baseUrlByRunningEnv =
  import.meta.env.MODE === 'prod' ? 'https://help-backend.qingflow.com' : 'https://help-backend.oalite.com'
const httpBaseUrl = `${baseUrlByRunningEnv}/qingflow-test/v1.0/`

const searchBaseUrl = import.meta.env.DEV ? '/search' : baseUrlByRunningEnv

const http = axios.create({
  baseURL: httpBaseUrl,
  timeout: 10000,
})

const searchHttp = axios.create({
  baseURL: searchBaseUrl,
  timeout: 10000,
})

export { http, searchHttp }
