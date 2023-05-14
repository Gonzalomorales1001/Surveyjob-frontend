import React from 'react'
import '../css/InfiniteLoader.css'

export const InfiniteLoader = ({dark}) => {
  return (
    <div className='text-center inf-loader'>
        <svg className="ip" viewBox="0 0 256 128" width="256px" height="128px" xmlns="http://www.w3.org/2000/svg">
		<defs>
			<linearGradient id="grad1" x1="0" y1="0" x2="1" y2="0">
				<stop offset="0%" stopColor={`${dark?'#F0A500':'#5ebd3e'}`} />
				<stop offset="33%" stopColor={`${dark?'#D08300':'#ffb900'}`} />
				<stop offset="67%" stopColor={`${dark?'#B06100':'#f78200'}`} />
				<stop offset="100%" stopColor={`${dark?'#904000':'#e23838'}`} />
			</linearGradient>
			<linearGradient id="grad2" x1="1" y1="0" x2="0" y2="0">
				<stop offset="0%" stopColor={`${dark?'#904000':'#e23838'}`} />
				<stop offset="33%" stopColor={`${dark?'#F3D800':'#973999'}`} />
				<stop offset="67%" stopColor={`${dark?'#F5FA00':'#009cdf'}`} />
				<stop offset="100%" stopColor={`${dark?'#FfA500':'#5ebd3e'}`} />
			</linearGradient>
		</defs>
		<g fill="none" strokeLinecap="round" strokeWidth="16">
			<g className={`ip__track ${dark&&'ip__track--dark'}`} stroke="#ddd">
				<path d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
			<g strokeDasharray="180 656">
				<path className="ip__worm1" stroke="url(#grad1)" strokeDashoffset="0" d="M8,64s0-56,60-56,60,112,120,112,60-56,60-56"/>
				<path className="ip__worm2" stroke="url(#grad2)" strokeDashoffset="358" d="M248,64s0-56-60-56-60,112-120,112S8,64,8,64"/>
			</g>
		</g>
	</svg>
    </div>
  )
}
