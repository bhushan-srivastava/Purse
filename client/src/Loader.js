import loader from "./static/images/loader.gif"

const Loader = () => {
    return (
        <div className="loader-div">
            <img src={loader} className="loader" alt="Purse-loading" />
        </div>
    );
}

export default Loader;