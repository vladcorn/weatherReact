import React from "react";


const Form = props =>(
    <form onSubmit={props.weatherMethod}>
        <input type="text" name="city" placeholder={"City"}/>
        <button><i className="fas fa-globe-europe"></i></button>
    </form>
);

export default Form;