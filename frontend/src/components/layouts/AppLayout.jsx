/* eslint-disable react/display-name */

import Header from "../header/Header"
import Title from "../shared/Title"

const AppLayout = () => (WrappedComponent) => {
return (props)=>{
    return (
        <>
        <Title title={"Chat app"} description={"This is description"} />
            <Header />
            <WrappedComponent {...props} />
            <footer>Footer</footer>
        </>
    )
}
}

export default AppLayout