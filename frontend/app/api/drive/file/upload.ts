import { DRIVE_ROOT_DIR } from "app/settings/global"
import { BlitzApiHandler } from "blitz"
import multer from "multer"
import { RequestHandler, Request, Response } from "express"

const storage = multer.diskStorage({
  destination: DRIVE_ROOT_DIR,
})

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, DRIVE_ROOT_DIR)
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)
//     cb(null, file.fieldname + "-" + uniqueSuffix)
//   },
// })

const upload = multer({ storage }).array("items")

// app.post("/stats", upload.single("uploaded_file"), function (req, res) {
//   // req.file is the name of your file in the form above, here 'uploaded_file'
//   // req.body will hold the text fields, if there were any
//   console.log(req.file, req.body)
// })

const handler = (req: Request, res: Response) => {
  upload(req, res, () => {})
}
export default handler
