import ManagementApp from './ManagementApp';
import { AuthProvider } from './context/AuthContext';

function App() {

  return (
    <AuthProvider>
      <ManagementApp />
    </AuthProvider>
  )
}

export default App
