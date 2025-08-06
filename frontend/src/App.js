import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import ThemeToggle from './components/ThemeToggle';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Publications from './components/Publications';
import Awards from './components/Awards';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="App min-h-screen bg-white dark:bg-slate-900 text-gray-900 dark:text-white transition-colors duration-300">
        <BrowserRouter>
          <Navigation />
          <ThemeToggle />
          
          <Routes>
            <Route path="/" element={
              <>
                <main id="home">
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Experience />
                  <Publications />
                  <Awards />
                  <Contact />
                </main>
                <Footer />
              </>
            } />
          </Routes>
          
          <Toaster />
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;