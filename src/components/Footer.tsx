import { FunctionComponent } from "react";

interface FooterProps {

}

const Footer: FunctionComponent<FooterProps> = () => {

    return (
        <>
            <div className="text-center text-dark fixed-bottom"  >
                <div className="" style={{ backgroundColor: "rgba(62, 178, 113, 1)" }}>
                    <span>Made by Olga Karpov: © 2023 Copyright</span>
                    <section>
                        <a className="btn btn-outline-light btn-floating m-1" href="https://github.com/okarp7"
                            role="button"><i className="fa-brands fa-github text-white"></i></a>
                    </section>
                </div>
            </div>
        </>
    );
}

export default Footer;