import React from 'react';
import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom';
import Button from './Button'
const Header = ({title,onAdd,showAdd}) => {
    
    const location = useLocation()
    return (
      <header className='header ' >
            <h1 >{title}</h1>
            {(location.pathname ==='/' ) && (<Button 
            color={showAdd?'red':'green'} 
            text={showAdd?'close':'Add'} 
            onclick ={onAdd} />)}

        </header>
        
    )
}
Header.defaultProps = {
    title:'Hello Task !!'
}
Header.propTypes = {
    title: PropTypes.string.isRequired
}
/*const headingStyle = {color: 'red',
                     background:'black'};*/
export default Header
