import { useRef } from "react"
import { performanceImages, performanceImgPositions } from "../constants"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {

  const sectionRef = useRef(null)

  useGSAP(() => {

    const mm = gsap.matchMedia()

    gsap.set(".wrapper img:not(.p5)",{
      left:'50%',
      bottom:'20%',
      xPercent:-50,
      yPercent:-50,
    })

    // TEXT FADE + MOVE UP
    gsap.fromTo(".content p", {
      opacity: 0,
      y: 10,},

     { 
      opacity:1,
      y:-20,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
        scrub:true,
        invalidateOnRefresh: true,
      }
   }
  )

    // DESKTOP ONLY IMAGE TIMELINE
    mm.add("(min-width: 1025px)", () => {
        gsap.set(".wrapper img",{opacity:1})
      

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "center center",
          duration:2,
          scrub: true,
          invalidateOnRefresh: true,
         
        }
      })
       tl.to(".p1", { left: "20%", bottom: "-10%" }, 0);
      tl.to(".p2", { right: "17%", bottom: "20%"}, 0);
      tl.to(".p3", { right: "-15%", bottom: "-25%" }, 0);
      tl.to(".p4", { right: "-20%", bottom: "-25%"}, 0);
      tl.to(".p6", { left: "25%", bottom: "25%" }, 0);
      tl.to(".p7", { left: "25%", bottom: "-25%" }, 0); 
      performanceImgPositions.forEach((img) => {

        if (img.id === "p5") return

        const selector = `.${img.id}`

        const vars = {}
          if (img.left !== undefined) {
    vars.left = `${img.left}%`
    vars.right = "auto"
          }

          if (img.right !== undefined) {
    vars.right = `${img.right}%`
    vars.left = "auto"
          }

          if (img.bottom !== undefined) {
    vars.bottom = `${img.bottom}%`
          }
        tl.to(selector, vars, 0) // all animations start together

      })

    })

    return () => mm.revert()

  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} id="performance">

      <h2>Next-level graphic performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((image) => (
          <img
            key={image.id}
            className={image.id}
            src={image.src}
            alt={image.id}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with responsiveness that keeps-up
          with your imagination. The M4 family of chips features a GPU with a
          second-generation hardware-accelerated ray tracing engine that
          renders images faster, so{" "}
          <span className="text-white">
            Gaming feels more immersive and realistic than ever
          </span>. And Dynamic Caching optimizes fast on-chip memory to
          dramatically increase average GPU utilization—driving a huge
          performance boost for most demanding apps and games.
        </p>
      </div>

    </section>
  )
}

export default Performance