import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User } from "db"

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    PublicData: {
      userId: User["id"]
      name: User["name"]
      directory: User["dirName"]
    }
  }
}
