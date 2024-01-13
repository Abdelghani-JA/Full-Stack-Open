import PropTypes from 'prop-types'
import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const buttonDisplay = { display: visible ? 'none': '' }
  const formDisplay = { display: visible ? '' : 'none' , border:'solid 2px black', margin:'5px', padding:'5px' }

  const handleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({ handleVisibility }))
  return (
    <>
      <div style={buttonDisplay}>
        <button onClick={handleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={formDisplay}>
        {props.children}
        <button onClick={handleVisibility}>Cancel</button>
      </div>
    </>
  )
})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}


export default Togglable