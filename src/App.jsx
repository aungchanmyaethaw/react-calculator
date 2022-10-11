import React, { useReducer } from 'react'
import Digitbutton from './Digitbutton'
import Operationbutton from './Operationbutton'
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  RESET: 'reset',
  DELETE_DIGIT: 'delete-digit',
  OPERATIONS: 'operations',
  EVALUATE: 'evaluate',
}

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (state.overWrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overWrite: false,
        }
      }
      if (state.currentOperand === '0' && payload.digit === '0') {
        return state
      }
      if (
        typeof state.currentOperand !== 'undefined' &&
        payload.digit === '.' &&
        state.currentOperand.includes('.')
      ) {
        return state
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
      }
    case ACTIONS.RESET:
      return {}
    case ACTIONS.OPERATIONS:
      if (state.previousOperand == null && state.currentOperand == null) {
        return state
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        }
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          previousOperand: state.currentOperand,
          operation: payload.operation,
          currentOperand: null,
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      }
    case ACTIONS.EVALUATE:
      if (
        state.currentOperand == null ||
        state.previousOperand == null ||
        state.operation == null
      ) {
        return state
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
        overWrite: true,
      }
    case ACTIONS.DELETE_DIGIT:
      if (state.overWrite) {
        return { ...state, currentOperand: null, overWrite: false }
      }
      if (state.currentOperand == null) {
        return state
      }
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) }
  }
}

function evaluate({ previousOperand, currentOperand, operation }) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  if (isNaN(prev) || isNaN(current)) {
    return ''
  }
  let result = ''

  switch (operation) {
    case '+':
      result = prev + current
      break
    case '-':
      result = prev - current
      break
    case '*':
      result = prev * current
      break
    case '÷':
      result = prev / current
      break
  }

  return result.toString()
}

const App = () => {
  const [{ previousOperand, currentOperand, operation }, dispatch] = useReducer(
    reducer,
    {},
  )

  return (
    <section className="container mx-auto px-4 max-w-[480px]">
      <div className="grid grid-cols-4 gap-1 p-4 bg-slate-300 mt-16 shadow-lg rounded-md">
        <div className="col-span-full py-4 px-2 bg-slate-700 mb-2 min-h-[6rem]">
          <div className="text-white text-xl">
            {previousOperand} {operation}
          </div>
          <div className="text-white text-2xl">{currentOperand}</div>
        </div>
        <button
          className="col-span-2 text-xl text-white bg-red-400 hover:bg-red-500"
          onClick={() => dispatch({ type: ACTIONS.RESET })}
        >
          AC
        </button>
        <button
          className="py-2 px-3 text-xl text-white bg-orange-400 hover:bg-orange-500"
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
        >
          DEL
        </button>
        <Operationbutton dispatch={dispatch} operation="÷" />
        <Digitbutton dispatch={dispatch} digit="1" />
        <Digitbutton dispatch={dispatch} digit="2" />
        <Digitbutton dispatch={dispatch} digit="3" />
        <Operationbutton dispatch={dispatch} operation="*" />
        <Digitbutton dispatch={dispatch} digit="4" />
        <Digitbutton dispatch={dispatch} digit="5" />
        <Digitbutton dispatch={dispatch} digit="6" />
        <Operationbutton dispatch={dispatch} operation="+" />
        <Digitbutton dispatch={dispatch} digit="7" />
        <Digitbutton dispatch={dispatch} digit="8" />
        <Digitbutton dispatch={dispatch} digit="9" />
        <Operationbutton dispatch={dispatch} operation="-" />
        <Digitbutton dispatch={dispatch} digit="." />
        <Digitbutton dispatch={dispatch} digit="0" />
        <button
          className="col-span-2 py-2 px-3 text-white text-lg bg-emerald-400 hover:bg-emerald-500"
          onClick={() => dispatch({ type: ACTIONS.EVALUATE })}
        >
          =
        </button>
      </div>
    </section>
  )
}

export default App
