import React from 'react'

function Logo({width='70px',className="text-white"}) {
  return (
    <div className={` flex  ml-10 ${className} `}>
      <img className='  z-10 h-[38px] -w[500px]' src="https://www.reshot.com/preview-assets/icons/BVQRCAPDM8/blogger-BVQRCAPDM8.svg"   alt="" />
      {/* <h1 className='m-1.5 ml-4 font-mono text-xl '>Blogger</h1> */}
    </div>
  )
}

export default Logo