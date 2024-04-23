import Cookies from "js-cookie"

export const setcookie =(name,value)=>{
  const expirationDate = new Date();
  expirationDate.setMonth(expirationDate.getMonth() + 12);
    Cookies.set(name,value,{expires :expirationDate})
}
    
   

export const getCookie = (name) => {
    return Cookies.get(name);
  };
  
  export const removeCookie = (name) => {
    Cookies.remove(name);
  };
