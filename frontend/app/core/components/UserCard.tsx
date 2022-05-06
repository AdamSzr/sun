import { Router, Routes } from "blitz"

type UserProps = {
  name: string
  url: string
  onClickCb: (name) =>void
}

export function UserCard(props: UserProps) {

  return (
    <div className="userPanelItem" onClick={() => props.onClickCb(props.name)}>
      <img src={props.url} className="image" />
      <p className="name">{props.name}</p>
    </div>
  )
}

export default UserCard
