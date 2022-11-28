import { Button, Image, OverlayTrigger, Tooltip } from "react-bootstrap";

function MyOverlayTrigger({myStyle, myImgSrc, myTooltip, myClick}) {
  return (
    <OverlayTrigger 
    placement="bottom"
    overlay={<Tooltip >{myTooltip}</Tooltip>}
>
{({ ref, ...triggerHandler }) => (
    <Button
        variant="light"
        {...triggerHandler}
        onClick = {myClick}
        >
        <Image
            ref={ref}
            roundedCircle
            src={myImgSrc}
            className={myStyle}
        />
    </Button>
)}
</OverlayTrigger>  );
}

export default MyOverlayTrigger;