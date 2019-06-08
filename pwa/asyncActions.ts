/** Redux helper */
export default function asyncActions(NAME) {
  return {
    FAILURE: `${NAME}_FAILURE`,
    REQUEST: `${NAME}_REQUEST`,
    SUCCESS: `${NAME}_SUCCESS`,
  }
}
