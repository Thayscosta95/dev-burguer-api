
const adminMiddleware = (request, response, next) => {
  const isUserAdmin = request.userIsAdmin;

  if(!isUserAdmin) {
    return response.status(401).json();
  }
 
  next();

};

export default adminMiddleware;
