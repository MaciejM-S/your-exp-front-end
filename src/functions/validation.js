export default function validation(val, type, errorsBlured, errors) {

  const value = val.trim()


  if (type === "firstName") {

    if (value === "") {
    
      errors.firstName = "Enter first name"
      return true
    }
    else {errors.firstName = " "}
  }

  else if (type === "lastName") {

    if (value === "") {
      errors.lastName = "Enter last name"
    }
  else {errors.lastName = " "}
  }


 else if (type === 'email') {

    if (value === "") {
      errors.email = "Enter email"
    }

    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
      errors.email = " "
      return
    }
     
    errors.email = "Invalid email"
    return
  }


  else if (type === "password") {

    if (value.length < 5) {
      errors.password = "Password should consists at least 5 characters" 
   
    }
    }

return false

  }

