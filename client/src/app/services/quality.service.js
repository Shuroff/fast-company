import httpService from './http.service'

const qualityEndpoint = 'quality/'

const qualityService = {
  fetchAll: async () => {
    const { data } = await httpService.get(qualityEndpoint)
    return data.content
  },
}

export default qualityService
