import { useState } from 'react'
import { Button } from 'flowbite-react';
import { Label, Radio, TextInput } from 'flowbite-react';

function Header() {
  return (
    <div className='flex flex-row place-items-center space-x-4 p-12'>
      <img src="src/assets/gawa.svg" alt="Gawa Logo" className='w-12'/>
      <div className='h-16 w-0.5 bg-slate-600'/>
      <p className='font-bold'>Demographic Survery</p>
    </div>
  )
}

function Prompt() {
  const [count, setCount] = useState(0)
  const [educ, setEduc] = useState(0)
  const [income, setIncome] = useState(0)
  const [kids, setKids] = useState(0)
  const [teens, setTeens] = useState(0)
  const [wine, setWine] = useState(0)
  const [fruits, setFruits] = useState(0)
  const [meat, setMeat] = useState(0)
  const [fish, setFish] = useState(0)
  const [sweets, setSweets] = useState(0)
  const [gold, setGold] = useState(0)
  const [age, setAge] = useState(0)
  const [marital, setMarital] = useState(0)
  const [restart, setRestart] = useState(false)
  const [heading, setHeading] = useState("Welcome to Gawa's Demographic Classifier!")
  const [subheading, setSubheading] = useState("We have 11 thoughtfully curated questions await, aiming to pinpoint your unique service consumer profile. Our goal is to tailor our services to cater to your specific needs effectively!")
  var spendings = 0;
  var children = 0;
  var family_size = 0;

  const questions = [
    "What is your highest level of education completed?",
    "To better understand your financial preferences, could you share your approximate monthly income in dollars?",
    "How many wonderful kids are part of your household?",
    "Could you tell us the number of amazing teenagers in your household?",
    "Thinking about your typical expenses, how much (in dollars) do you usually spend on:",
    "What is your current age?",
    "Could you kindly share your current marital status?",
  ]
  const helpers = [
    "Understanding your highest level of education helps us tailor our services to suit different educational backgrounds, ensuring we meet your needs appropriately.",
    "Knowing your approximate monthly income assists us in providing products or services that align with your budget and financial preferences.",
    "This information helps us create family-oriented solutions or products that consider the needs of households with children.",
    "Identifying the number of teenagers in your household allows us to cater to the unique preferences and requirements of families with adolescents.",
    "Learning about your spending on specific items enables us to understand your lifestyle and preferences, which can influence our offerings.",
    "Your age helps us tailor our services to different age groups, ensuring that our offerings are relevant and suitable for you.",
    "Understanding your marital status allows us to personalize our services based on individual or family needs, ensuring we cater to a diverse range of lifestyles.",
  ]
 
  function educ_radio(event){
    // Updating the state with the selected radio button's value
    setEduc(event.target.value)
  }

  function marital_radio(event){
    // Updating the state with the selected radio button's value
    setMarital(event.target.value)
  }

  function renderSwitch(param) {
    switch(param) {
      case 1:
        return <>
          <fieldset className="flex max-w-md flex-row gap-4">
            <div className="flex items-center gap-2">
              <Radio id="Basic-Education" value={0} checked={educ == 0} onChange={educ_radio}/>
              <Label htmlFor="Basic-Education">Basic Education</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="High-School-Graduate" value={1} checked={educ == 1} onChange={educ_radio}/>
              <Label htmlFor="High-School-Graduate">High School Graduate</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="Masteral" value={2} checked={educ == 2} onChange={educ_radio}/>
              <Label htmlFor="Masteral">Masteral or PHD</Label>
            </div>
          </fieldset>
        </>
      case 2:
        return <>
          <TextInput type="number" placeholder="eg. 1000000" onInput={e => setIncome(e.target.value)}/>
        </>
      case 3:
        return <>
          <TextInput type="number" placeholder="eg. 2" onInput={e => setKids(e.target.value)}/>
        </>
      case 4:
        return <>
          <TextInput type="number" placeholder="eg. 3" onInput={e => setTeens(e.target.value)}/>
        </>
      case 5:
        return <div className='w-[80%] flex flex-wrap'>
          <TextInput type="number" placeholder="🍷 Wine" onInput={e => setWine(e.target.value)}/>
          <TextInput type="number" placeholder="🍇 Fruits" onInput={e => setFruits(e.target.value)}/>
          <TextInput type="number" placeholder="🥩 Meat" onInput={e => setMeat(e.target.value)}/>
          <TextInput type="number" placeholder="🐟 Fish" onInput={e => setFish(e.target.value)}/>
          <TextInput type="number" placeholder="🍬 Sweets" onInput={e => setSweets(e.target.value)}/>
          <TextInput type="number" placeholder="🥇 Gold" onInput={e => setGold(e.target.value)}/>
        </div>
      case 6:
        return <>
          <TextInput type="number" placeholder="eg. 60" onInput={e => setAge(e.target.value)}/>
        </>
      case 7:
        return <>
          <fieldset className="flex max-w-md flex-row gap-4">
            <div className="flex items-center gap-2">
              <Radio id="Basic-Education" value={0} checked={marital == 0} onChange={marital_radio}/>
              <Label htmlFor="Basic-Education">Single, Widow, Divorced</Label>
            </div>
            <div className="flex items-center gap-2">
              <Radio id="High-School-Graduate" value={1} checked={marital == 1} onChange={marital_radio}/>
              <Label htmlFor="High-School-Graduate">Married</Label>
            </div>
          </fieldset>
        </>
      default:
        return '';
    }
  }

  function proceed() {
    if (count < 7){
      setCount(count + 1);
      setHeading(questions[count]);
      setSubheading(helpers[count]);
    }
    else{
      //---------------------------------------------- edit here ------------------------------------------
      fetch('http://127.0.0.1:5000/get-user/0-0-0-0-0-0-0-0-0-0-0-0-0-0-0')
        .then(response => response.json())
        .then(data => (console.log(data)));

      spendings = parseInt(wine)+parseInt(fruits)+parseInt(meat)+parseInt(fish)+parseInt(sweets)+parseInt(gold);
      children = parseInt(kids)+parseInt(teens);
      family_size = marital ? parseInt(children) + 2 : parseInt(children) + 1;

      alert('Feed to api ' + educ+","+income+","+kids+","+teens+","+wine+","+fruits+","+meat+","+fish+","+sweets+","+gold+","+spendings+","+age+","+children+","+marital+","+family_size);
      setRestart(true);
      // setHeading("You are a Ballsack") // Replace this with the classification eg. "Home Maintenance Enthusiasts"
      // setSubheading("ballsacks are the thing that hangs on the bottom of the....") // Replace this with the description
      //---------------------------------------------- edit here ------------------------------------------
    }
    document.querySelector('input').value = ''
  }

  return (
    <div className='flex flex-col space-y-6 items-start'>
        {/* {educ+","+income+","+kids+","+teens+","+wine+","+fruits+","+meat+","+fish+","+sweets+","+gold+","+spendings+","+age+","+children+","+marital+","+family_size} */}
        <span className='font-extrabold text-4xl'>
          {heading}
        </span>
        <span>
          {subheading}
        </span>
        
        <div className='w-full flex justify-between items-baseline'>
          {restart ? '' : renderSwitch(count)}
          {restart ? <Button onClick={() => location.reload()}>Restart</Button>  : <Button onClick={proceed}>Proceed</Button> }
        </div>
      </div>
  )
}

function Card() {
  return (
    <div className='flex flex-row shadow-2xl w-[90%] h-96 mb-16 items-center p-16'>
      <img src="src//assets/illustration.png" alt="illustraiton image" className='h-96 relative -left-28'/>
      <Prompt></Prompt>
    </div>
  )
}

function App() {
  return (
    <div className='fixed top-0 bottom-0 right-0 left-0 grid grid-rows-6'>
      <Header/>
      <div className='row-span-5 flex justify-center place-items-center p-10  '> 
        <Card/>
      </div>
    </div>
  )
}

export default App
