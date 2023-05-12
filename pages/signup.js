import Link from "next/link"
import { useState } from "react"
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation';

function signup() {
  const { push } = useRouter()
  const [details, setDetails] = useState({ dept: "fabrication", email: "", password: "" })

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value })
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp(
      {
        email: details.email,
        password: details.password,
        options: {
          data: {
            dept: details.dept,
          }
        }
      }
    )

    if (!error) push('/')
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Department
            </label>
            <select className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="dept" value={details.dept} onChange={handleChange}>
              <option>fabrication</option>
              <option>sub_assembly</option>
              <option>assembly</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="Email Address" value={details.email} onChange={handleChange} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" value={details.password} onChange={handleChange} />
          </div>
          <div className="flex items-center justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={signUp}>
              Register
            </button>
            <Link className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/signin">
              Sign In instead
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default signup