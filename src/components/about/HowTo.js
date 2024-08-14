import Image from "next/image";

function HowTo() {
    return (
        <div className="howToContainer">
            <h2 className="howToTitle">How to Use the Inventory Management System</h2>
            <div className="howToTextContainer">
                <p className="howToText">
                    In this section, you will learn how to use the Inventory Management System.
                </p>
                <p className="howToText">
                    First you will need to create an account. You can do this by clicking on the "Sign Up" button in the top right corner of the page.
                </p>
                {/* <Image className="howToImage" src="/assets/signup.png" width={1200} height={1000} /> */}
                <p className="howToText">
                    Once you have created an account, you can log in by clicking on the "Log In" button in the top right corner of the page.
                </p>
                <p className="howToText">
                    Once you are logged in, you will be able to view all the items in your inventory based on their warehouse location in the Home page.
                </p>
            </div>
            <div className="howToTextContainer">

            </div>
            <div className="howToTextContainer">

            </div>
            <div className="howToTextContainer">

            </div>
            <div className="howToTextContainer">
                
            </div>
        </div>
    );
}

export default HowTo;