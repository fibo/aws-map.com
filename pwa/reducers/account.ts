import {
  IAccountCredentials,
  IAuthentication,
} from "../../api/account"

import asyncActions from "../asyncActions"
import * as client from "../client"

export const CHECK_AUTHENTICATION = "CHECK_AUTHENTICATION"
export const CREATE_ACCOUNT = asyncActions("CREATE_ACCOUNT")
export const ENTER_ACCOUNT = asyncActions("ENTER_ACCOUNT")
export const EXIT_ACCOUNT = "EXIT_ACCOUNT"

interface IAccountState {
  authentication: IAuthentication | null
  isCreating: boolean
  isEntering: boolean
}

export const initialState: IAccountState = {
  authentication: null,
  isCreating: false,
  isEntering: false,
}

export function createAccount(credentials: IAccountCredentials) {
  const { FAILURE, SUCCESS, REQUEST } = CREATE_ACCOUNT

  return (dispatch) => {
    dispatch({ type: REQUEST })

    client.post("/account", credentials).then(
      () => dispatch({ type: SUCCESS }),
      (error) => dispatch({ error: client.parseError(error), type: FAILURE }),
    )
  }
}

export function enterAccount(credentials: IAccountCredentials) {
  const { FAILURE, SUCCESS, REQUEST } = ENTER_ACCOUNT

  return (dispatch) => {
    dispatch({ type: REQUEST })

    client.post("/enter", credentials).then(
      (data) => dispatch({ data, type: SUCCESS }),
      (error) => dispatch({ error: client.parseError(error), type: FAILURE }),
    )
  }
}

export function exitAccount() { return { type: EXIT_ACCOUNT } }

export default function(state = initialState, action) {
  switch (action.type) {
    case ENTER_ACCOUNT.FAILURE:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          error: action.error,
        },
        isEntering: false,
      }

    case ENTER_ACCOUNT.REQUEST:
      return {
        ...state,
        authentication: {
          ...state.authentication,
          error: null,
        },
        isEntering: true,
      }

    case ENTER_ACCOUNT.SUCCESS:
      return {
        ...state,
        authentication: {
          ...action.data,
          isValid: true,
        },
        isEntering: false,
      }

    case CHECK_AUTHENTICATION:
      return {
        ...state,
        authentication: {
          ...action.data
        }
      }

    case CREATE_ACCOUNT.FAILURE:
      return {
        ...state,
        authentication: {
          error: action.error,
          isValid: false,
        },
        isCreating: false,
      }

    case CREATE_ACCOUNT.REQUEST:
      return {
        ...state,
        authentication: {
          error: null,
          isValid: false,
        },
        isCreating: true,
      }

    case CREATE_ACCOUNT.SUCCESS:
      return {
        ...state,
        authentication: {
          error: null,
          isValid: false,
        },
        isCreating: false,
      }

    case EXIT_ACCOUNT:
      return initialState

    default: return state
  }
}
