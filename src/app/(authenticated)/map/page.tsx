import PathMap from "./PathMap"

export default async function MapPage() {

  return (
    <div>
      <PathMap path={{ id:1, name:`test`, userId:1 }} cords={[]} />
    </div>
  )
}
