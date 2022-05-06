import { useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <div>

    </div>
  )
}

SignupPage.redirectAuthenticatedTo = "/"
SignupPage.getLayout = (page) => <Layout title="Sign Up">{page}</Layout>

export default SignupPage
