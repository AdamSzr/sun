
// drive errors -> from 10_000 to 19_999 drive errors

export const apiErrors = {
  // AUTH
  0: 'USER NOT FOUND',
    
    
  // 
  400: 'Validation error',
  401: 'Unauthorized',

  // 
  500:`Unknown error`,
  501:`Exception occured`,
  // DRIVE
  10000: "Query parameter ?path= is not provided",
  10001: "Requested path directs to directory. Use ?list=true to list directory.",
  10002: "Requested path does not exist.",
  10003: "Under this path does not exist specyfied resources, go back to upper dir and list files",
  10004: "Correct size format should be ?size=50x50",
  10005: "Cannot create existing element",
  10006: "Cannot create directory",
  // TODO-APP
  20000:"No id specyfied",
  // REDIS
  30000:"No item to delete",
  30001:"No Key provided",
  30002:"No item under specyfied key"
} as const;
