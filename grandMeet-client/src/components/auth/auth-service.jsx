import axios from 'axios';

class AuthService {
  constructor() {
    let service = axios.create({
      baseURL: 'http://localhost:5000/api',
      withCredentials: true
    });
    this.service = service;
  }

  signup = (form) => {
    return axios({
      method:"POST",
      baseURL: `http://localhost:5000/api/signup`,
      withCredentials: true,
      data:form
    })
    // return this.service.post('/signup', {username, password, data})
    .then(response => response.data)
  }

  loggedin = () => {
    return this.service.get('/loggedin')
    .then(response => response.data)
  }
  
  login = 
  // (username,password) => {
  //   return axios({
  //     method:"POST",
  //     baseURL: `http://localhost:5000/api/login`,
  //     withCredentials: true,
  //   })
  (username, password, coordinates) => {
    return this.service.post('/login', {username, password, coordinates})
    .then(response => response.data)
      // <Redirect to="/profile"/>)
  }
  
  logout = () => {
    return this.service.post('/logout', {})
    .then(response => response.data)
  }
}

export default AuthService;