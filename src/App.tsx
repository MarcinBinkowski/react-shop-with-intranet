// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {Button} from "./components/ui/button.tsx";
import {ThemeProvider} from "./components/theme-provider.tsx";
import {ModeToggle} from "./components/mode-toggle.tsx";
import { Sidebar } from './components/ui/sidebar.tsx';

function App() {
  // const [count, setCount] = useState(0)
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            {/* <div className="flex flex-col items-center justify-center min-h-svh">
                <Button className="slate-50">Click me</Button>
                <ModeToggle />
            </div> */}
            <Sidebar></Sidebar>

        </ThemeProvider>
    )
}

export default App
