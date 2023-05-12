import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/navigation';

function Home() {
  const { push } = useRouter()
  const [user, setUser] = useState([])
  const [rows, setRows] = useState([])

  useEffect(() => {
    const getUser = async () => {
      const { data, error } = await supabase.auth.getSession()

      return data.session
    }

    getUser().then((session) => {
      if (!session)
        push('/signin')

      setUser(session)
    })
  }, [])

  const getRows = async () => {
    const { data } = await supabase
      .from(user?.user?.user_metadata?.dept)
      .select()

    setRows(data)
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) push('/signin')
  }

  return (
    <>
      <div className="navbar bg-base-300 flex justify-between">
        <span className="btn btn-ghost normal-case text-xl">Supply Chain</span>
        <button className="btn btn-error btn-outline btn-xs" onClick={signOut}>
          Sign Out
        </button>
      </div>
      <div className='m-4'>
        <div className='flex justify-center space-x-3'>
          <h2 className="text-2xl font-bold text-center">Department: {user?.user?.user_metadata?.dept}</h2>
          <button onClick={getRows} className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-2 rounded focus:outline-none focus:shadow-outline'>Get Rows</button>
        </div>
        {rows?.map(row =>
          <div key={row.id} className="mx-auto my-4 py-4 card card-compact max-w-6xl bg-base-300 shadow-xl">
            <div className="card-body">
              <h2 className="!text-center text-4xl font-bold">{row.item}</h2>
              <div className='stats stats-vertical lg:stats-horizontal'>
                {Object.entries(row).map((r, i) => <div key={i} className='stat'><span className='stat-title'>{r[0]}</span><span className='stat-value'>{r[1]}</span></div>)}</div>
            </div>
          </div>
        )
        }
      </div>
    </>
  )
}

export default Home