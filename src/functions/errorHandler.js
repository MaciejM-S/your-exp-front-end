
function errorHandler(errorStatus, navigate ) {
  
  if (
    errorStatus === 404 ||
    errorStatus === 500 ||
    errorStatus === 400
  ){
    return navigate('/error')
  }
  return
}

export default errorHandler


