import { http, searchHttp } from './http'

export const getNavigation = () => http.get('/menu?limit=1000')

export const getDoc = (docId: string) => http.get(`/doc/${docId}`)

export const getDocsWithId = () => http.get('doc?limit=1000&fields={"content":0,"content_markdown":0}')

export const postDocs = (data: any) => http.post('/test', data)

export const timeLine = () => http.get(`/timeline?limit=100`)

export const updateDoc = () => http.get('/updata_doc')

export const postSearchAll = (data: any) => searchHttp.post('/search-doc', data)

export const postSearchTimeline = (data: any) => searchHttp.post('/search-timeline', data)

export const postOther = (data: any) => searchHttp.post('', data)

export const postFeedback = (data: any) => http.post('/feedback', data)

export const getSuggestOption = () => http.get('/option')

export default {}
