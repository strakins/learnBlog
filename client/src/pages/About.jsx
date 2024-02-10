
import aboutImg from '../assets/about.png'



const About = () => {
  const info = [
    { text: "Years experience", count: "03" },
    { text: "Completed Projects", count: "16" },
    { text: "Companies Work", count: "03" },
  ];

  return (
    <section id="about" className="py-10 text-color-mode">
      <div className="max-w-6xl mx-auto mt-8">
        <h3 className="ml-16 text-4xl font-semibold">
          About <span className="text-cyan-600">Me</span>
        </h3>
        {/* <p className=" my-3 text-lg">My introduction</p> */}
        <div className="flex md:flex-row flex-col-reverse items-center md:gap-6 gap-12 px-2 md:px-10 max-w-6xl mx-auto">
          <div className="p-2">
            <div className=" my-3">
              <p className="text-justify text-sm md:text-base leading-7 w-11/12 mx-auto">
                Hello, I'm a full-stack web developer with a passion for creating dynamic and interactive 
                web applications. With a strong foundation in both front-end and back-end development. 
                <span className="block pt-2"> I possess the skills to bring ideas to life and deliver seamless user experiences.
                On the front-end side, I'm proficient in the use of modern frameworks like 
                React which enables me to create highly interactive web applications.
                When it comes to the back-end, I have a solid understanding of server-side technologies 
                such as Node.js. I'm familiar with building RESTful APIs, working with databases 
                (MONGODB), and implementing authentication and authorization systems to ensure data security. </span>
                <span className="block pt-2"> Additionally, I'm well-versed in version control systems like Git.
                Overall, my goal as a full-stack web developer is to leverage my skills and expertise to build innovative web 
                applications that solve real-world problems and provide an enjoyable user experience. I'm excited to take on new 
                challenges and contribute to the ever-evolving world of web development."</span>
              </p>
              <div className="flex mt-10 items-center gap-7">
                {info.map((content) => (
                  <div key={content.text}>
                    <h3 className="md:text-4xl text-2xl font-semibold">
                      {content.count}
                      <span className="text-cyan-600">+</span>{" "}
                    </h3>
                    <span className="md:text-base text-xs">{content.text}</span>
                  </div>
                ))} 
              </div>
              <br />
              <br />
              <a href="../assets/Blessing_Akinola_CV.pdf" download>
                <button className="btn-primary">Download CV</button>
              </a>
            </div>
          </div>
          <div className="flex-1 md:-mt-4 mt-6 flex justify-center items-center">
            <div className="lg:w-96 h-full relative sm:w-10/12 w-11/12 max-w-sm aboutImg ">
              <img
                src={aboutImg}
                alt=""
                className="w-full object-cover bg-cyan-600 rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About