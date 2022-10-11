import React from 'react'
import { ACTIONS } from './App'
const Operationbutton = ({ dispatch, operation }) => {
  return (
    <button
      className="py-2 px-3 text-xl bg-slate-400 hover:bg-slate-500 text-white"
      onClick={() =>
        dispatch({ type: ACTIONS.OPERATIONS, payload: { operation } })
      }
    >
      {operation}
    </button>
  )
}

export default Operationbutton
