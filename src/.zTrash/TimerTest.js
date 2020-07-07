import React, { Fragment, useState } from 'react';
import { useEffect } from 'react';

const Timer = () => {
    const [count,setCount] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            console.log(`You clicked ${count} times`)
        }, 3000)
    })

    const handleShowAlert = () => {
        setTimeout(() => {
            alert("You clicked on it: " + count)
        }, 3000)
    }

    return (
        <Fragment>
            <h1>You clicked {count} times!</h1>
            <button onClick={() => setCount(count + 1)}>Click Me!</button>
            <button onClick={handleShowAlert}>Show alert</button>
        </Fragment>
    );
}
 
export default Timer;