import React from 'react'
import { ACTIONS } from './App'
const Digitbutton = ({ dispatch, digit }) => (
  <button
    className="py-2 px-3 text-xl bg-slate-400 hover:bg-slate-500 text-white"
    onClick={() => dispatch({ type: ACTIONS.ADD_DIGIT, payload: { digit } })}
  >
    {digit}
  </button>
)

export default Digitbutton
