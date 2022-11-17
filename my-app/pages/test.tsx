import {useContext} from 'react'
import AppContext from "./_app";

const test = () => {

const context = useContext(AppContext)
  console.log(context);
  return (
    <div>test</div>
  )
}

export default test