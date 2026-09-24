import { useState } from 'react'
import { SmoothScroller } from './components/layout/SmoothScroller'
import { CustomCursor } from './components/ui/CustomCursor'
import { CartDrawer } from './components/ui/CartDrawer'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Story } from './components/sections/Story'
import { TheCraft } from './components/sections/TheCraft'
import { OurBlends } from './components/sections/OurBlends'
import { FeaturedDrink } from './components/sections/FeaturedDrink'
import { Experience3D } from './components/sections/Experience3D'
import { TheRitual } from './components/sections/TheRitual'
import { CafeExperience } from './components/sections/CafeExperience'
import { Testimonials } from './components/sections/Testimonials'
import { Location } from './components/sections/Location'
import { Experience } from './components/sections/Experience'
import { Footer } from './components/layout/Footer'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <SmoothScroller>
      <CustomCursor />
      <CartDrawer />
      <LoadingScreen onComplete={() => setIsLoading(false)} />
      
      {!isLoading && (
        <>
          <Navbar />
          <main className="w-full min-h-screen">
            <Hero />
            <Story />
            <TheCraft />
            <OurBlends />
            <FeaturedDrink />
            <Experience3D />
            <TheRitual />
            <CafeExperience />
            <Testimonials />
            <Location />
            <Experience />
          </main>
          <Footer />
        </>
      )}
    </SmoothScroller>
  )
}

export default App
