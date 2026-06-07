import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise3D } from 'simplex-noise';

const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.015); // Deep fog to fade out edges
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    // 1. Noise Wireframe Grid (Apple M-chip style)
    const planeGeometry = new THREE.PlaneGeometry(120, 120, 60, 60);
    const planeMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x666666, // Brighter color
      wireframe: true,
      transparent: true,
      opacity: 0.35    // Higher opacity
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -8;
    scene.add(plane);

    // 2. Floating Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 800;
    const posArray = new Float32Array(particlesCount * 3);
    
    for(let i = 0; i < particlesCount * 3; i++) {
        posArray[i] = (Math.random() - 0.5) * 80;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.06,
        color: 0x86868b,
        transparent: true,
        opacity: 0.3,
        blending: THREE.AdditiveBlending
    });
    
    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 15;
    camera.position.y = 2;

    // Animation Logic
    const noise3D = createNoise3D();
    let time = 0;
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event: MouseEvent) => {
        mouseX = (event.clientX - windowHalfX) * 0.02;
        mouseY = (event.clientY - windowHalfY) * 0.02;
    };
    
    const onScroll = () => {
        scrollY = window.scrollY;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);
    window.addEventListener('scroll', onScroll);

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.0015;

      // Parallax camera on mouse move and scroll
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - (scrollY * 0.005) + 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Distort plane with simplex noise
      const positionAttribute = planeGeometry.attributes.position;
      const vertex = new THREE.Vector3();
      for (let i = 0; i < positionAttribute.count; i++) {
        vertex.fromBufferAttribute(positionAttribute, i);
        // Distort along Z axis of the geometry (which is Y in world space)
        const dist = noise3D(vertex.x * 0.025, vertex.y * 0.025, time * 0.8);
        positionAttribute.setZ(i, dist * 6); // Increased amplitude from 3 to 6
      }
      planeGeometry.attributes.position.needsUpdate = true;

      // Gently rotate particles
      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.02;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      window.removeEventListener('scroll', onScroll);
      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      planeGeometry.dispose();
      planeMaterial.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="webgl-canvas" />;
};

export default ThreeBackground;
