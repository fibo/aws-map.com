/* global localStorage */
import {
  CHECK_AUTHENTICATION,
  ENTER_ACCOUNT,
  EXIT_ACCOUNT,
} from "../reducers/account"

export default function localStorageMiddleware() {
   return (next) => (action) => {
     switch (action.type) {
       case ENTER_ACCOUNT.SUCCESS:
         try {
           localStorage.setItem("authentication", JSON.stringify(action.data))
         } catch (error) {
           console.error(error)
         }

         return next(action)

       case CHECK_AUTHENTICATION:
         try {
           const storedAuthentication = localStorage.getItem("authentication")

           if (storedAuthentication) {
             const authentication = JSON.parse(storedAuthentication)

             const {
               expiresAt,
               token,
             } = authentication

             // Check if authentication has expired.
             if (expiresAt) {
               const now = new Date()

               const expireDate = new Date(expiresAt)

               const hasExpired = now.getTime() > expireDate.getTime()

               if (hasExpired) {
                 // Remove authentication if expired.
                 localStorage.removeItem("authentication")
               }

               return next({
                 ...action,
                 data: {
                   expiresAt,
                   hasExpired,
                   isValid: true,
                   token,
                 }
               })
             } else {
               // If there is no `expiresAt` attribute, assume it is expired.
               return next({
                 ...action,
                 data: {
                   hasExpired: true,
                   isValid: false,
                 }
               })
             }
           } else {
            return next({
              ...action,
              data: {
                isValid: false,
              }
            })
           }
         } catch (ignore) {
           return next({
             ...action,
             data: {
               isValid: false,
             }
           })
         }

       case EXIT_ACCOUNT:
         localStorage.removeItem("authentication")

         return next(action)

       default: return next(action)
     }
   }
}
