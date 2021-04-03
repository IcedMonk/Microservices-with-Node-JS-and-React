import axios from 'axios';

export default ({req}) => {
  if (typeof window === 'undefined') {
    //we are on the server
    return axios.create({
      baseURL: 'http://ingress-nginx.ingress-nginx.svc.cluster.local',
      headers: req.headers
    });
  } else {
    // we must be on browser
    return axios.create({
      baseURL: '/'
    });
  }
};