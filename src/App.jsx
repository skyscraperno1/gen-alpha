import { useEffect } from 'react'
import { initAntiDebug } from '@/lib/antidebugger'
import { NavBar } from '@/components/NavBar';
import PageOne from '@/pages/PageOne'
import PageTwo from '@/pages/PageTwo'
import { ScrollCircle } from '@/components/ScrollCircle'; 
function App() {
  useEffect(() => {
    // 生产环境下不允许打开devtools
    if (import.meta.env.PROD) {
      initAntiDebug();
    }
  }, []);

  return (
    <div className="min-h-screen max-w-screen">
      <ScrollCircle />
      <NavBar />
      <PageOne />
      <PageTwo />
    </div>
  )
}

export default App
