import useMacBookStore from "../store"
import { clsx } from "clsx"
import {Canvas} from '@react-three/fiber'
import StudioLights from "./three/StudioLights"
import ModelSwitcher from "./three/ModelSwitcher"
import { useMediaQuery } from "react-responsive"
const ProductViewer = () => {
    const {scale,color, setColor,setScale} = useMacBookStore()
    const isMobile = useMediaQuery({query:"(max-width:1024px)"})
  return (
    <section id='product-viewer'>
        <h2>Take a clouser look.</h2>
        <div className='controls'>
            <p>MacbookPro now available in Size 14" & 16" in Colors Space Black & Silver</p>
            <div className='flex-center gap-5 mt-5'>

              <div className='color-control'>
                <div onClick={()=>setColor('#adb5bd')} 
                className={clsx('bg-neutral-300', color=='#adb5bd'&& 'active')} />

               <div onClick={()=>setColor('#2e2c2e')} 
                className={clsx('bg-neutral-900', color=='#2e2c2e'&& 'active')} />

              </div>
            <div className='size-control'>

              <div onClick={()=>setScale(0.06)} 
                className={clsx(scale===0.06?'bg-white text-black':'bg-transparent text-white')} >
                    <p>14"</p>
             </div>

              <div onClick={()=>setScale(0.08)} 
                className={clsx(scale===0.08?'bg-white text-black':'bg-transparent text-white')} >
                    <p>16"</p>
             </div>

                </div>  
            </div>
        </div>
       <Canvas id="canvas">
        <StudioLights />
         
      <ModelSwitcher scale={isMobile? scale-0.03: scale} />
       </Canvas>
    </section>
  )
}

export default ProductViewer