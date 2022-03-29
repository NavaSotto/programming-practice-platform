import "./style.css";
//npm i react-chartjs-2


export default function Statistics() {

 
  
  return (
    <div className="statisticsClass ">
        <h1 className="h1Class">The most popular<br></br> programming languages</h1>
        <div className=" circleContaner ">
        <div className="item js">
    <h3>JS</h3>
    <svg width="160px" height="160px" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <linearGradient id="linear1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor=" hsl(224, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(224, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81"  
     strokeWidth="11" stroke="url(#linear1)" fill="none"/>
     </g>
    </svg>
</div>

<div className="item css">
    <h3>C++</h3>
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
         <defs>
    <linearGradient id="linear2" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="hsl(269, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(269, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="11" stroke="url(#linear2)" fill="none"/>
     </g>
    </svg>
</div>
<div className="item python">
    <h3>PYTHON</h3>
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <linearGradient id="linear3" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="hsl(179, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(179, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="11" stroke="url(#linear3)" fill="none"/>
     </g>
    </svg>
</div>
<div className="item c">
    <h3>C#</h3>
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <linearGradient id="linear4" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"  stopColor="hsl(152, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(152, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="11" stroke="url(#linear4)" fill="none"/>
     </g>
    </svg>
</div>

<div className="item go">
    <h3>GO</h3>
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
         <defs>
    <linearGradient id="linear5" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="hsl(56, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(56, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="11" stroke="url(#linear5)" fill="none"/>
     </g>
    </svg>
</div>
<div className="item sql">
    <h3>SQL</h3>
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
    <defs>
    <linearGradient id="linear6" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%"   stopColor="hsl(328, 85%, 66%)"/>
      <stop offset="100%" stopColor="hsl(328, 85%, 66%)"/>
    </linearGradient>
  </defs>
     <g>
      <title>Layer 1</title>
      <circle className="circle_animation" r="69.85699" cy="81" cx="81" strokeWidth="11" stroke="url(#linear6)" fill="none"/>
     </g>
    </svg>
</div>

        </div>
    
    </div>
  );
}