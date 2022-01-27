import React  from 'react';
import PropTypes from 'prop-types'

const Button = ({color, text, onclick}) => {
    
    return(<button onClick={onclick}
        style={{backgroundColor: color}} 
        className='btnn' >{text}</button>)
}
Button.defaultProps= {
    color: 'steelblue'
}
Button.prototypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onclick: PropTypes.string.func
}
export default Button