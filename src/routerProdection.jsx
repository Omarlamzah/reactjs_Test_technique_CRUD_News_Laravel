import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import "toastr/build/toastr.min.css";
import toastr from "toastr";
import Loader from "../component/loading/loading";

// public user
export const Publicuser = ({ children }) => {
  const { user, isAuthenticated, isLoading, errors } = useSelector( (state) => state.loginslice);
 
  if (isLoading) {    return (  <div>    <Loader />   </div>  );}
  if (isAuthenticated) {
    optiontoastr();
    toastr.info("You are connected welcom ");
    return <Navigate to="/dasboard" replace />;
  }

   return children ? children : <Outlet />;
};

// Auth user
export const Authuser = ({ children }) => {
  const { user, isAuthenticated, isLoading, errors } = useSelector( (state) => state.loginslice);
  const { myuser_score, quiztokenstatus, scoredif, loading } = useSelector(   (state) => state.profileslice);

  if (isLoading || loading) {    return (  <div>    <Loader />   </div>  );}
   if (!isAuthenticated) {
    optiontoastr();

    toastr.info("please login to access ");
    return <Navigate to="/login" replace />;
  }
  return children ? children : <Outlet />;
};

// Active  user
export const Activeuser = ({ children }) => {
 
  const { user, isAuthenticated, isLoading, errors } = useSelector( (state) => state.loginslice);
  const { myuser_score, quiztokenstatus, scoredif, loading } = useSelector(   (state) => state.profileslice);


  const { gamestatus} = useSelector((state) => state.quizslice);
  const { nextQuizPartv ,questions ,error} = useSelector((state) => state.quizvalidationslice);
  const quizvalidationslice = useSelector((state) => state.quizvalidationslice);

  const quizvalidationsliceloading =quizvalidationslice.loading;
  const quizvalidationslicegamestatus =quizvalidationslice.gamestatus
  const quizslice= useSelector((state) => state.quizslice);
  const loadingquizslice=quizslice.loading

 
  if ( isLoading || loading ) {    return (  <div>    <Loader />   </div>  );}
 
  if (user && user.isactive == 0) {
    optiontoastr();
     toastr.info("your acount not active now we will let you active and let you know");
     return <Navigate to="/" replace />;
 
  }
  if (!isAuthenticated) {
    optiontoastr();
    toastr.info("please login to access ");
    return <Navigate to="/login" replace />;
  }

  if (gamestatus=="finishgame1") {
    optiontoastr();
    toastr.info("you are finish all aprontisage quiz");
    return <Navigate to="/dasboard" replace />;
  }

  if (quizvalidationslicegamestatus=="finishgame2validation") {
     toastr.info("you are finish all validation  quiz");
    return <Navigate to="/finalegame" replace />;
  }

  
   
  return    children ? children : <Outlet />;


};

// Active  user


// Activeuservalidation

export const Activeuservalidation = ({ children }) => {
 
  const { user, isAuthenticated, isLoading, errors } = useSelector( (state) => state.loginslice);
  const { myuser_score, quiztokenstatus, scoredif, loading } = useSelector(   (state) => state.profileslice);


  const { gamestatus} = useSelector((state) => state.quizslice);
  const { nextQuizPartv ,questions ,error} = useSelector((state) => state.quizvalidationslice);
  const quizvalidationslice = useSelector((state) => state.quizvalidationslice);

  const quizvalidationsliceloading =quizvalidationslice.loading;
  const quizvalidationslicegamestatus =quizvalidationslice.gamestatus
  const quizslice= useSelector((state) => state.quizslice);
  const loadingquizslice=quizslice.loading

 
  if ( isLoading || loading ) {    return (  <div>    <Loader />   </div>  );}
 
  if (user && user.isactive == 0) {
    optiontoastr();
     toastr.info("your acount not active now we will let you active and let you know");
     return <Navigate to="/" replace />;
 
  }
  if (!isAuthenticated) {
    optiontoastr();
    toastr.info("please login to access ");
    return <Navigate to="/login" replace />;
  }

  

  if (quizvalidationslicegamestatus=="finishgame2validation") {
     toastr.info("you are finish all validation  quiz");
    return <Navigate to="/finalegame" replace />;
  }

  
   
  return    children ? children : <Outlet />;


};


// fin Activeuservalidation
export const Admineuser = ({ children }) => {
  const { user, isAuthenticated, isLoading, errors } = useSelector( (state) => state.loginslice);
  const { myuser_score, quiztokenstatus, scoredif, loading } = useSelector(   (state) => state.profileslice);

  if (isLoading || loading) {    return (  <div>    <Loader />   </div>  );}
  if (user && user.isadmin == 0) {
    optiontoastr();
    toastr.error("you are not allow to access this page");
    return <Navigate to="/" replace />;
  }
  if (!isAuthenticated) {
    optiontoastr();
    toastr.info("please login to access ");
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

//toastr option
const optiontoastr = () => {
  return (toastr.options = {
    closeButton: true,
    debug: false,
    timeOut: "0",
    extendedTimeOut: "0",
  });
};
