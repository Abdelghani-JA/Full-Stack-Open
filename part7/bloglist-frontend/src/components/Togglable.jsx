import PropTypes from 'prop-types';
import { useState, useImperativeHandle, forwardRef } from 'react';

const Togglable = forwardRef((props, ref) => {
  {
    /* Deprecated!
     in react 19 ref is available as prop without using forwardRef 
     https://react.dev/blog/2024/12/05/react-19#ref-as-a-prop
     */
  }
  const [visible, setVisible] = useState(false);
  const buttonDisplay = { display: visible ? 'none' : '' };
  const formDisplay = {
    display: visible ? '' : 'none'
  };

  const handleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(ref, () => ({ handleVisibility }));

  return (
    <>
      <button
        style={buttonDisplay}
        onClick={handleVisibility}
        className={props.class}
      >
        {props.buttonLabel}
      </button>
      <div
        style={formDisplay}
        className={
          'togglable fixed left-0 top-0 flex h-full w-full flex-col items-center justify-center bg-[rgba(0,0,0,0.432)] p-4'
        }
      >
        <div className="toggledContent rounded-lg/xl w-9/10 bg-white p-[1rem]">
          {props.children}
          <button
            onClick={handleVisibility}
            className={
              'cancelTogglable bg-button mt-[0.5rem] cursor-pointer rounded-sm border-none p-[0.1rem_1rem] text-[1.2rem] text-white hover:bg-[#a71f41] hover:outline-none focus:bg-[#a71f41] focus:outline-none '
            }
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
});

Togglable.displayName = 'Togglable';
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
