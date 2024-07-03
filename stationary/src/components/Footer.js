import React from 'react'
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaGithub } from "react-icons/fa";


const Footer = () => {
  return (


<body>
	<footer class="footer" className='mt-12 bg-black' >
		<div class="container row">
			<div class="footer-col">
				<h4>company</h4>
				<ul>
					<li><a href="#">about us</a></li>
					<li><a href="#">our services</a></li>
					<li><a href="#">privacy policy</a></li>
					<li><a href="#">visit website</a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4>get help</h4>
				<ul>
					<li><a href="#">FAQ</a></li>
					<li><a href="#">shipping</a></li>
					<li><a href="#">returns</a></li>
					<li><a href="#">order status</a></li>
					<li><a href="#">payment options</a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4>online shop</h4>
				<ul>
					<li><a href="#">download</a></li>
					<li><a href="#">changelog</a></li>
					<li><a href="#">github</a></li>
					<li><a href="#">all version</a></li>
				</ul>
			</div>
			<div class="footer-col">
				<h4>follow us</h4>
				<div class="social-links" className='flex gap-3'>
					<a href="https://www.youtube.com/watch?v=SUeVdpV768o&t=18302s" >
            
              <FaInstagram className='text-2xl rounded-full text-white'/>
           
          </a>
					<a href="#">
            <FaLinkedin className='text-2xl text-white' />
          </a>
					<a href="#">
            <FaGithub className='text-2xl text-white'/>
          </a>
          <a href='#'>
            <MdEmail className='text-2xl text-white'/>
          </a>
					
				</div>
			</div>
		</div>
	</footer>
</body>

 

  )
}

export default Footer
