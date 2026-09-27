import { useEffect, useRef } from 'react';
import * as THREE from 'three';

function makeCoverTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 1024;
  const context = canvas.getContext('2d');

  const gradient = context.createLinearGradient(0, 0, 768, 1024);
  gradient.addColorStop(0, '#655238');
  gradient.addColorStop(0.32, '#493a26');
  gradient.addColorStop(0.7, '#382d1f');
  gradient.addColorStop(1, '#51432f');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  let seed = 81;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 14500; i += 1) {
    const alpha = random() * 0.12;
    context.fillStyle = random() > 0.52 ? `rgba(228, 207, 161, ${alpha})` : `rgba(12, 9, 5, ${alpha})`;
    context.fillRect(random() * canvas.width, random() * canvas.height, random() * 3 + 0.3, random() * 3 + 0.3);
  }

  context.strokeStyle = 'rgba(202, 174, 119, .64)';
  context.lineWidth = 3;
  context.strokeRect(47, 45, 674, 934);
  context.strokeStyle = 'rgba(202, 174, 119, .31)';
  context.lineWidth = 1;
  context.strokeRect(61, 59, 646, 906);

  context.fillStyle = '#d7c49b';
  context.textAlign = 'center';
  context.font = '500 20px "DM Sans", sans-serif';
  context.letterSpacing = '8px';
  context.fillText('A PERSONAL COLLECTION', 384, 230);
  context.strokeStyle = 'rgba(203, 176, 125, .8)';
  context.lineWidth = 2;
  context.beginPath();
  context.moveTo(334, 285);
  context.lineTo(434, 285);
  context.stroke();

  context.fillStyle = '#ead9b7';
  context.font = '400 126px "IM Fell English", Georgia, serif';
  context.letterSpacing = '-4px';
  context.fillText('The Making', 384, 450);
  context.fillText('of Things', 384, 580);
  context.font = 'italic 400 73px "Cormorant Garamond", Georgia, serif';
  context.fillStyle = '#cbb184';
  context.fillText('a life in chapters', 384, 670);

  context.font = '500 17px "DM Sans", sans-serif';
  context.letterSpacing = '5px';
  context.fillStyle = '#d7c49b';
  context.textAlign = 'left';
  context.fillText('AKARSHANA', 88, 916);
  context.textAlign = 'right';
  context.fillText('VOL. I · 2025', 680, 916);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 8;
  return texture;
}

export default function BookScene({ onOpen, isOpen }) {
  const containerRef = useRef(null);
  const openRef = useRef(onOpen);
  const stateRef = useRef(isOpen);
  const isOpenRef = useRef(isOpen);

  useEffect(() => {
    openRef.current = onOpen;
  }, [onOpen]);

  useEffect(() => {
    stateRef.current = isOpen;
  }, [isOpen]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.set(0, 0, 8.4);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    renderer.domElement.setAttribute('aria-label', 'Interactive 3D gothic leather book. Click to open.');
    renderer.domElement.setAttribute('role', 'button');
    renderer.domElement.tabIndex = 0;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xd6c4a2, 2.2));
    const keyLight = new THREE.DirectionalLight(0xffdfa9, 5.0);
    keyLight.position.set(-3.5, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x9a6e34, 35, 14);
    rimLight.position.set(4, 1.5, 2.5);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0xeee4ce, 13, 14);
    fillLight.position.set(-4, -2, 3);
    scene.add(fillLight);

    const book = new THREE.Group();
    scene.add(book);

    const coverTexture = makeCoverTexture();
    const cover = new THREE.Mesh(
      new THREE.BoxGeometry(2.5, 3.35, 0.28),
      [
        new THREE.MeshStandardMaterial({ color: '#51422d', roughness: 0.74 }),
        new THREE.MeshStandardMaterial({ color: '#423522', roughness: 0.8 }),
        new THREE.MeshStandardMaterial({ color: '#362b1d', roughness: 0.82 }),
        new THREE.MeshStandardMaterial({ color: '#493b27', roughness: 0.77 }),
        new THREE.MeshStandardMaterial({ map: coverTexture, color: '#d5c19b', roughness: 0.78, metalness: 0.04 }),
        new THREE.MeshStandardMaterial({ color: '#55452f', roughness: 0.75 }),
      ],
    );
    book.add(cover);

    const pages = new THREE.Mesh(
      new THREE.BoxGeometry(2.43, 3.26, 0.2),
      new THREE.MeshStandardMaterial({ color: '#d4c6aa', roughness: 0.94 }),
    );
    pages.position.z = -0.2;
    book.add(pages);

    const spine = new THREE.Mesh(
      new THREE.BoxGeometry(0.21, 3.35, 0.31),
      new THREE.MeshStandardMaterial({ color: '#302518', roughness: 0.67, metalness: 0.04 }),
    );
    spine.position.x = -1.15;
    book.add(spine);

    const gold = new THREE.MeshStandardMaterial({ color: '#aa8c55', metalness: 0.62, roughness: 0.34 });
    [-1.41, -1.28, 1.28, 1.41].forEach((y) => {
      const band = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.018, 0.012), gold);
      band.position.set(-1.15, y, 0.167);
      book.add(band);
    });

    const bookBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.23, 2.33, 0.11, 64),
      new THREE.MeshStandardMaterial({ color: '#17140f', roughness: 0.89 }),
    );
    bookBase.rotation.x = -Math.PI / 2;
    bookBase.position.y = -2.04;
    bookBase.scale.set(1.13, 0.5, 1);
    scene.add(bookBase);

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(4, 64),
      new THREE.MeshBasicMaterial({ color: '#100f0c', transparent: true, opacity: 0.78 }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2.105;
    scene.add(ground);

    const resize = () => {
      const width = Math.max(container.clientWidth, 1);
      const height = Math.max(container.clientHeight, 1);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 560 ? 9.2 : 8.4;
      camera.updateProjectionMatrix();
    };
    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onPointerMove = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      renderer.domElement.style.cursor = raycaster.intersectObject(cover).length ? 'pointer' : 'grab';
    };
    const activate = () => {
      if (!stateRef.current) openRef.current();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    };
    const onClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      if (raycaster.intersectObject(cover).length) activate();
    };
    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('keydown', onKeyDown);

    const clock = new THREE.Clock();
    const targetRotation = new THREE.Vector2(-0.04, -0.18);
    const frame = () => {
      const time = clock.getElapsedTime();
      if (!isOpenRef.current) {
        book.rotation.x += (targetRotation.x - book.rotation.x) * 0.035;
        book.rotation.y += (targetRotation.y + Math.sin(time * 0.43) * 0.035 - book.rotation.y) * 0.028;
        book.rotation.z += (Math.sin(time * 0.52) * 0.025 - book.rotation.z) * 0.025;
        book.position.y = Math.sin(time * 0.8) * 0.045;
        book.position.x += (0.02 - book.position.x) * 0.025;
      } else {
        book.rotation.y += (-0.04 - book.rotation.y) * 0.025;
        book.position.x += (0 - book.position.x) * 0.025;
      }
      renderer.render(scene, camera);
    };
    renderer.setAnimationLoop(frame);

    return () => {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('keydown', onKeyDown);
      coverTexture.dispose();
      scene.traverse((object) => {
        if (object.isMesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
          else object.material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className={`book-canvas ${isOpen ? 'book-canvas-open' : ''}`} ref={containerRef} />;
}
