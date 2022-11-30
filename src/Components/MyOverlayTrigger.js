import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";

function MyOverlayTrigger({myTooltip, myClick, myElement}) {
    return (
        <OverlayTrigger 
            placement="bottom"
            overlay={<Tooltip >{myTooltip}</Tooltip>}
        >
        {({ ref, ...triggerHandler }) => (
            <Button
                ref={ref}
                variant="light"
                {...triggerHandler}
                onClick = {myClick}
                >
                {myElement}
            </Button>
        )}
        </OverlayTrigger>  
);
}

export default MyOverlayTrigger;