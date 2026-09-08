import { Suspense, lazy } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LoadingState from './components/common/LoadingState';

const Beranda = lazy(() => import('./pages/Beranda'));
const Peta = lazy(() => import('./pages/Peta'));
const DetailLahan = lazy(() => import('./pages/DetailLahan'));
const MRV = lazy(() => import('./pages/MRV'));
const Berita = lazy(() => import('./pages/Berita'));
const DetailBerita = lazy(() => import('./pages/DetailBerita'));
const Program = lazy(() => import('./pages/Program'));
const Kontak = lazy(() => import('./pages/Kontak'));

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

function Layout({ children, hideFooter }) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<div style={{ paddingTop: 140 }}><LoadingState /></div>}>
        {children}
      </Suspense>
      {!hideFooter && <Footer />}
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Beranda />
            </motion.div>
          </Layout>
        } />
        <Route path="/peta" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Peta />
            </motion.div>
          </Layout>
        } />
        <Route path="/peta/:id" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <DetailLahan />
            </motion.div>
          </Layout>
        } />
        <Route path="/mrv" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <MRV />
            </motion.div>
          </Layout>
        } />
        <Route path="/berita" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Berita />
            </motion.div>
          </Layout>
        } />
        <Route path="/berita/:id" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <DetailBerita />
            </motion.div>
          </Layout>
        } />
        <Route path="/program" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Program />
            </motion.div>
          </Layout>
        } />
        <Route path="/kontak" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Kontak />
            </motion.div>
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <motion.div
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              <Beranda />
            </motion.div>
          </Layout>
        } />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AnimatedRoutes />
    </HashRouter>
  );
}
