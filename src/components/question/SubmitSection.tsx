/* 
SubmitSection

The footer with the submit button
Could be expanded to include other action buttons
*/

import { Button } from "@/components/ui/button"
import {CardFooter} from "@/components/ui/card"

interface SubmitProps {
    showInfo: string;
    btnClassName: string;
    checkAnswer: ()=> void;
}

const SubmitSection:React.FC<SubmitProps> = ({
    showInfo,
    btnClassName="font-sans",
    checkAnswer
}) =>{
    return (
        <CardFooter className={`flex justify-between ${showInfo === 'hidden' ? '' : 'hidden'}`}>
        <Button
          className={btnClassName}
          onClick={checkAnswer}>SUBMIT</Button>
      </CardFooter>
    )
}

export default SubmitSection