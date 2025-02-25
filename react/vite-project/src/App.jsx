import { useState } from 'react'
import titlePageLogo from './assets/titlePage.svg'
import plusLogo from './assets/plus.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <nav>
      <img src={titlePageLogo} alt="title Page" id="titlePage"/>
    </nav>

    <main>
        <div id="conteinerAction">

            <div class="toDoContainer">

                <span class="toDoTitle">TO DO</span>
                <button class="addTaskBnt">
                    <img src={plusLogo} alt="Add" class="add"/> Add task
                </button>


            </div>
            <div class="workingAt">
                <span class="spanTitleWorkingAt">TIME TO FOCUS</span>

            </div>
            <div class="doneContainer">

                <span class="doneSpan">DONE</span>

            </div>
        </div>


    </main>
    </>
  )
}

export default App
