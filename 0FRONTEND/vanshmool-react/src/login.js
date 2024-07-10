import React from 'react';
import styles from './LoginPage.module.css'; // Adjust the path as necessary
import { FaTwitter, FaGoogle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';



function LoginPage() {
    let navigate = useNavigate();
    const handleSubmit = () => {
      // Perform login logic here
      navigate('/birthdetails');
    };

    return(
    <div>
        <nav>
            <div className="navbar bg-base-100 shadow-lg">   
                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                    <div tabindex="0" role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                        <img alt="Vansh Mool" src="./images/vedicastrologyimage1.png" />
                        </div>
                    </div>
                    </div>
                </div>
                <div className="flex-1">
                <a className="btn btn-ghost text-xl">Vansh Mool</a>
                </div>
                <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                </button>
                </div>
                <label className="cursor-pointer grid place-items-center">
                    <input type="checkbox" value="luxury" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
                    <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
                    <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                </label>
            </div>
        </nav>
        <main>

        <div className="section" id="main hero">
            <div className="grid grid-cols-[10%_40%_10%_40%] mt-20">
                <div className="justify-self-start col-auto"></div>
                <div className="justify-self-start col-auto">
                    <div>
                    <h1 className={styles.heroTitle}>वंश मूल | Vansh Mool</h1>
                    </div>
                    <div>
                    <h2 className="text-3xl font-light mt-5">Tracking Karma through lineage.</h2>
                    </div>
                    <div>  
                    <h3 className="font-light mt-10">Vansh Mool integrates the power of Jyotish with advanced artificial intelligence to analyze your birth chart, revealing the intricate web of karma within your lineage. This innovative approach allows you to uncover the karmic influences and patterns inherited from your ancestors, offering a fresh perspective on your life's path and purpose. By combining traditional knowledge with cutting-edge technology, Vansh Mool provides a unique and modern take on understanding your pitris and their karma.</h3>
                          </div>
                </div>

                <div className="justify-center col-auto"></div>
                
                <div className="justify-center col-auto">
                   

                <div className="rounded-box border-2 text-center">
                    <div className='flex flex-col mt-20 items-center'>
                        
                        <div className="join">
                            <input type="text" placeholder="Personal Access Key" className="input input-bordered join-item" />
                            <button className="btn btn-secondary join-item" onClick={handleSubmit}>→</button>
                        </div>    
                        <div className="badge badge-ghost mt-2"> *INVITE ONLY</div>
                    </div>
                </div> 

                </div>



                {/*}
                <div className="rounded-box border-2 p-4 text-center ">
                    <h2 className="text-lg font-thin mt-20">Login to Vanshmool</h2>
                    <div className="flex flex-col items-center space-y-4">
                        <a href="{{ url_for('login_twitter') }}" className="btn btn-info gap-2 w-1/2 mt-6">
                            <FaTwitter className="h-6 w-6" />Sign in with Twitter
                        </a>
                        <a href="{{ url_for('login_google') }}" className="btn btn-danger gap-2 w-1/2 mt-6">
                            <FaGoogle className="h-6 w-6" />Sign in with Google
                        </a>
                    </div>
                </div>
                */}
            </div>          
        </div>
{/*       
        <div className="section" id="main_hero">
        <div className="grid grid-cols-[10%_40%_40%_10%] gap-5 mt-20">
            <div className="p-4"> bhjbshjbjhs </div>
            <div className="p-4">
            <h2 className="text-3xl font-light">Understand more about your ancestors, lineage and their karma affecting you.</h2>
            </div>
            <div className="p-4"> bhjbshjbjhs </div>
            <div className="p-4"> bhjbshjbjhs</div>
        </div>
        </div>









        <div className='section' id="section2"> 
            <div className="grid grid-cols-[10%_40%_40%_10%] mb-20">
            <div className="col-start-1 justify-self-start"></div>
            <div className="col-start-2 justify-self-start">
                <h3 className="justify-center text-2xl font-light">Part 2- Understand more about your ancestors, 
                <p>
                lineage and their karma affecting you.
                </p>
                </h3>
            
            </div>
            <div className="col-start-3 justify-self-start"></div>
            <div className="col-start-4 justify-self-start"></div>
            </div>
        </div>
        <div className="section" id="carousel">
            <div className="carousel carousel-center rounded-box">
            <div className="carousel-item">
                <img src="./public/images/2.png"  />
            </div> 
            <div className="carousel-item">
                <img src="./public/images/2.png"  />
            </div> 
            <div className="carousel-item">
                <img src="./public/images/3.png" /> 
            </div>
            <div className="carousel-item">
                <img src="./public/images/4.png"  /> 
            </div>
            </div>
        </div>
        <div className="section" id="karma">
            <h3 className="text-2xl font-light mt-10 mb-40">Understanding Karma: Lineage and Ancestors</h3>
            <h3 className="text-2xl font-light mt-10 mb-40">Image Placeholder</h3>
            <h3 className="text-2xl font-light mt-10 mb-40">
            Discover the hidden threads of karma woven through your family lineage. Learn how ancestral blessings and challenges shape your life's journey and find ways to honor and heal your ancestral legacy.
            <button className="btn">Explore Your Ancestral Karma</button>
            </h3>
        </div>
        <div className="section" id="self-discovery">
            <h3 className="text-2xl font-light mt-10 mb-40">Self-Discovery and Inner Growth</h3>
            <div className="img-placeholder">Image Placeholder</div>
            <div className="section-content">
            Embark on a journey of self-discovery with the wisdom of the stars and cards. Uncover the layers of your personality, tap into your inner strengths, and navigate the path to self-awareness and personal growth.
                <form action="/submit-form" method="post">
                    <input type="text" className="form-input" placeholder="Enter Your Birth Date"></input>
                    <input type="submit" className="btn" value="Get Personalized Insight"></input>
                </form>
            </div>
        </div>
        <div className="section" id="predictions">
            <div className="section-header">Predictions and Future Insights</div>
            <div className="img-placeholder">Image Placeholder</div>
            <div className="section-content">
            Peer into the future with our expert astrological forecasts and tarot readings. Gain insights into upcoming opportunities, challenges, and the cosmic influences that shape your path ahead.
                <button className="btn">Get Your Forecast</button>
            </div>
        </div>
        <div className="section" id="dasha">
            <div className="section-header">Understanding Dasha and Life Periods</div>
            <div className="img-placeholder">Image Placeholder</div>
            <div className="section-content">
                Navigate the ebbs and flows of life with an understanding of Dasha...
                <button className="btn">Learn About Your Dasha</button>
            </div>
        </div>
    */}

        <div className="mt-40">
            <span> </span>
        </div> {/*Empty Div for spacing*/}
        </main>

        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
  <nav className="grid grid-flow-col gap-4">
    <a className="link link-hover">Know More</a>
    <a className="link link-hover">Read</a>
    <a className="link link-hover">Purchase</a>
    <a className="link link-hover">Cleanse</a>
  </nav> 
  <nav>
    <div className="grid grid-flow-col gap-4">
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
      <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
    </div>
  </nav> 
  <aside>
    <p>Copyright © 2024 - All right reserved by Prof Of Dark Arts</p>
  </aside>
</footer>

    </div>
    )
}
export default LoginPage