const navLinkStyle = ({ isActive, isPending, isTransitioning }) => {
    return {
      fontWeight: isActive ? "bold" : "",
      color: isPending ? "red" : "black",
      viewTransitionName: isTransitioning ? "slide" : "",
      borderStartStartRadius: isActive ? "20%" : "",
      borderStartEndRadius: isActive ? "20%" : "",
      backgroundColor: isActive ? "#08457e" : "",
    };
  };
export default  navLinkStyle