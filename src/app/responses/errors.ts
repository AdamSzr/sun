
// drive errors -> from 10_000 to 19_999 drive errors

export const apiErrors = {
    500:`Unknown error`,
    501:`Exception occured`,
    10000: "Query parameter ?path= is not provided",
    10001: "Requested path directs to directory. Use ?list=true to list directory.",
    10002: "Requested path does not exist.",
    10003: "Under this path does not exist specyfied resources, go back to upper dir and list files",
    10004: "Correct size format should be ?size=50x50"
} as const
