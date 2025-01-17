
import Hero from "./Hero"
const LandingPage = (props) =>{

    return(
        <>

        <Hero  mousePosition= {props.mousePosition} handleMouseMove={props.handleMouseMove} isMobile={props.isMobile} />


        
        
        </>
    )


}



export default LandingPage