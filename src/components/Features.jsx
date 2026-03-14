
import StudioLights from '../components/three/StudioLights'
import { features } from '../constants'
import clsx from 'clsx'
import { Canvas } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'
import { useMediaQuery } from 'react-responsive'
import Macbook from './models/Macbook'
import useMacBookStore from '../store'
import { useGSAP } from '@gsap/react'
import { featureSequence } from '../constants'
import gsap from 'gsap'
const Features = () => {
  const ModelScroll =()=>{
    const groupRef = useRef(null);
    const isMobile = useMediaQuery({query:"(max-width:1024px)"})
    const {setTexture} = useMacBookStore();

     useEffect(()=>{
      featureSequence.forEach((feature) => {
        const v = document.createElement("video");
        Object.assign(v,{
          src: feature.videoPath,
          muted:true,
          playsInline:true,
          preLoad: 'auto',
          crossOrigin: 'anonymous',
        });
        v.load()
      });
     })
      useGSAP(()=>{
        const modelTimeline = gsap.timeline({
          scrollTrigger:{
            trigger:'#f-canvas',
            start:'top top',
            end:'bottom top',
            scrub:1,
            pin:true
          }
        });

        const timeline = gsap.timeline({
           scrollTrigger:{
            trigger:'#f-canvas',
            start:'top center',
            end:'bottom top',
            scrub:1,
           
          }
        })
         if(groupRef.current){
           modelTimeline.to(groupRef.current.rotation,{y:Math.PI*2,ease:'Power1.inOut'})
         }
       
         timeline
         .call(()=>setTexture('/videos/feature-1.mp4'))
         .to('.box1',{opacity:1, y:0, delay:1})

          .call(()=>setTexture('/videos/feature-2.mp4'))
         .to('.box2',{opacity:1, y:0,})

          .call(()=>setTexture('/videos/feature-3.mp4'))
         .to('.box3',{opacity:1, y:0,})

          .call(()=>setTexture('/videos/feature-4.mp4'))
         .to('.box4',{opacity:1, y:0,})

          .call(()=>setTexture('/videos/feature-5.mp4'))
         .to('.box5',{opacity:1, y:0,})

  },[])

   return(
     <group ref={groupRef}>
     <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
       <Macbook scale={isMobile ? 0.05 : 0.08} position={[0,-1,0]}/>
     </Suspense>
    </group>
   )
  }
  return (
    <section id="features">
      <h2>see it all in new light.</h2>
      <Canvas id="f-canvas" camera={{}}>
         <StudioLights />
         <ambientLight intensity={0.5}/>
         <ModelScroll />
      </Canvas>
      <div className='absolute inset-0'>
        {features.map((feature,index)=>(
          <div key={index} className={clsx('box',`box${index + 1}`, feature.styles)}>
          <img src={feature.icon} alt={feature.highlight} />
          <p> 
            <span className='text-white'>{feature.highlight}</span>
            {feature.text}
          </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features