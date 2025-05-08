'use client';

import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader, GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface ProductModelViewerProps {
  modelUrl: string;
  materialColor?: string;
  className?: string;
}

const ProductModelViewer: React.FC<ProductModelViewerProps> = ({ 
  modelUrl, 
  materialColor = '#ffffff',
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Set up scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f5);
    
    // Set up camera
    const camera = new THREE.PerspectiveCamera(
      50, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 5;
    
    // Set up renderer with anti-aliasing for smoother edges
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    containerRef.current.appendChild(renderer.domElement);
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Add orbit controls for interaction
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxDistance = 10;
    controls.minDistance = 2;
    
    // Load the 3D model
    const loader = new GLTFLoader();
    
    let model: THREE.Group;
    
    loader.load(
      modelUrl,
      (gltf: GLTF) => {
        model = gltf.scene;
        
        // Apply material color if specified
        if (materialColor) {
          model.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              child.material = new THREE.MeshStandardMaterial({
                color: new THREE.Color(materialColor),
                roughness: 0.5,
                metalness: 0.2
              });
            }
          });
        }
        
        // Center the model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        
        // Add model to scene
        scene.add(model);
        setLoading(false);
      },
      (xhr: ProgressEvent) => {
        // Progress callback
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (error: ErrorEvent) => {
        // Error callback
        console.error('An error happened loading the model:', error);
        setError('Failed to load 3D model. Please try again later.');
        setLoading(false);
      }
    );
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Clean up
    return () => {
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [modelUrl, materialColor]);
  
  return (
    <div className={`relative ${className}`}>
      <div 
        ref={containerRef} 
        className="w-full h-full min-h-[300px] rounded-lg overflow-hidden"
      >
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="text-red-500 text-center p-4">{error}</div>
          </div>
        )}
      </div>
      <div className="absolute bottom-4 left-4 text-xs text-gray-500">
        Drag to rotate • Scroll to zoom
      </div>
    </div>
  );
};

export default ProductModelViewer; 